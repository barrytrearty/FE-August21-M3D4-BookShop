"strict mode";

let booksArray = [];
const mainBookSection = document.getElementById("main-book-section");

//Call fetch and display books onload
window.onload = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((books) => {
      console.log(books);
      booksArray = books;
      displayBooks(books); //Probably better
      //   booksArray.forEach((book) => displayBooks(book));
    })
    .catch((err) => console.log(err));
};

//Probably better
const displayBooks = function (booksArray) {
  booksArray.forEach((bookObject) => {
    let newBookCard = document.createElement("div");
    newBookCard.classList.add("col");
    newBookCard.id = Number(bookObject.asin);
    newBookCard.innerHTML = `<div class="card mt-3">
    <img src="${bookObject.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${bookObject.title}</h5>
      <div class="under-the-title">
          <h4>${bookObject.price}</h4>
          <div class="buttons-sect">
              <button  class="btn btn-success cart-button" onclick="addItemToCart(event)" ><i class="bi bi-cart-fill"></i> </button>
              <button  class="btn btn-danger" onclick="skipItem(event)"><i class="bi bi-trash"></i> </button>
          </div>
      </div>
    </div></div>`;
    mainBookSection.appendChild(newBookCard);
  });
};

// const displayBooks = function (bookObject) {
//   let newBookCard = document.createElement("div");
//   newBookCard.classList.add("col");
//   newBookCard.id = Number(bookObject.asin);
//   newBookCard.innerHTML = `<div class="card mt-3">
//   <img src="${bookObject.img}" class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${bookObject.title}</h5>
//     <div class="under-the-title">
//         <h4>${bookObject.price}</h4>
//         <div class="buttons-sect">
//             <button  class="btn btn-success cart-button" onclick="addItemToCart(event)" ><i class="bi bi-cart-fill"></i> </button>
//             <button  class="btn btn-danger" onclick="skipItem(event)"><i class="bi bi-trash"></i> </button>
//         </div>
//     </div>
//   </div></div>`;
//   mainBookSection.appendChild(newBookCard);
// };

/////////////////////////////////////////////////////////////////////////////////////

//Clear main section and display filtered books from searchbar input

function filterBooks(query) {
  mainBookSection.innerHTML = "";
  if (query.length > 2 || query === "") {
    const filteredBooks = booksArray.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredBooks);

    displayBooks(filteredBooks);
  }
}

/////////////////////////////////////////////////////////////////////////////////////

// As there was a problem with IDs I switched to using event.target.closest for both of the cart buttons
let cart = [];
const cartNumber = document.getElementById("cart-number");
cartNumber.innerHTML = `${cart.length}`;

// const skipItem = function (bookId) {
// let itemToBeSkipped = document.getElementById(bookId)
const skipItem = function (event) {
  let itemToBeSkipped = event.target.closest(".col");
  console.log(itemToBeSkipped);
  itemToBeSkipped.remove();
  if (itemToBeSkipped.classList.contains("selected")) {
    let bookIndex = cart.findIndex((item) => item === itemToBeSkipped.id);
    cart.splice(bookIndex, 1);
    console.log(cart);
    cartNumber.innerHTML = `${cart.length}`;
  }
};

// const addItemToCart = function (bookId) {
// let selectedItem = document.getElementById(bookId);
const addItemToCart = function (event) {
  let selectedItem = event.target.closest(".col");
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

////////////////////////////////////////////////////////////////////////////////////////////////

//For some reason this would not work with getElementsByClassName but did with querySelectorAll
const emptyCart = function () {
  //   let selectedItems = document.getElementsByClassName("selected");
  let selectedItems = document.querySelectorAll(".selected");
  for (item of selectedItems) {
    item.classList.remove("selected");
  }
  console.log(selectedItems);
  cart = [];
  cartNumber.innerHTML = `${cart.length}`;
  console.log(cart);
};
