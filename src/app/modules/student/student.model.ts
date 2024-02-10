import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First Name maxlength is 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return firstNameStr === value;
      },
    },
    message: '{VALUE} is not in capitalized format',
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not in capitalized format',
    },
  },
});
const guardianSchema = new Schema<TGuardian>({
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
const localGuadianSchema = new Schema<TLocalGuardian>({
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
const studentSchema = new Schema<TStudent, TStudentModel, StudentMethods>({
  id: {
    type: String,
    required: [true, 'Student id is required & must be unique'],
    unique: true,
  },
  password: { type: String, required: [true, 'Student password is required'] },
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
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => {
        validator.isEmail(value);
      },
      message: 'Email is not valid',
    },
  },
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
  isDeleted: { type: Boolean, default: false },
});

// pre middle ware
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre middle ware');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post middleware
studentSchema.post('save', function (data, next) {
  // console.log(this, 'post middleware');
  data.password = '';
  next();
});

// query middleware
studentSchema.pre('find', function (next) {



  next();
});

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Create a Model
export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
