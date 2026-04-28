import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const dir = path.join(process.cwd(), "temp");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const compileCpp = (filePath, outputPath) => {
  return new Promise((resolve, reject) => {
    exec(`g++ "${filePath}" -o "${outputPath}"`, (err) => {
      if (err) return reject("Compilation Error");
      resolve();
    });
  });
};


export const runCpp = (outputPath, input) => {
  return new Promise((resolve, reject) => {
    const start = process.hrtime.bigint();

    const processExec = spawn("cmd.exe", ["/c", outputPath]);

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

    processExec.stdin.write(input + "\r\n");
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
    const result = await runCpp(outputPath, input);
    return result;

  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  }
};