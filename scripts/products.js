console.log("products.js loaded");

fetch("data/products.json")
  .then(response => response.json())
  .then(products => {
    console.log("Products loaded:", products);

    window.productsData = products;

    const grid = document.getElementById("product-grid");
    const filter = document.getElementById("categoryFilter");

    if (!grid) {
      console.error("product-grid not found");
      return;
    }

    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      filter.appendChild(option);
    });

    function render(list) {
      grid.innerHTML = "";

      list.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p>Category: ${p.category}</p>
          <p>$${Number(p.price).toFixed(2)}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;

        grid.appendChild(card);
      });
    }

    filter.addEventListener("change", () => {
      const value = filter.value;
      if (value === "All") {
        render(products);
      } else {
        render(products.filter(p => p.category === value));
      }
    });

    render(products);
  })
  .catch(err => {
    console.error("Failed to load products.json", err);
  });
