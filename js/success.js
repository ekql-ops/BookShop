// get the query string parameters from the url
const params = new URLSearchParams(window.location.search);

// retrieve the value of the 'last4' parameter (last 4 digits of card)
const last4 = params.get('last4');

// check if 'last4' exists in the url
if (last4) {
    // if it exists, display the card details with the last 4 digits
    document.getElementById('cardInfo').innerHTML = `debit/credit card <strong>mastercard</strong> <img src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard" /> <br>card ending in **** **** **** ${last4}`;
} else {
    // if it doesn't, show a default message
    document.getElementById('cardInfo').textContent = 'card details unavailable.';
}
