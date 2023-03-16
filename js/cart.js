import toggleCartStatus from './toggleCartStatus';
import calcCartPriceAndDelivery from './calcCartPrice';

const cartWrapper = document.querySelector('.cart-wrapper');

// Відслідковуємо клік на сторніці 
window.addEventListener('click', function (event) {
   if (event.target.hasAttribute('data-cart')) {

      // Знаходимо карточку товару всередині якої був клік
      const card = event.target.closest('.card');

      // Збираємо дані з цього товару і записуємо в обєкт
      const productInfo = {
         id: card.dataset.id,
         imgSrc: card.querySelector('.product-img').getAttribute('src'),
         title: card.querySelector('.item-title').innerText,
         itemsInBox: card.querySelector('[data-items-in-box]').innerText,
         weight: card.querySelector('.price__weight').innerText,
         price: card.querySelector('.price__currency').innerText,
         counter: card.querySelector('[data-counter]').innerText
      };

      // Провіряємо чи є товар вже в корзині
      const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

      if (itemInCart) {
         const counterEl = itemInCart.querySelector('[data-counter]');
         counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter);
      } else {
         // Зібрані дані підставимо в шаблон товара в корзині
         const cardItemHTML = `
         <div class="cart-item" data-id="${productInfo.id}">
         <div class="cart-item__top">
            <div class="cart-item__img">
               <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
            </div>
            <div class="cart-item__desc">
               <div class="cart-item__title">${productInfo.title}</div>
               <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

               <!-- cart-item__details -->
               <div class="cart-item__details">

                  <div class="items items--small counter-wrapper">
                     <div class="items__control" data-action="minus">-</div>
                     <div class="items__current" data-counter="">${productInfo.counter}</div>
                     <div class="items__control" data-action="plus">+</div>
                  </div>

                  <div class="price">
                     <div class="price__currency">${productInfo.price}</div>
                  </div>

               </div>
               <!-- // cart-item__details -->

            </div>
         </div>
      </div>
      `;
         // Відображаємо товар в корзині
         cartWrapper.insertAdjacentHTML('beforeend', cardItemHTML);


      }

      card.querySelector('[data-counter]').innerText = '1';

      // Визиваємо функцію 
      toggleCartStatus();

      // Рахуємо загальну суму
      calcCartPriceAndDelivery();
   }
});