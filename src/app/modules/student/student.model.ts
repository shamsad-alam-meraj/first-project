import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});
const localGuadianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});

//  Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  dateOfBirth: { type: String, required: true },
  gender: ['male', 'female'],
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuadianSchema,
  profileImage: { type: String },
  isActive: ['active', 'disabled'],
});

// Create a Model
export const StudentModel = model<Student>('Student', studentSchema);
