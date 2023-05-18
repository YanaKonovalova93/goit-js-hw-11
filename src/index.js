// import axios from 'axios';
import Notiflix from 'notiflix';

import { formEl } from './refs';
import { getImages } from './api';
import { createMarkupCard } from './markup';
import { updateGallery } from './markup';
import { clearGallery } from './markup';
import {resetPage} from './api'

import './css/styles.css';

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const { searchQuery } = e.target.elements;

  const inputValue = searchQuery.value.trim();
    getImages(inputValue).then(({ hits }) => {
        clearGallery();
    if (hits.length === 0) {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      for (const image of hits) {
        let markup = createMarkupCard(image);
        updateGallery(markup);
      }
    }
  });
}
