const products = Array.from(document.querySelectorAll('.product'));
const cartProductsElement = document.querySelector('.cart__products');

const updateProductQuantity = (quantityElement, delta) => {
  const currentQuantity = Number(quantityElement.textContent);
  const nextQuantity = Math.max(1, currentQuantity + delta);

  quantityElement.textContent = nextQuantity;
};

const addProductToCart = (productElement) => {
  const productId = productElement.dataset.id;
  const productImageElement = productElement.querySelector('.product__image');
  const quantityElement = productElement.querySelector('.product__quantity-value');
  const quantityToAdd = Number(quantityElement.textContent);

  const existingCartProduct = cartProductsElement.querySelector(`.cart__product[data-id="${productId}"]`);

  if (existingCartProduct) {
    const countElement = existingCartProduct.querySelector('.cart__product-count');
    countElement.textContent = Number(countElement.textContent) + quantityToAdd;
    return;
  }

  const cartProductMarkup = `
    <div class="cart__product" data-id="${productId}">
      <img class="cart__product-image" src="${productImageElement.src}" alt="Товар" />
      <div class="cart__product-count">${quantityToAdd}</div>
    </div>
  `;

  cartProductsElement.insertAdjacentHTML('beforeend', cartProductMarkup);
};

products.forEach((productElement) => {
  const quantityElement = productElement.querySelector('.product__quantity-value');
  const decreaseButton = productElement.querySelector('.product__quantity-control_dec');
  const increaseButton = productElement.querySelector('.product__quantity-control_inc');
  const addButton = productElement.querySelector('.product__add');

  decreaseButton.addEventListener('click', () => {
    updateProductQuantity(quantityElement, -1);
  });

  increaseButton.addEventListener('click', () => {
    updateProductQuantity(quantityElement, 1);
  });

  addButton.addEventListener('click', () => {
    addProductToCart(productElement);
  });
});
