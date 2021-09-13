// Creates a toppings input field as well as - and + buttons in the add pizza form so user could add more toppings
function createFormToppingsChildInputElement() {
  var inputElement = document.createElement("input");
  setAttributes(inputElement, {
    type: "text",
    minlength: "2",
    maxlength: "30",
    class: "addPizzaInput",
    name: "toppingsInput",
  });
  inputElement.required = true;

  var minusButton = document.createElement("button");
  minusButton.innerHTML = "-";
  setAttributes(minusButton, {
    class: "minusButton",
    onclick: "deleteGrandparentNode(this)",
  });

  var formToppingsChildInputFieldAndMinusButtonContainer =
    document.createElement("div");
  setAttributes(formToppingsChildInputFieldAndMinusButtonContainer, {
    class: "formToppingsChildInputFieldAndMinusButtonContainer",
  });
  formToppingsChildInputFieldAndMinusButtonContainer.appendChild(inputElement);
  formToppingsChildInputFieldAndMinusButtonContainer.appendChild(minusButton);

  var plusButton = document.createElement("button");
  plusButton.innerHTML = "+";
  setAttributes(plusButton, {
    class: "plusButton",
    onclick: "createFormToppingsChildInputElement()",
  });

  var formToppingsChildInput = document.createElement("div");
  setAttributes(formToppingsChildInput, {
    class: "formToppingsChildInput",
  });
  formToppingsChildInput.appendChild(
    formToppingsChildInputFieldAndMinusButtonContainer
  );
  formToppingsChildInput.appendChild(plusButton);

  var formToppingsParentInput = document.getElementById(
    "formToppingsParentInput"
  );
  formToppingsParentInput.appendChild(formToppingsChildInput);
}

// Adds pizza to the sessionStorage
function addPizza() {
  // Check if pizza with that name already exists and show the error message
  var name = document.getElementById("name").value;
  if (sessionStorage.getItem(name) !== null) {
    document
      .getElementById("name")
      .setCustomValidity("Pizza with this name already exists.");
    return;
  }

  // Getting the rest of the form data
  var price = parseFloat(document.getElementById("price").value).toFixed(2); // toFixed(2) makes sure every price has 2 decimal points
  var heat = parseFloat(document.getElementById("heat").value);
  var photo = document.querySelector(
    'input[name="pizzaPhotoInForm"]:checked'
  ).value;

  // Getting all the toppings in a form of NodeList
  var toppingsNodeList = document.querySelectorAll("[name='toppingsInput']");
  var toppings = [];
  // Converting NodeList to Array
  toppingsNodeList.forEach((topping) => toppings.push(topping.value));

  // Putting all the form data into a JSON object
  var obj = {
    name: name,
    price: price,
    heat: heat,
    photo: photo,
    toppings: toppings,
  };

  // Adding pizza data into sessionStorage
  sessionStorage.setItem(name, JSON.stringify(obj));

  // Clear the form
  document.getElementById("addPizzaFormElement").reset();

  // Delete all the additional toppings input fields
  removeElementsByClass("formToppingsChildInput");

  // Update the menu
  refreshMenu();
}
