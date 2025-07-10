export class SkupItem extends HTMLTableRowElement {

  _price = 0;
  _quantity = 0;

  /**
   * @param {number} value
   */
  set price(value) {
    this._price = value;
    this._itemPriceEl.value = value;
    this.onValuesUpdated(false);
  }

  /**
   * @param {number} value
   */
  set quantity(value) {
    this._quantity = value;
    this._itemQuantityEl.value = value;
    this.onValuesUpdated(false);
  }

  get sum() {
    return this._price * this._quantity;
  }

  _itemSumEl = null;
  _itemPriceEl = null;
  _itemQuantityEl = null;

  connectedCallback() {
    const template = document.getElementById('skup-item-template');
    this.appendChild(template.content.cloneNode(true));
    this._itemPriceEl = this.querySelector('input[item-price]');
    this._itemQuantityEl = this.querySelector('input[item-quantity]');
    this._itemSumEl = this.querySelector('[item-sum]');

    this._itemPriceEl.addEventListener('input', (event) => this.onInputPrice(event.target.value));
    this._itemQuantityEl.addEventListener('input', (event) => this.onInputQuantity(event.target.value));
  }

  onInputPrice(value) {
    this._price = Number(value);
    this.onValuesUpdated();
  }

  onInputQuantity(value) {
    this._quantity = Number(value);
    this.onValuesUpdated();
  }

  onValuesUpdated(dispatchEvent = true) {
    if (this._itemSumEl) {
      this._itemSumEl.textContent = this._price * this._quantity;
    }

    if (!dispatchEvent) {
      return;
    }

    this.dispatchEvent(new CustomEvent('item-changed', {
      bubbles: true,
      composed: true,
      detail: {
        price: this._price,
        quantity: this._quantity
      }
    }));
  }
}

customElements.define('skup-item', SkupItem, { extends: 'tr' });

