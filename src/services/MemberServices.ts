// services/memberService.ts
import { prisma } from '@/helper/prisma';

// Create a new member
export const createMember = async (email: string) => {
  try {
    return await prisma.member.create({
      data: { email },
    });
  } catch (error:any) {
    // Check for duplicate email error
    if (error.code === 'P2002') { // This is the error code for unique constraint violations
      console.log(`Email ${email} already exists.`);
      return false; // Return false or handle as needed
    }
    console.error("Error creating member:", error);
    return false; // Return false for any other errors
  }
};

// Get all members
export const getAllMembers = async () => {
  return await prisma.member.findMany();
};



