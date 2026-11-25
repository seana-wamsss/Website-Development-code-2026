const loginForm = document.querySelector("#login-form");
const paymentForm = document.querySelector("#payment-form");
const checkoutStatus = document.querySelector("#checkout-status");
const unitName = document.querySelector("#unit-name");
const unitPrice = document.querySelector("#unit-price");

const units = {
    condo: { name: "Condo", price: "$23,000" },
    "studio-apartment": { name: "Studio Apartment", price: "Price on request" },
    "one-bedroom-apartment": { name: "One-Bedroom Apartment", price: "Price on request" },
    "shared-lounge": { name: "Shared Lounge", price: "Price on request" },
    "co-living-suite": { name: "Co-Living Suite", price: "Price on request" },
    "furnished-private-room": { name: "Furnished Private Room", price: "Price on request" },
    "private-ensuite-room": { name: "Private Ensuite Room", price: "Price on request" },
};

const requestedUnit = new URLSearchParams(window.location.search).get("unit") || "condo";
const selectedUnit = Object.prototype.hasOwnProperty.call(units, requestedUnit)
    ? units[requestedUnit]
    : null;

if (selectedUnit) {
    unitName.textContent = selectedUnit.name;
    unitPrice.textContent = selectedUnit.price;
} else {
    loginForm.hidden = true;
    paymentForm.hidden = true;
    checkoutStatus.textContent = "We couldn't find that unit. Please return to SkyNest and choose a listing.";
}

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