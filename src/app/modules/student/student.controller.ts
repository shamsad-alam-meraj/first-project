import { Request, Response } from 'express';
import { studentSerices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    //will call service function to create
    const result = await studentSerices.createStudentIntoDB(student);
    //   send success/failed message to client
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      status: 400,
      message: 'Something went wrong',
    });
  }
};

export const StudentControllers = {
  createStudent,
};
