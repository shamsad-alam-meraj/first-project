import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { StudentValidationSchema } from './student.validation';
// import studentValidationSchema from './student.validation.joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    // validating data with Joi
    // const { error, value } = studentValidationSchema.validate(student);

    // validating data with Zod
    const zodParsedData = StudentValidationSchema.parse(student);

    // send the validated data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    //Joi's error message
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     status: 400,
    //     message: 'Something wents wrong',
    //     error: error.details,
    //   });
    // }
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Student is created successfully',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message ?? 'Something wents wrong',
      error: err.issues,
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
      error: err,
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
const deleteSpecificStudentDetails = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.deleteStudentDetailsFromDB(studentId);
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Student details is deleted successfully',
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
  deleteSpecificStudentDetails
};
