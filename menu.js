function refreshMenu() {
  // Getting the main div to append all the menu items to
  var menu = document.getElementById("menu");

  // Deleting all the previous menuItem elements
  removeElementsByClass("menuItem");

  // Getting sorted array of pizzas depending on selected sort parameter
  var sortBy = document.getElementById("sort").value;
  var pizzasArray = window[sortBy]();

  for (var i = 0; i < pizzasArray.length; i++) {
    // Passing pizza information as a JSON object and getting back menuItem element
    var menuItem = createMenuItemElement(pizzasArray[i]);
    // Appending menuItem to menu
    menu.appendChild(menuItem);
  }
}

function createMenuItemElement(obj) {
  var menuItem = document.createElement("div");
  setAttributes(menuItem, {
    class: "menuItem",
  });

  var pizzaPhotoAndAboutPizza = document.createElement("div");
  setAttributes(pizzaPhotoAndAboutPizza, {
    class: "pizzaPhotoAndAboutPizza",
  });
  menuItem.appendChild(pizzaPhotoAndAboutPizza);

  var pizzaPhoto = document.createElement("img");
  setAttributes(pizzaPhoto, {
    class: "pizzaPhoto",
    src: obj.photo,
    alt: obj.photo,
  });
  pizzaPhotoAndAboutPizza.appendChild(pizzaPhoto);

  var aboutPizza = document.createElement("div");
  setAttributes(aboutPizza, {
    class: "aboutPizza",
  });
  pizzaPhotoAndAboutPizza.appendChild(aboutPizza);

  var pizzaNamePriceAndHeat = document.createElement("div");
  setAttributes(pizzaNamePriceAndHeat, {
    class: "pizzaNamePriceAndHeat",
  });
  aboutPizza.appendChild(pizzaNamePriceAndHeat);

  var pizzaNamenamesFont = document.createElement("p");
  setAttributes(pizzaNamenamesFont, {
    class: "pizzaName namesFont",
  });
  pizzaNamenamesFont.innerHTML = obj.name;
  pizzaNamePriceAndHeat.appendChild(pizzaNamenamesFont);

  // Generating chili images according to the pizza's heat
  for (i = 0; i < obj.heat; i++) {
    var chiliPhoto = document.createElement("img");
    setAttributes(chiliPhoto, {
      class: "chiliPhoto",
      src: "./resources/chili.png",
      alt: "chili",
    });
    pizzaNamePriceAndHeat.appendChild(chiliPhoto);
  }

  var pizzaPricepricesFont = document.createElement("div");
  setAttributes(pizzaPricepricesFont, {
    class: "pizzaPrice pricesFont",
  });
  pizzaPricepricesFont.innerHTML = "€ " + obj.price;
  pizzaNamePriceAndHeat.appendChild(pizzaPricepricesFont);

  var menuToppings = document.createElement("div");
  setAttributes(menuToppings, {
    class: "menuToppings",
  });
  menuToppings.innerHTML = obj.toppings.join(", ");
  aboutPizza.appendChild(menuToppings);

  var submitButtonpricesFont = document.createElement("button");
  setAttributes(submitButtonpricesFont, {
    class: "submitButton pricesFont",
    onclick: "deletePizza('" + obj.name + "')",
  });
  submitButtonpricesFont.innerHTML = "Delete";
  menuItem.appendChild(submitButtonpricesFont);

  return menuItem;
}

// Delete specific pizza from sessionStorage
function deletePizza(pizzaName) {
  sessionStorage.removeItem(pizzaName);

  refreshMenu();
}

function sortPizzasByName() {
  pizzasArray = [];

  for (var i = 0; i < sessionStorage.length; i++) {
    pizzasArray.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
  }

  return pizzasArray.sort((a, b) => a.name.localeCompare(b.name));
}

function sortPizzasByHeat() {
  pizzasArray = [];

  for (var i = 0; i < sessionStorage.length; i++) {
    pizzasArray.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
  }

  return pizzasArray.sort((a, b) => parseFloat(a.heat) - parseFloat(b.heat));
}

function sortPizzasByPrice() {
  pizzasArray = [];

  for (var i = 0; i < sessionStorage.length; i++) {
    pizzasArray.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
  }

  return pizzasArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}
