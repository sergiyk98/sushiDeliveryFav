import toggleCartStatus from './toggleCartStatus';
import calcCartPriceAndDelivery from './calcCartPrice';

window.addEventListener('click', function (event) {

   // Обявляємо змінну для лічильника
   let counter;

   if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
      // Знаходимо обгортку лічильника
      const counterWrapper = event.target.closest('.counter-wrapper');

      // Знаходимо дів з числом лічильника
      counter = counterWrapper.querySelector('[data-counter]');

   }

   // Провіряємо  чи є елемент кнопкою плюс
   if (event.target.dataset.action === 'plus') {
      counter.innerText = ++counter.innerText;
   }

   // Провіряємо  чи є елемент кнопкою мінус
   if (event.target.dataset.action === 'minus') {

      // Провірка на товар який знаходться в корзині


      // Провіряємо щоб лічильники був більше 1
      if (parseInt(counter.innerText) > 1) {
         // Змінюємо текст в лічильнику зменшуючи на 1
         counter.innerText = --counter.innerText;

      } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {

         event.target.closest('.cart-item').remove();

         // Визиваємо функцію 
         toggleCartStatus();

         calcCartPriceAndDelivery();
      }

   }

   if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
      calcCartPriceAndDelivery();
   }
   
});