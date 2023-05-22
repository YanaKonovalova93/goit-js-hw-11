import axios from 'axios';

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
    ).then(response => {
      return response.json();
    }).then(data => {
      this.incrementPage();
      return data;
    });
  
  }
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
