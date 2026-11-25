const loginForm = document.querySelector("#login-form");
const paymentForm = document.querySelector("#payment-form");
const checkoutStatus = document.querySelector("#checkout-status");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginForm.reset();
    loginForm.hidden = true;
    paymentForm.hidden = false;
    paymentForm.querySelector("select").focus();
});

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    paymentForm.reset();
    checkoutStatus.textContent = "Demo complete. No payment was processed.";
});
