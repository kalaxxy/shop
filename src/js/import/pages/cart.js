import {data} from "./catalog";

let cart = {};

checkCart();
getCart();

function checkCart() {
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function getCart() {
  let cartProduct = '';

  if (JSON.stringify(cart) == "{}") {
    cartProduct += "<div class='cart__empty'>Корзина пуста</div>"
  } else {
    let sum = 0;
    for (let item in cart) {
      cartProduct += "<li class='cart__item cart-item'>";
      cartProduct += "<button class='cart__remove' data-id='" + item + "'>Х</button>"
      cartProduct += "<img class='cart-item__img' src='" + data[item].image + "'>";
      cartProduct += "<div class='cart-item__title'>" + data[item].id + " " + data[item].title + "</div>";
      cartProduct += "<div class='cart-item__price'>" + data[item].price + "</div>";
      cartProduct += "<button class='cart__del' data-id='" + item + "'>-</button>"
      cartProduct += "<div class='cart-item__quantity'>" + cart[item] + "</div>";
      cartProduct += "<button class='cart__add' data-id='" + item + "'>+</button>"
      cartProduct += "<div class='cart-item__sum'>" + cart[item]*data[item].price + "</div>";
      cartProduct += "</li>";
      
      sum += cart[item]*data[item].price;
    };
    
    document.querySelector('.sum__num').innerHTML = sum;
  }

  document.querySelector('.cart__list').innerHTML = cartProduct;

  addOneProduct();
  delOneProduct();
  removeProducts();
};

function addOneProduct() {
  const addBtns = document.querySelectorAll('.cart__add');
  for (let btn of addBtns) {
    btn.addEventListener('click', e => {
    e.preventDefault();
    let btnId = btn.getAttribute('data-id');
    cart[btnId]++;
    localStorage.setItem('cart', JSON.stringify(cart));
    getCart();
    });
  }
};

function delOneProduct() {
  const delBtns = document.querySelectorAll('.cart__del');
  for (let btn of delBtns) {
    btn.addEventListener('click', e => {
    e.preventDefault();
    let btnId = btn.getAttribute('data-id');
    if (cart[btnId] > 1) {
      cart[btnId]--
    } else {
      delete cart[btnId]
    };
    localStorage.setItem('cart', JSON.stringify(cart));
    getCart();
    });
  }
};

function removeProducts() {
  const removeBtns = document.querySelectorAll('.cart__remove');
  for (let btn of removeBtns) {
    btn.addEventListener('click', e => {
    e.preventDefault();
    let btnId = btn.getAttribute('data-id');
    delete cart[btnId];
    localStorage.setItem('cart', JSON.stringify(cart));
    getCart();
    });
  }
};