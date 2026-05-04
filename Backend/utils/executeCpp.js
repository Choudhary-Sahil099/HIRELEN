import { exec, spawn } from "child_process";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "temp");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const compileCpp = (filePath, outputPath) => {
  return new Promise((resolve, reject) => {
    exec(
      `g++ -std=c++17 "${filePath}" -o "${outputPath}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.log("COMPILATION ERROR:\n", stderr);
          return reject(stderr || "Compilation Error");
        }
        resolve();
      },
    );
  });
};

export const runCpp = (outputPath, input) => {
  return new Promise((resolve, reject) => {
    const start = process.hrtime.bigint();

    const processExec = spawn(outputPath);

    let stdout = "";
    let stderr = "";

    const timeout = setTimeout(() => {
      processExec.kill();
      reject("Time Limit Exceeded");
    }, 2000);

    processExec.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    processExec.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    processExec.on("close", (code) => {
      clearTimeout(timeout);

      const end = process.hrtime.bigint();
      const timeMs = Number(end - start) / 1e6;

      if (code !== 0) {
        return reject(stderr || "Runtime Error");
      }

      resolve({
        output: stdout,
        time: timeMs,
      });
    });

    processExec.stdin.write(input);
    processExec.stdin.end();
  });
};

export const executeCpp = async (code, input) => {
  const fileName = `code_${Date.now()}.cpp`;
  const filePath = path.join(dir, fileName);
  const outputPath = filePath.replace(".cpp", "");

  fs.writeFileSync(filePath, code);

  try {
    await compileCpp(filePath, outputPath);
    return await runCpp(outputPath, input);
  } finally {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
};
