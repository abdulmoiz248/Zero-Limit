import { Product } from "@/Models/Product";
import mongoose from "mongoose";

export function calDiscount(price:number,disount:number):number{
    return (price - (price * disount / 100))
} 

export function countItems(productId: string, products:  string[]): number {
    let total = 0;
     products.forEach((product) => {
       
        if (product) {
            const id1 = new mongoose.Types.ObjectId(product as string);
            const id2 = new mongoose.Types.ObjectId(productId);

            // Compare theObject IDs
             if (id1.equals(id2)){ 
              console.log("It is eqal")
                total++;
            }
        } 
    });

    console.log(`Product ID: ${productId}, Total Count: ${total}`);
    return total;
}
export function removeDuplicateProducts(products: Product[]): Product[] {
    const seen = new Set<string>();
    return products.filter(product => {
        const id = product._id?.toString() as string;
        if (seen.has(id)) {
            return false; // This product is a duplicate
        } else {
            seen.add(id);
            return true; // This product is unique
        }
    });
}
