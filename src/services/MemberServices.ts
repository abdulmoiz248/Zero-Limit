// services/memberService.ts
import { prisma } from '@/helper/prisma';

// Create a new member
export const createMember = async (email: string) => {
  return await prisma.member.create({
    data: { email },
  });
};

// Get all members
export const getAllMembers = async () => {
  return await prisma.member.findMany();
};



