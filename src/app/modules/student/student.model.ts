import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'First Name is required'] },
  middleName: { type: String, required: [true, 'Middle Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, "Father's Name is required"] },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's phone number is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  motherName: { type: String, required: [true, "Mother's Name is required"] },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's phone number is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
});
const localGuadianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Local guardian phone number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

//  Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student id is required & must be unique'],
    unique: true,
  },
  name: { type: userNameSchema, required: true },
  dateOfBirth: { type: String, required: [true, 'Date of birth is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Gender can be one of these type: male, female, other',
    },
    required: true,
  },
  email: { type: String, required: [true, 'Email is required'] },
  contactNumber: { type: String, required: [true, 'Phone number is required'] },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency phone number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuadianSchema, required: true },
  profileImage: { type: String },
  isActive: { type: String, enum: ['active', 'disabled'], default: 'active' },
});

// Create a Model
export const StudentModel = model<Student>('Student', studentSchema);
