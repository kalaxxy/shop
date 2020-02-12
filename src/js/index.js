import "./import/modules";

import {data} from "./import/pages/catalog";

let cart = {};

getProducts(data);
checkCart();

function getProducts(data) {
  let product = '';
  checkCart();
  
  for (let item in data) {
    product += "<div class='product' data-id=" + data[item].id + ">";
    product += "<img class='product__img' src='" + data[item].image + "'>";
    product += "<div class='product__id'>" + (data[item].id + 1) + "</div>";
    product += "<div class='product__title'>" + data[item].title + "</div>";
    product += "<div class='product__price'>" + data[item].price + "</div>";
    product += data[item].available ? "<div class='product__availability product__availability--color--green'>в наличии</div>" : "<div class='product__availability product__availability--color--yellow'>под заказ</div>"
    product += "<div class='product__desc'>Описание: " + data[item].descr + ".</div>";
    product += "<div class='product__row'>"
    product += "<button class='product__btn' data-id=" + data[item].id + ">Добавить в корзину</button>"
    product += "<div class='product__quant'></div>"
    product += "</div>";
    product += "</div>";
  }

  document.querySelector('.catalog').innerHTML = product;
  
  pagination();
  addToCart();
  sortProductTitle();
  sortProductUpPrice();
  sortProductDownPrice();
  filterProductAvailability();
};

function pagination() {
  const productsPerPage = 15;
  const productItem = document.querySelectorAll('.product');
  const countPages = Math.ceil(productItem.length / productsPerPage);
  let page = '';
  for (let i = 0; i < countPages; i++) {
    page += "<li class='page' data-page='" + i * productsPerPage + "'>" + (i + 1) + "</li>"
  };
  document.querySelector('.pagination').innerHTML = page;

  
  for (let i = 0; i < productItem.length; i++) {
    if (i < productsPerPage) {
      productItem[i].style.display = 'block';
    }
  }

  const paginationBtns = document.querySelectorAll('.page');
  for (let btn of paginationBtns) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const dataPage = +e.target.getAttribute('data-page');
      let j = 0;
      
      for (let i = 0; i < productItem.length; i++) {
        productItem[i].style.display = 'none';
      };
      for (let i = dataPage; i < productItem.length; i++) {
        if (j >= productsPerPage) break;
        productItem[i].style.display = 'block';
        j++;
      };
    })
  }
};

function addToCart() {
  const buyBtns = document.querySelectorAll('.product__btn');;
  for (let btn of buyBtns) {
    let dataId = btn.getAttribute('data-id');
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (cart[dataId] !== undefined) {
        cart[dataId]++;
      } else {
        cart[dataId] = 1;
      };
      localStorage.setItem('cart', JSON.stringify(cart)); 
      btn.nextElementSibling.innerHTML = cart[dataId];
    })
    if (cart[dataId] !== undefined)
    btn.nextElementSibling.innerHTML = cart[dataId];  }
};

function checkCart() {
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
};

function sortProductTitle() {
  const sortBtn = document.querySelector('.sort__title');
  sortBtn.addEventListener('click', e => {
    e.preventDefault();
    data.sort((prev, next) => {
      if (prev.title < next.title)
      {return -1;}
      if (prev.title > next.title)
      {return 1;}
      return 0;
    });
    getProducts(data);    
  })
};

function sortProductUpPrice() {
  const sortBtn = document.querySelector('.sort__price-up');
  sortBtn.addEventListener('click', e => {
    e.preventDefault();
    data.sort((prev, next) => {
      const prevPrice = prev.price;
      const nextPrice = next.price;
      return prevPrice - nextPrice;
    });
    getProducts(data);
  })
};

function sortProductDownPrice() {
  const sortBtn = document.querySelector('.sort__price-down');
  sortBtn.addEventListener('click', e => {
    e.preventDefault();
    data.sort((prev, next) => {
      const prevPrice = prev.price;
      const nextPrice = next.price;
      return nextPrice - prevPrice;
    });
    getProducts(data);
  })
};

function filterProductAvailability() {
  const sortBtn = document.querySelector('.sort__available');
  sortBtn.addEventListener('click', e => {
    e.preventDefault();
    const copyData = data.filter(el => el.available === true);
    getProducts(copyData);
  })
}