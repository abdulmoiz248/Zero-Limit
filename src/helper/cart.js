export function addToCart(product, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  if(product.quantity-quantity<0) return ;
  if (cart[product._id]) {
    cart[product._id].quantity += quantity;
  } else {
    cart[product._id] = { product, quantity };
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  if (cart[productId]) {
    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}
export function validateQuantity(productId, requestedQuantity) {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');

  if (cart[productId]) {
    const product = cart[productId].product;

    if (product.quantity <= 0) return false;  //10<=0

    if (product.quantity >= requestedQuantity) { //10>=0
      product.quantity -= requestedQuantity;
      addToCart(product,0);
      
      return true;
    }
  }
  
  return false;
}
