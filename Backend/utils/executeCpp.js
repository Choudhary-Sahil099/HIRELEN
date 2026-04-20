import { exec } from "child_process";
import fs from "fs";
import path from "path";

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

import { spawn } from "child_process";

export const runCpp = (outputPath, input) => {
  return new Promise((resolve, reject) => {
    const process = spawn("cmd.exe", ["/c", outputPath]);

    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        return reject(stderr || "Runtime Error");
      }
      resolve(stdout);
    });
    process.stdin.write(input + "\r\n");
    process.stdin.end();
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