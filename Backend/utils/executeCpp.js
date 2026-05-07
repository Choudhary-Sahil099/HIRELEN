import { exec } from "child_process";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "temp");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const toDockerPath = (p) => {
  let dockerPath = p.replace(/\\/g, "/");

  dockerPath = dockerPath.replace(
    /^([A-Za-z]):/,
    (_, drive) => `/${drive.toLowerCase()}`
  );

  return dockerPath;
};

export const compileCpp = (
  filePath,
  outputPath,
  workingDir
) => {
  return new Promise((resolve, reject) => {

    const dockerPath = toDockerPath(workingDir);
    const compileCommand =
      `docker run --rm ` +
      `--memory="512m" ` +
      `--cpus="1" ` +
      `--network none ` +
      `--pids-limit 64 ` +
      `-v "${dockerPath}:/app" ` +
      `cpp-runner ` +
      `bash -c "g++ -std=c++17 /app/code.cpp -o /app/code && chmod +x /app/code"`;

    console.log("COMPILE CMD:");
    console.log(compileCommand);

    exec(
      compileCommand,
      (err, stdout, stderr) => {

        console.log("COMPILE STDOUT:", stdout);
        console.log("COMPILE STDERR:", stderr);

        if (err) {

          console.error(
            "COMPILE ERROR:",
            err
          );

          return reject(
            stderr ||
            err.message ||
            "Compilation Error"
          );
        }

        resolve();
      }
    );
  });
};

export const runCpp = (
  workingDir,
  input
) => {

  return new Promise((resolve, reject) => {

    const start =
      process.hrtime.bigint();
    const inputPath = path.join(
      workingDir,
      "input.txt"
    );

    fs.writeFileSync(
      inputPath,
      input
    );

    const dockerPath =
      toDockerPath(workingDir);

    const runCommand =
      `docker run --rm ` +
      `--memory="256m" ` +
      `--cpus="0.5" ` +
      `--network none ` +
      `--pids-limit 64 ` +
      `-v "${dockerPath}:/app" ` +
      `cpp-runner ` +
      `bash -c "/app/code < /app/input.txt"`;

    console.log("RUN CMD:");
    console.log(runCommand);

    exec(
      runCommand,
      {
        timeout: 2000,
      },

      (err, stdout, stderr) => {

        const end =
          process.hrtime.bigint();

        const timeMs =
          Number(end - start) / 1e6;

        try {

          if (
            fs.existsSync(inputPath)
          ) {

            fs.unlinkSync(
              inputPath
            );
          }

        } catch {}

        console.log("RUN STDOUT:", stdout);
        console.log("RUN STDERR:", stderr);

        if (err) {

          console.error(
            "RUN ERROR:",
            err
          );

          if (
            err.killed ||
            err.signal === "SIGTERM"
          ) {

            return reject(
              "Time Limit Exceeded"
            );
          }

          return reject(
            stderr ||
            err.message ||
            "Runtime Error"
          );
        }
        resolve({

          output: stdout.trim(),

          time: timeMs,
        });
      }
    );
  });
};
export const createExecutionEnvironment =
  (code) => {

    const submissionId =
      `submission_${Date.now()}`;

    const workingDir = path.join(
      dir,
      submissionId
    );

    fs.mkdirSync(workingDir);

    const filePath = path.join(
      workingDir,
      "code.cpp"
    );

    const outputPath = path.join(
      workingDir,
      "code"
    );

    fs.writeFileSync(
      filePath,
      code
    );

    return {

      workingDir,

      filePath,

      outputPath,
    };
  };
export const cleanupExecutionEnvironment =
  ({
    workingDir,
    filePath,
    outputPath,
  }) => {

    try {

      if (
        fs.existsSync(filePath)
      ) {

        fs.unlinkSync(
          filePath
        );
      }

      if (
        fs.existsSync(outputPath)
      ) {

        fs.unlinkSync(
          outputPath
        );
      }

      if (
        fs.existsSync(workingDir)
      ) {

        fs.rmSync(
          workingDir,
          { recursive: true }
        );
      }

    } catch {}
  };