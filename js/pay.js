// add an event listener for the payment form's submission
document.getElementById('paymentForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // stop the form from submitting normally

    // collect form input values and remove extra spaces
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expMonth = parseInt(document.getElementById('expMonth').value);
    const expYear = parseInt(document.getElementById('expYear').value);
    const cvv = document.getElementById('cvv').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = ''; // clear any previous error message

    // valid mastercard numbers should start with these digits
    const validStart = ['51', '52', '53', '54', '55'];

    // get the current date for expiry validation
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // validate card number (must be 16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
        errorMsg.textContent = 'card number must be 16 digits.';
        return;
    }

    // validate card number prefix (must start with 51-55)
    if (!validStart.includes(cardNumber.substring(0, 2))) {
        errorMsg.textContent = 'card number must start with 51–55 (mastercard).';
        return;
    }

    // validate expiry date (must be a future valid date)
    if (
        expYear < currentYear ||
        (expYear === currentYear && expMonth < currentMonth) ||
        expMonth < 1 || expMonth > 12
    ) {
        errorMsg.textContent = 'card is expired or invalid date.';
        return;
    }

    // validate cvv (must be 3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
        errorMsg.textContent = 'cvv must be 3 or 4 digits.';
        return;
    }

    // prepare the data to send to the payment api
    const payload = {
        master_card: Number(cardNumber),
        exp_year: expYear,
        exp_month: expMonth,
        cvv_code: cvv
    };

    // attempt to send the data to the api using fetch
    try {
        const response = await fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // convert the response to json
        const data = await response.json();

        // check if the response was successful
        if (!response.ok) {
            throw new Error(data.message || 'server returned an error.');
        }

        // if successful, redirect to success page with last 4 digits of card
        const lastFour = cardNumber.slice(-4);
        window.location.href = `success.html?last4=${lastFour}`;

    } catch (err) {
        // display any error message to the user
        errorMsg.textContent = 'error: ' + err.message;
    }
});
