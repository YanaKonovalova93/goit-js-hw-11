import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const key = 'key=36528050-c337b07b2d3bf2b7045a27ee1';

export class ImagesService {
  page = 1;
  per_page = 40;
  query = '';
  totalHits = 0;
  totalPages = 0;

  async getImages() {
    const url = `?${key}&q=${this.query}&${params}&page=${this.page}&per_page=${this.per_page}`;
    const { data } = await axios.get(url);
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page = 1;
  }

  calculateTotalpages() {
    this.totalPages = Math.ceil(this.totalHits / this.per_page);
  }
}
