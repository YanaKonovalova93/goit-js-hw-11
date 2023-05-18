// import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

import { inputEl } from './refs';

import { createMarkupList } from './markup';
import { createMarkupCard } from './markup';
import { updateCountriesCard } from './markup';
import { updateCountriesList } from './markup';
import { clearMarkupList } from './markup';
import { clearMarkupCard } from './markup';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener(
  'input',
  debounce(onSearchCountryName, DEBOUNCE_DELAY)
);

function onSearchCountryName(e) {
  let nameCountry = e.target.value.trim();

  if (nameCountry === '') {
    clearMarkupList();
    return clearMarkupCard();
  }

  clearMarkupCard();
  clearMarkupList();
  searchCountries(nameCountry);
}

function searchCountries(nameCountry) {
  fetchCountries(nameCountry)
    .then(countries => {
      for (let i = 0; i < countries.length; i += 1) {
        if (countries.length === 1) {
          let markup = createMarkupCard(countries[i]);
          updateCountriesCard(markup);
        }
        if (countries.length >= 2 && countries.length <= 10) {
          let markup = createMarkupList(countries[i]);
          updateCountriesList(markup);
        }
        if (countries.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
