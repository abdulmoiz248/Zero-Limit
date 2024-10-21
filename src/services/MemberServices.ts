// services/memberService.ts
import { prisma } from '@/helper/prisma';

// Create a new member
export const createMember = async (email: string) => {
  try {
    return await prisma.member.create({
      data: { email },
    });
  } catch (error) {
    console.log("Error creating member:", error);
    return false; // Return false for any other errors
  }
};

// Get all members
export const getAllMembers = async () => {
  return await prisma.member.findMany();
};



