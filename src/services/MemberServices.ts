// services/memberService.ts
import { prisma } from '@/helper/prisma';

// Create a new member
export const createMember = async (email: string) => {
  try {
    
    return await prisma.member.create({
      data: { email },
    });
  } catch (error) {
  console.log(error);
    return false;
  }
};

// Get all members
export const getAllMembers = async () => {
  return await prisma.member.findMany();
};



 