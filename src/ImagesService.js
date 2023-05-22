import { buttonLoadMore } from './refs';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36528050-c337b07b2d3bf2b7045a27ee1';

export default class ImagesService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  getImages() {
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        // if (data.status === 'error') throw new Error('The end');
        this.incrementPage();
        console.log(data.hits);
        return data.hits;
      });
  }
  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
}

// export let page = 1;

// export function getImages(name) {

//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   ).then(response => {
//     return response.json();
//   });
// }

// function incrementPage() {
//     page += 1;
// }

// export function resetPage() {
//   page = 1;
// }

// export { fetchCountries };

//  fetchArticles() {
//     const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

//     return fetch(url, options)
//       .then(response => response.json())
//       .then(({ articles }) => {
//         this.incrementPage();
//         return articles;
//       });
//   }

// buttonLoadMore.addEventListener('click', onLoadMore);

// function onLoadMore(e) {
//     console.log();
// }
