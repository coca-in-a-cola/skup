const total = document.querySelector('[skup-total]');
const resetAll = document.querySelector('[skup-reset-all]');
const skupItems = document.querySelectorAll('tr[is="skup-item"]');

resetAll.addEventListener('click', () => {
  for (const item of skupItems) {
    item.quantity = 0;
  }

  total.textContent = 0;
});

document.addEventListener('item-changed', (event) => {
  let resultSum = 0;
  for (const item of skupItems) {
    resultSum += item.sum;
  }

  total.textContent = resultSum;
})