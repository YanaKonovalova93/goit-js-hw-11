import { divCountryEl } from './refs';
import { listCountryEl } from './refs';

export function createMarkupCard({
  name,
  capital,
  population,
  languages,
  flags,
}) {
  const languagesEl = Object.values(languages).join(', ');
  const markup = `
  <div class="country-card">
  <div class="div-country">
<img class="icon" src="${flags.svg}" alt="flag" width="40px" height="30px" />  
    <p class="country-name"><b>${name.official}</b></p>
</div>
    <p class="country-capital"><b>Capital: </b>${capital}</p>
    <p class="country-population"><b>Population: </b>${population}</p>
    <p class="country-languages"><b>Languages: </b>${languagesEl}</p>
    
  </div>`;

  return markup;
}

export function createMarkupList({ name, flags }) {
  let markup = '';
  markup += `<li class="country-li"><img class="icon" src="${flags.svg}" alt="flag" width="40px" height="30px" /><p class="country-name"><b>${name.official}</b></p></li>`;

  return markup;
}

export function updateCountriesCard(markup) {
  divCountryEl.innerHTML = markup;
}

export function updateCountriesList(markup) {
  listCountryEl.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkupList() {
  listCountryEl.innerHTML = ' ';
}

export function clearMarkupCard() {
  divCountryEl.innerHTML = ' ';
}
