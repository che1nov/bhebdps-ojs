const loaderElement = document.getElementById('loader');
const itemsElement = document.getElementById('items');

const renderCurrencies = (valuteMap) => {
  const currencyCodes = Object.keys(valuteMap);

  const currenciesMarkup = currencyCodes.map((currencyCode) => {
    const currency = valuteMap[currencyCode];

    return `
      <div class="item">
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      </div>
    `;
  }).join('');

  itemsElement.innerHTML = currenciesMarkup;
};

const hideLoader = () => {
  loaderElement.classList.remove('loader_active');
};

const request = new XMLHttpRequest();
request.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

request.addEventListener('load', () => {
  if (request.status >= 200 && request.status < 300) {
    const responseData = JSON.parse(request.responseText);
    renderCurrencies(responseData.response.Valute);
  }

  hideLoader();
});

request.addEventListener('error', hideLoader);
request.send();
