console.log("paypal.js loaded");

paypal.Buttons({
  style: {
    layout: "vertical",
    shape: "rect",
    label: "checkout",
    height: 40
  },

  createOrder: function (data, actions) {
    const total = document.getElementById("checkoutTotal").textContent;

    if (!total || total === "0.00") {
      alert("Your cart is empty");
      return;
    }

    return actions.order.create({
      purchase_units: [{
        amount: { value: total }
      }]
    });
  },

  onApprove: function (data, actions) {
    return actions.order.capture().then(function () {
      clearCart();
      alert("Payment completed");
      window.location.href = "index.html";
    });
  }
}).render("#paypal-button-container");

