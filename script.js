document.addEventListener("DOMContentLoaded", () => {
  const displayMessage = (elementId, message, isError = false) => {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.style.display = "block";
    messageElement.style.color = isError ? "red" : "green";
  };

  const mortgageCalculation = document.getElementById("calculator");
  const mortgageResults = document.getElementById("results");

  document.querySelectorAll(".mortgageType").forEach((input) => {
    input.addEventListener("change", function () {
      document.querySelectorAll(".radio-option").forEach((div) => {
        div.classList.remove("selected");
      });
      this.parentElement.classList.add("selected");
    });
  });

  document.getElementById("calculationBtn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("amount").value);
    const term = parseFloat(document.getElementById("term").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const mortgageType = document.querySelector("input[name='mortgageType']:checked");

    let isValid = true;

    if (isNaN(amount) || amount <= 0) {
      displayMessage("amount-message", "This field is required", true);
      isValid = false;
    }
    if (isNaN(term) || term <= 0) {
      displayMessage("term-message", "This field is required", true);
      isValid = false;
    }
    if (isNaN(rate) || rate <= 0) {
      displayMessage("rate-message", "This field is required", true);
      isValid = false;
    }
    if (!mortgageType) {
      displayMessage("radioButtons-message", "This field is required", true);
      isValid = false;
    }

    if (!isValid) return;

    let monthlyPayment = 0;
    let totalPayment = 0;
    const monthlyRate = rate / 12;
    const n = term * 12;

    if (mortgageType.value === "repayment") {
      monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      totalPayment = monthlyPayment * n;
    } else if (mortgageType.value === "interestOnly") {
      monthlyPayment = (amount * rate) / 12;
      totalPayment = monthlyPayment * n;
    }

    mortgageResults.innerHTML = `
      <h3>Your Results</h3>
      <p>
        Your results are shown below based on the information you
        provided.To adjust the results, edit the form and click
        'calculate payments' again.
      </p>
      <div class="payments">
        <p>Your monthly repayments</p>
        <h1>£${monthlyPayment.toFixed(2)}</h1>
        <hr>
        <p>Total you'll repay over the term</p>
        <h3>£${totalPayment.toFixed(2)}</h3>
      </div>
    `;

    mortgageResults.classList.remove("hide");
    mortgageCalculation.classList.add("show");
  });
});
