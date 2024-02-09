import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  // const result = await StudentModel.create(student); //built in static method

  const createStudent = new Student(student);

  if (await createStudent.isUserExist(student.id)) {
    throw new Error('Student already exists');
  }

  const result = await createStudent.save(); //built in instance method
  return result;
};
const getStudentListFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getStudentDetailsFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentListFromDB,
  getStudentDetailsFromDB,
};
