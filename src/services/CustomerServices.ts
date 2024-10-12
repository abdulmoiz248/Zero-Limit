// services/customerService.ts
import { prisma } from '@/helper/prisma';


export const createCustomer = async (email: string, password: string, fullName: string,otp:string) => {
  return await prisma.customer.create({
    data: { email, password, fullName , otp ,isVerified:false},
  });
};

// Get all customers
export const getAllCustomers = async () => {
  return await prisma.customer.findMany();
};

export const VerifyingCustomer= async (email:string,otp:string) => {
  let customer=await getCustomerByEmail(email);
  if(customer && customer.otp===otp){
     await prisma.customer.update({
      where: { email },
      data: { isVerified: true },
    });
    return true;
  }
  return false;
}

export const getCustomerById = async (id: number) => {
  return await prisma.customer.findUnique({ where: { id } });
};

export const getCustomerByEmail = async (email: string) => {
  return await prisma.customer.findUnique({ where: { email } });
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
