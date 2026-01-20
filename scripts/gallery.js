fetch("data/gallery.json")
  .then(r => r.json())
  .then(items => {
    const grid = document.getElementById("gallery-grid");
    const filter = document.getElementById("galleryCategoryFilter");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");

    const categories = [...new Set(items.map(i => i.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      filter.appendChild(option);
    });

    function render(list) {
      grid.innerHTML = "";

      list.forEach(i => {
        const div = document.createElement("div");
        div.className = "gallery-item";

        const img = document.createElement("img");
        img.src = i.image;
        img.alt = i.title;
        img.loading = "lazy";

        img.addEventListener("click", () => {
          lightboxImage.src = i.full || i.image;
          lightbox.classList.remove("hidden");
        });

        div.appendChild(img);
        grid.appendChild(div);
      });
    }

    filter.addEventListener("change", () => {
      const value = filter.value;
      if (value === "All") {
        render(items);
      } else {
        render(items.filter(i => i.category === value));
      }
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });

    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) {
        lightbox.classList.add("hidden");
      }
    });

    render(items);
  });
