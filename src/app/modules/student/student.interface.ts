import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'disabled';
};

export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
};
export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
