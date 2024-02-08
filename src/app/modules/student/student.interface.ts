import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type Student = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: 'male' | 'female';
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A+' | 'B+' | 'AB+' | 'O+';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
};
