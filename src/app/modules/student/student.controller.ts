import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await StudentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    // console.log(err._message);
    res.status(400).json({
      success: false,
      status: 400,
      message: err,
    });
  }
};

const getStudentList = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentListFromDB();
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Student list is fetched successfully',
      count: result.length,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: 'Something went wrong',
    });
  }
};

const getSpecificStudentDetails = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getStudentDetailsFromDB(studentId);
    if (result?.id) {
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Student details is fetched successfully',
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        status: 404,
        message: 'Student details not found',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: 'Something went wrong',
    });
  }
};

export const StudentControllers = {
  createStudent,
  getStudentList,
  getSpecificStudentDetails,
};
