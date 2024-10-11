export function addToCart(product, quantity) {
  console.log('addToCart', product, quantity);
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
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
