const buyerForm = document.querySelector("#buyer-form");
const paymentForm = document.querySelector("#payment-form");
const checkoutStatus = document.querySelector("#checkout-status");
const unitName = document.querySelector("#unit-name");
const unitPrice = document.querySelector("#unit-price");
const housingChoices = Array.from(document.querySelectorAll('input[name="housing-unit"]'));
const editDetailsButton = document.querySelector("#edit-details");
const profileReceipt = document.querySelector("#profile-receipt");

const units = {
    condo: { name: "Condo", price: "$23,000" },
    "studio-apartment": { name: "Studio Apartment", price: "Price on request" },
    "one-bedroom-apartment": { name: "One-Bedroom Apartment", price: "Price on request" },
    "shared-lounge": { name: "Shared Lounge", price: "Price on request" },
    "co-living-suite": { name: "Co-Living Suite", price: "Price on request" },
    "furnished-private-room": { name: "Furnished Private Room", price: "Price on request" },
    "private-ensuite-room": { name: "Private Ensuite Room", price: "Price on request" },
};

const requestedUnit = new URLSearchParams(window.location.search).get("unit");
const hasRequestedUnit = requestedUnit !== null
    && Object.prototype.hasOwnProperty.call(units, requestedUnit);

if (hasRequestedUnit) {
    const requestedChoice = housingChoices.find((choice) => choice.value === requestedUnit);
    if (requestedChoice) {
        requestedChoice.checked = true;
    }
} else if (requestedUnit !== null) {
    checkoutStatus.textContent = "That housing link was not recognised. Please choose an option from the catalog.";
}

function updateSelectedHousing() {
    const selectedChoice = housingChoices.find((choice) => choice.checked);
    const selectedUnit = selectedChoice ? units[selectedChoice.value] : null;

    unitName.textContent = selectedUnit ? selectedUnit.name : "Choose a home from the catalog.";
    unitPrice.textContent = selectedUnit ? selectedUnit.price : "Price will appear here.";
}

housingChoices.forEach((choice) => {
    choice.addEventListener("change", () => {
        checkoutStatus.textContent = "";
        updateSelectedHousing();
    });
});

updateSelectedHousing();

buyerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkoutStatus.textContent = "";
    buyerForm.hidden = true;
    paymentForm.hidden = false;
    paymentForm.querySelector("select").focus();
});

editDetailsButton.addEventListener("click", () => {
    paymentForm.hidden = true;
    buyerForm.hidden = false;
    document.querySelector("#buyer-name").focus();
});

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedChoice = housingChoices.find((choice) => choice.checked);
    const selectedValue = selectedChoice ? selectedChoice.value : null;
    const selectedUnit = selectedValue ? units[selectedValue] : null;
    const selectedBank = paymentForm.querySelector("#bank").selectedOptions[0].textContent;
    const moveInDate = document.querySelector("#move-in-date").value || "To be arranged";
    const receiptValues = {
        "receipt-reference": `SN-${Date.now().toString(36).toUpperCase()}`,
        "receipt-unit": selectedUnit ? selectedUnit.name : "Not selected",
        "receipt-price": selectedUnit ? selectedUnit.price : "Price on request",
        "receipt-name": document.querySelector("#buyer-name").value,
        "receipt-email": document.querySelector("#buyer-email").value,
        "receipt-phone": document.querySelector("#buyer-phone").value,
        "receipt-move-in": moveInDate,
        "receipt-bank": selectedBank,
        "receipt-date": new Date().toISOString().slice(0, 10),
    };

    Object.entries(receiptValues).forEach(([id, value]) => {
        document.querySelector(`#${id}`).textContent = value;
    });

    paymentForm.reset();
    buyerForm.reset();
    const choiceToRestore = housingChoices.find((choice) => choice.value === selectedValue);
    if (choiceToRestore) {
        choiceToRestore.checked = true;
    }
    updateSelectedHousing();
    paymentForm.hidden = true;
    profileReceipt.hidden = false;
    checkoutStatus.textContent = "Demo complete. No details were submitted or saved, and no payment was processed. Your profile receipt preview is below.";
});

document.querySelector("#print-receipt").addEventListener("click", () => {
    window.print();
});