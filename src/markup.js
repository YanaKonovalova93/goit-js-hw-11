import { galleryEl } from './refs';

export function createMarkupCard({
  webformatURL,
  largeImageUR,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const markup = `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350px" />
  <div class="info">
    <p class="info-item">
      <b>Likes<br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views<br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br>${downloads}</b>
    </p>
  </div>
</div>`;

  return markup;
}

export function updateGallery(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  galleryEl.innerHTML = ' ';
}
