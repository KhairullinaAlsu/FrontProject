import fs from 'fs';
import path from 'path';

const assignmentsFilePath = path.join(process.cwd(), '/src/data', 'assignments.json');

export const readAssignments = () => {
  const fileContents = fs.readFileSync(assignmentsFilePath, 'utf-8');
  return JSON.parse(fileContents);
};

export const writeAssignments = (assignments: any) => {
  fs.writeFileSync(assignmentsFilePath, JSON.stringify(assignments, null, 2));
};
