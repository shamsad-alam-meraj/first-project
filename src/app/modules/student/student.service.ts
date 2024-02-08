import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getStudentListFromDB = async () => {
  const result = await StudentModel.find({});
  return result;
};

const getStudentDetailsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentListFromDB,
  getStudentDetailsFromDB
};
