"strict mode";

const mainBookSection = document.getElementById("main-book-section");

//Code for cart
let cart = [];
const cartNumber = document.getElementById("cart-number");
cartNumber.innerHTML = `${cart.length}`;

const displayBooks = function (bookObject) {
  let newBookCard = document.createElement("div");
  newBookCard.classList.add("col");
  newBookCard.id = bookObject.asin;
  newBookCard.innerHTML = `<div class="card mt-3">
  <img src="${bookObject.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${bookObject.title}</h5>
    <div class="under-the-title">
        <h4>${bookObject.price}</h4>
        <div class="buttons-sect"> 
            <button id="${bookObject.asin}button" class="btn btn-success cart-button" onclick="addItemToCart(${bookObject.asin})" ><i class="bi bi-cart-fill"></i> </button>
            <button  class="btn btn-danger" onclick="skipItem(${bookObject.asin})"><i class="bi bi-trash"></i> </button>
        </div>
    </div>
  </div></div>`;
  mainBookSection.appendChild(newBookCard);
};

const skipItem = function (bookId) {
  console.log(bookId);
  document.getElementById(bookId).remove();
};

const addItemToCart = function (bookId) {
  console.log(bookId);
  let selectedItem = document.getElementById(bookId);
  selectedItem.classList.toggle("selected");
  if (!selectedItem.classList.contains("selected")) {
    let bookIndex = cart.findIndex((item) => item === selectedItem.id);
    cart.splice(bookIndex, 1);
  } else {
    cart.push(selectedItem.id);
  }
  cartNumber.innerHTML = `${cart.length}`;
  console.log(cart);
};

const emptyCart = function () {
  //   let selectedItems = document.getElementsByClassName("selected");
  //   selectedItems.map((item) => item.classList.remove("selected"));
  cart = [];
  cartNumber.innerHTML = `${cart.length}`;
  console.log(cart);
};

const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((book) => displayBooks(book));
      //   const cartButtons = document.getElementsByClassName("cart-button");
      //   cartButtons.map((button) =>
      //     button.addEventListener("click", addBookToCart)
      //   );
    })
    .catch((err) => console.log(err));
};

getBooks();
