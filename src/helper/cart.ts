import { Product } from "@/Models/Product";
import { CartItem } from "@/interfaces/interfaces";

export function getStoredCart(): Record<string, CartItem> {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    return cart ?? {}; // Return an empty object if null
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return {};
  }
}


export function addToCart(product: Product, quantity: number): void {
  
  if (!product._id) {
    console.error("Product must have a valid ID.");
    return ;
  }

  console.log(product._id);
  const cart = getStoredCart();

  if (cart[product._id as string]) {

    if( cart[product._id as string].product.quantity>= cart[product._id as string].quantity +quantity )
          
           {
              cart[product._id as string].quantity += quantity;
            }

    if(cart[product._id as string].quantity<0) cart[product._id as string].quantity=0;
  } else {

    cart[product._id as string] = { product, quantity };
  }

  
  localStorage.setItem('cart', JSON.stringify(cart));

}

// Function to remove a product from the cart
export function removeFromCart(productId: string): void {
  const cart = getStoredCart();

  if (cart[productId]) {
    delete cart[productId]; 
    localStorage.setItem('cart', JSON.stringify(cart));
    
  } 
}

// Function to get the current cart
export function getCart(): Record<string, CartItem> {
  const cart = getStoredCart();
  return cart;
}


export function validateQuantity(product: Product, requestedQuantity: number): boolean {
  if (!product._id) {
    console.error("Product must have a valid ID.");
    return false;
  }

  if (product.quantity <= 0) {
    console.error("Product quantity is zero.");
    return false;
  }

  if (product.quantity >= requestedQuantity) {
 
    addToCart(product, requestedQuantity);
    return true;
  } else {
   
    return false;
  }
}

// Function to check if a product is in the cart
export function isProductInCart(productId: string): boolean {
  const cart = getStoredCart();
  return productId in cart;
}
