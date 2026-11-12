
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 1499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 3,
    name: "Stylish Watch",
    price: 999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 4,
    name: "Headphones",
    price: 1299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function displayProducts(items) {
  productGrid.innerHTML = "";

  items.forEach(product => {
    productGrid.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "Your cart is empty.";
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <span>
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
          <button onclick="removeItem(${item.id})">Remove</button>
        </span>
      </div>
    `;
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

function changeQuantity(id, change) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeItem(id);
  } else {
    updateCart();
  }
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

document.getElementById("searchInput")
  .addEventListener("input", function() {
    const search = this.value.toLowerCase();

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );

    displayProducts(filtered);
  });

document.getElementById("cartButton")
  .addEventListener("click", () => {
    document.getElementById("cart").scrollIntoView({
      behavior: "smooth"
    });
  });

document.getElementById("checkoutButton")
  .addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Demo checkout! Connect a payment gateway to accept real payments.");
  });

displayProducts(products);
updateCart();
