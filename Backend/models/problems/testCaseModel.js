import db from "../../config/db.js";

export const addTestCase = async ({
  problemId,
  input,
  output,
  isSample,
}) => {
  await db.execute(
    `INSERT INTO test_cases 
     (problem_id, input_data, expected_output, is_sample)
     VALUES (?, ?, ?, ?)`,
    [problemId, JSON.stringify(input), JSON.stringify(output), isSample]
  );
};

export const getSampleTestCases = async (problemId) => {
  const [rows] = await db.execute(
    `SELECT * FROM test_cases 
     WHERE problem_id = ? AND is_sample = true`,
    [problemId]
  );
  return rows;
};