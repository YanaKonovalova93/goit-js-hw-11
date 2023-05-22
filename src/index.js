import axios from 'axios';
import Notiflix from 'notiflix';


import ImagesService from './ImagesService';
import { formEl } from './refs';
import { createMarkupCard } from './markup';
import { updateGallery } from './markup';
import { clearGallery } from './markup';

import './css/styles.css';


const imagesService = new ImagesService();

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const form = e.currentTarget;
  imagesService.searchQuery = form.elements.searchQuery.value.trim();

   if (imagesService.searchQuery === '') {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
   }
  imagesService.resetPage();
  clearGallery();
  getImages();

}

function getImages() {
  imagesService.getImages().then(({ hits }) => {

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
})

}

