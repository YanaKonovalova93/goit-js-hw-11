import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './refs';
import { ImagesService } from './ImagesService';
import { createMarkup } from './markup';
import { addMarkup } from './markup';
import { clearPage } from './markup';
import { onScroll } from './onScroll';

import './css/styles.css';

const imagesService = new ImagesService();

const onSubmitForm = async e => {
  e.preventDefault();

  clearPage();
  const {
    elements: { searchQuery },
  } = e.currentTarget;

  const searchValue = searchQuery.value.trim();

  if (!searchValue) {
    Notiflix.Notify.failure('Enter a request, please!');
    return;
  }

  imagesService.query = searchValue;

  try {
    const data = await imagesService.getImages();

    imagesService.totalHits = data.totalHits;

    imagesService.calculateTotalpages();

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images..`);
    }
    refs.form.reset();

    const markup = createMarkup(data);
    addMarkup(markup);
    const target = document.querySelector('.photo-card:last-child');
    observer.observe(target);
    if (imagesService.page === imagesService.totalPages) {
      observer.unobserve(target);
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message, 'Oops...something wrong');
    clearPage();
  }
};

refs.form.addEventListener('submit', onSubmitForm);

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1,
};

const callback = async function (entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting && entry.intersectionRect.bottom > 550) {
      imagesService.incrementPage();
      observer.unobserve(entry.target);
      try {
        await loadMore();
      } catch (error) {
        Notiflix.Notify.failure(error.message, 'Oops...something wrong');
        clearPage();
      }
    }
  });
};

const observer = new IntersectionObserver(callback, options);

export async function loadMore() {
  const data = await imagesService.getImages();
  const markup = createMarkup(data);
  addMarkup(markup);
  onScroll();
  const target = document.querySelector('.photo-card:last-child');
  observer.observe(target);

  if (imagesService.page === imagesService.totalPages) {
    observer.unobserve(target);
    Notiflix.Notify.success(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

export let lightbox = new SimpleLightbox('.photo-card a');
