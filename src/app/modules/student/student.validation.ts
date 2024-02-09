import validator from 'validator';
import * as z from 'zod';

// Define Zod schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Za-z]+$/, { message: 'First Name must only contain letters' })
    .refine(
      (value) => {
        const firstNameStr = value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return firstNameStr === value;
      },
      { message: 'First Name must be capitalized' },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => validator.isAlpha(value), {
      message: 'Last Name must only contain letters',
    }),
});

// Define Zod schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherContactNumber: z.string().min(1),
  fatherOccupation: z.string().min(1),
  motherName: z.string().min(1),
  motherContactNumber: z.string().min(1),
  motherOccupation: z.string().min(1),
});

// Define Zod schema for Local Guardian
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNumber: z.string().min(1),
  address: z.string().min(1),
});

// Define Zod schema for Student
export const StudentValidationSchema = z.object({
  id: z.string().min(1),
  name: UserNameValidationSchema,
  dateOfBirth: z.string().min(1),
  gender: z.enum(['male', 'female', 'other']),
  email: z.string().email(),
  contactNumber: z.string().min(1),
  emergencyContactNumber: z.string().min(1),
  bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'disabled']).optional().default('active'),
});
