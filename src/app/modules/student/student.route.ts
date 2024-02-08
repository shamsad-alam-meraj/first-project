import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getStudentList);
router.get('/:id', StudentControllers.getSpecificStudentDetails);

export const StudentRoutes = router;
