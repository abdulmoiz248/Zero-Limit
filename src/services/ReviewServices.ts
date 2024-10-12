// services/reviewService.ts
import { prisma } from '@/helper/prisma';

// Create a new review associated with a product
export const createReview = async (username: string, body: string, rating: number, productId: string) => {
  return await prisma.review.create({
    data: {
      username,
      body,
      rating,
      productId,  // Store the product ID here
    },
  });
};

// Get all reviews
export const getAllReviews = async () => {
  return await prisma.review.findMany();
};

// Get a review by ID
export const getReviewById = async (id: number) => {
  return await prisma.review.findUnique({
    where: { id },
  });
}

// services/reviewService.ts
export const getReviewsByProductId = async (productId: string) => {
    return await prisma.review.findMany({
      where: { productId }, // Filter reviews by product ID
    });
  };
  



export const deleteReview = async (id: number) => {
  return await prisma.review.delete({ where: { id } });
};
