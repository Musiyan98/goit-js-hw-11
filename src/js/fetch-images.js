import axios from 'axios';

const KEY = '30265959-d9883bf0204e3a3ac8cde4b49';
const URL = 'https://pixabay.com/api';

async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `${URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImages };
