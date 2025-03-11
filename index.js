// Card Form Input Fields
const cardHolderInput = document.getElementById("cardHolder");
const cardNumberInput = document.getElementById("cardNumber");
const cardMonthInput = document.getElementById("cardMonth");
const cardYearInput = document.getElementById("cardYear");
const cardCvcInput = document.getElementById("cardCvc");

// Card Display Fields
const cardHolderDisplay = document.getElementById("cardHolderDisplay");
const cardNumberDisplay = document.getElementById("cardNumberDisplay");
const cardMonthDisplay = document.getElementById("cardMonthDisplay");
const cardYearDisplay = document.getElementById("cardYearDisplay");
const cardCvcDisplay = document.getElementById("cardCvcDisplay");

// Buttons
const cardFormButton = document.getElementById("submit");
const cardContinueButton = document.getElementById("continue");

let formCompleted = false;

cardHolderInput.addEventListener("input", (event) => {
  let name = event.target.value.replace(/[^a-zA-z\s]/g, "").toUpperCase();
  event.target.value = name;
  cardHolderDisplay.textContent = name || "Name";
});

cardNumberInput.addEventListener("input", (event) => {
  let number = event.target.value.replace(/\D/g, "");
  number = number.slice(0, 16);
  let formattedNumber = number.replace(/(.{4})/g, "$1 ").trim();
  event.target.value = formattedNumber;
  cardNumberDisplay.textContent = formattedNumber || "0000 0000 0000 0000";
});

cardMonthInput.addEventListener("input", (event) => {
  let month = event.target.value.replace(/\D/g, "");
  month = month.slice(0, 2);
  event.target.value = month;
  cardMonthDisplay.textContent =
    (month.length > 0 && month.length < 2 ? `0${month}` : month) || "00";
});

cardYearInput.addEventListener("input", (event) => {
  let year = event.target.value.replace(/\D/g, "");
  year = year.slice(0, 2);
  event.target.value = year;
  cardYearDisplay.textContent = year || "00";
});

cardCvcInput.addEventListener("input", (event) => {
  let cvc = event.target.value.replace(/\D/g, "");
  cvc = cvc.slice(0, 3);
  event.target.value = cvc;
  cardCvcDisplay.textContent = cvc || "000";
});

// Error Field Message
function errorMessageElement({ message, errorElement, errorElement2 }) {
  if (errorElement.nextElementSibling?.tagName !== "P") {
    const p = document.createElement("p");
    p.textContent = message;
    p.classList.add("hidden");
    errorElement.insertAdjacentElement("afterend", p);
    errorElement.classList.add("error-input");
    errorElement2 && errorElement2.classList.add("error-input");

    setTimeout(() => {
      p.classList.remove("hidden");
      p.classList.add("visible");
    }, 0);

    setTimeout(() => {
      p.classList.add("fade-out");
      setTimeout(() => {
        errorElement.classList.remove("error-input");
        errorElement2 && errorElement2.classList.remove("error-input");
        p.parentNode.removeChild(p);
      }, 500);
    }, 5000);
  }
}

// Change View From Form to Completed
function changeView({ form, completed }) {
  const formView = document.querySelector(".form-card");
  const completedView = document.querySelector(".form-completed");

  form
    ? ((formView.style.display = "block"),
      setTimeout(() => {
        formView.style.opacity = 1;
      }, 10))
    : ((formView.style.display = "none"),
      setTimeout(() => {
        formView.style.opacity = 0;
      }, 10));

  completed
    ? ((completedView.style.display = "block"),
      setTimeout(() => {
        completedView.style.opacity = 1;
      }, 10))
    : ((completedView.style.display = "none"),
      setTimeout(() => {
        completedView.style.opacity = 0;
      }, 10));
}

// Check If Form Completed
cardFormButton.addEventListener("click", () => {
  if (cardHolderInput.value.trim() === "") {
    errorMessageElement({
      message: "Invalid Name",
      errorElement: cardHolderInput,
    });
    formCompleted = false;
  } else {
    formCompleted = true;
  }

  if (cardNumberInput.value.length !== 19) {
    errorMessageElement({
      message: "Invalid Number",
      errorElement: cardNumberInput,
    });
    formCompleted = false;
  } else {
    formCompleted = true;
  }

  if (cardMonthInput.value === "" && cardYearInput.value === "") {
    errorMessageElement({
      message: "Can't be blank",
      errorElement: cardYearInput,
      errorElement2: cardMonthInput,
    });

    formCompleted = false;
  } else {
    if (cardMonthInput.value === "") {
      errorMessageElement({
        message: "Can't be blank",
        errorElement: cardMonthInput,
      });
      formCompleted = false;
    } else {
      formCompleted = true;
    }

    if (cardYearInput.value === "") {
      errorMessageElement({
        message: "Can't be blank",
        errorElement: cardYearInput,
      });
      formCompleted = false;
    } else {
      formCompleted = true;
    }
  }

  if (cardCvcInput.value === "") {
    errorMessageElement({
      message: "Invalid CVC",
      errorElement: cardCvcInput,
    });
    formCompleted = false;
  } else {
    formCompleted = true;
  }

  // Check If Form Fields Filled
  if (
    cardHolderInput.value !== "" &&
    cardNumberInput.value.length === 19 &&
    cardMonthInput.value !== "" &&
    cardYearInput.value !== "" &&
    cardCvcInput.value !== ""
  ) {
    changeView({ form: false, completed: true });
  }
});

// Continue After Form Completed
cardContinueButton.addEventListener("click", () => {
  // changeView({ form: true, completed: false });
  location.reload();
});
