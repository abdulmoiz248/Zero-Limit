// services/customerService.ts
import { prisma } from '@/helper/prisma';


export const createCustomer = async (email: string, password: string, fullName: string) => {
  return await prisma.customer.create({
    data: { email, password, fullName },
  });
};

// Get all customers
export const getAllCustomers = async () => {
  return await prisma.customer.findMany();
};

// Get a customer by ID
export const getCustomerById = async (id: number) => {
  return await prisma.customer.findUnique({ where: { id } });
};

// Update a customer by ID
export const updateCustomer = async (id: number, data: { email?: string; password?: string; fullName?: string }) => {
  return await prisma.customer.update({
    where: { id },
    data,
  });
};

// Delete a customer by ID
export const deleteCustomer = async (id: number) => {
  return await prisma.customer.delete({ where: { id } });
};
