import { createProblem } from "../models/problems/problemModel.js";
import { createProblemStats } from "../models/problems/problemStatementModel.js";
import { addTagsToProblem } from "../models/problems/problemTagModel.js";
import { addTestCase } from "../models/problems/testCaseModel.js";
import { addEditorial } from "../models/problems/editorialModel.js";

export const createProblemFull = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      difficulty,
      constraints,
      tags,
      testCases,
      editorial
    } = req.body;
    const problemId = await createProblem({
      title,
      slug,
      description,
      difficulty,
      constraints
    });
    await createProblemStats(problemId);
    if (tags && tags.length > 0) {
      await addTagsToProblem(problemId, tags);
    }
    if (testCases && testCases.length > 0) {
      for (const tc of testCases) {
        await addTestCase({
          problemId,
          input: tc.input,
          output: tc.output,
          isSample: tc.isSample
        });
      }
    }
    if (editorial) {
      await addEditorial(problemId, editorial);
    }

    res.json({
      message: "Problem created successfully",
      problemId
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};