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
async function addToCartDb(productId: string, size: string) {
  const customerId = localStorage.getItem("customerId") || generateGuestId();

  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, productId, size }),
    });

    if (response.ok) {
      console.log("Add to Cart logged successfully");
    } else {
      console.error("Failed to log Add to Cart");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function generateGuestId() {
  const guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  localStorage.setItem("customerId", guestId);
  return guestId;
}



export function addToCart(product: Product, quantity: number): void {
  
  if (!product._id) {
    console.error("Product must have a valid ID.");
    return;
  }
  
  const cart = getStoredCart();


 
  // Define the selected size and create a unique key based on product ID and size
  const productSize = product.size as Record<string, number>;
  const selectedSizeKey = Object.keys(productSize)[0];
  const key = product._id + selectedSizeKey;
      
  console.log("Product:", product);
  console.log("Key:", key);

  // Check if the item with the specific size is already in the cart
  if (cart[key] && cart[key].product.size[selectedSizeKey]) {
    const availableStock = cart[key].product.size[selectedSizeKey];

    // Check if adding the quantity would exceed available stock
    if (availableStock >= cart[key].quantity + quantity) {
      cart[key].quantity += quantity;
      
    } else {
      console.warn("Not enough stock available for this size.");
      cart[key].quantity = availableStock; // Set to maximum available if it exceeds
    }

    // Prevent negative quantities
    if (cart[key].quantity <= 0) {
      removeFromCart(product);
    }
  } else {
    // Add a new item to the cart with the given size if it’s not already present
    cart[key] = { product, quantity };
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  addToCartDb(product.name, selectedSizeKey);
}


// Function to remove a product from the cart
export function removeFromCart(product: Product): void {

  const cart = getStoredCart();
  const productSize = product.size as Record<string, number>;
  const selectedSizeKey = Object.keys(productSize)[0];
  const key = product._id + selectedSizeKey;
  if (cart[key]) {
    delete cart[key]; 
    localStorage.setItem('cart', JSON.stringify(cart));
    
  } 
}

// Function to get the current cart
export function getCart(): Record<string, CartItem> {
  const cart = getStoredCart();
  return cart;
}


// export function validateQuantity(product: Product, requestedQuantity: number): boolean {
//   if (!product._id) {
//     console.error("Product must have a valid ID.");
//     return false;
//   }

//   if (product.quantity <= 0) {
//     console.error("Product quantity is zero.");
//     return false;
//   }

//   if (product.quantity >= requestedQuantity) {
 
//     addToCart(product, requestedQuantity);
//     return true;
//   } else {
   
//     return false;
//   }
// }

// Function to check if a product is in the cart
// export function isProductInCart(product: Product): boolean {
//   const cart = getStoredCart();
//   const productSize = product.size as Record<string, number>;
//   const selectedSizeKey = Object.keys(productSize)[0];
//   const key = product._id + selectedSizeKey;
//   return key in cart;
// }
