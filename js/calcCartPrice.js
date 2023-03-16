function calcCartPriceAndDelivery() {
   const cartItems = document.querySelectorAll('.cart-item'),
      totalPriceEl = document.querySelector('.total-price'),
      deliveryCost = document.querySelector('.delivery-cost'),
      cartDelivery = document.querySelector('[data-cart-delivery]');

   let priceTotal = 0;


   cartItems.forEach(function (item) {

      const amountEl = item.querySelector('[data-counter]');
      const priceEl = item.querySelector('.price__currency');

      const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);

      priceTotal += currentPrice;
   });

   
   totalPriceEl.innerText = priceTotal;

   // Скриваємо/показуємо блок вартості доставки
   if (priceTotal > 0) {
      cartDelivery.classList.remove('none');
   } else {
      cartDelivery.classList.add('none');
   }

   // Розраховуємо вартість доставки
   if (priceTotal >= 600) {
      deliveryCost.classList.add('free');
      deliveryCost.innerText = 'Безкоштовна';
   } else {
      deliveryCost.classList.remove('free');
      deliveryCost.innerText = '80 ₴';
   }
}