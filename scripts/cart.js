console.log("cart.js loaded");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = window.productsData.find(p => p.id === productId);
  if (!product) return;

  const exists = cart.some(item => item.id === productId);
  if (exists) {
    alert("This item is already in your cart.");
    return;
  }

  cart.push({
    id: product.id,
    name: product.name,
    price: Number(product.price)
  });

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalSpan = document.getElementById("cartTotal");

  if (!cartDiv || !totalSpan) return;

  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const row = document.createElement("div");
    row.innerHTML = `
      ${item.name} – $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartDiv.appendChild(row);
  });

  totalSpan.textContent = total.toFixed(2);
}

/* Restore cart on page load */
document.addEventListener("DOMContentLoaded", renderCart);
