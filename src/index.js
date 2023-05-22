// import axios from 'axios';
import Notiflix from 'notiflix';


import ImagesService from './ImagesService';
import LoadMoreBtn from './LoadMoreBtn';
import { formEl } from './refs';
import { createMarkupCard } from './markup';
import { updateGallery } from './markup';
import { clearGallery } from './markup';

import './css/styles.css';

const imagesService = new ImagesService();
const buttonLoadMore = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
 
  const { searchQuery } = e.target.elements;
  const form = e.currentTarget;
  const inputValue = searchQuery.value.trim();
  if (inputValue === '') alert('No value!');
  else {
    imagesService.searchQuery = inputValue;
    imagesService.resetPage();

    buttonLoadMore.show();
    clearGallery();
    fetchArticles().finally(() => form.reset());
  }
  // const { searchQuery } = e.target.elements;
  // console.log(searchQuery);

  // const inputValue = searchQuery.value.trim();

  //   getImages(inputValue).then(({ hits }) => {
  //       clearGallery();
  //   if (hits.length === 0) {
  //     return Notiflix.Notify.info(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //   } else {
  //     for (const image of hits) {
  //       let markup = createMarkupCard(image);
  //       updateGallery(markup);
  //     }
  //   }
  // });
}

buttonLoadMore.button.addEventListener('click', onLoadMore);
function onLoadMore(e) {
  buttonLoadMore.disable();
  return getArticlesMarkup().then(() => buttonLoadMore.enable());
}

function fetchArticles() {
  buttonLoadMore.disable();

  return getArticlesMarkup().then(() => buttonLoadMore.enable());
}

function getArticlesMarkup() {
  return imagesService
    .getImages()
    .then(images => {
      if (!images) {
        buttonLoadMore.hide();
        return '';
      }
      if (images.length === 0) throw new Error('No data');

      return images.reduce(
        (markup, images) => markup + createMarkupCard(images),
        ''
      );
    })
    .then(updateGallery)
    .catch(onError);
}

function onError(err) {
  console.error(err);
  buttonLoadMore.hide();
  galleryEl.innerHTML = '<p>Not found!</p>';
}