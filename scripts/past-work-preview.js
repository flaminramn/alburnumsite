fetch("data/gallery.json")
  .then(r => r.json())
  .then(items => {
    if (!items.length) return;

    const img = document.getElementById("pastWorkImage");
    if (!img) return;

    function setRandomImage() {
      const index = Math.floor(Math.random() * items.length);
      img.src = items[index].image;
    }

    setRandomImage();
    setInterval(setRandomImage, 5000);
  });
