import crypto from 'crypto';

export const generateOtp = () => crypto.randomInt(100000, 999999).toString();

export const sendOtpToCustomer = async () => {
 return generateOtp;
 
};
