import './sass/index.scss';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/gallery-render';
import { scroll } from './js/scroll';

const formEl = document.querySelector('.search-form');
const inputSearchEl = document.querySelector('.input');
const loadBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let name = '';

let pageNumber = 1;

formEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  pageNumber = 1;
  loadBtn.classList.add('is-hidden');
  name = inputSearchEl.value.trim();
  gallery.innerHTML = '';

  await fetchImages(name, pageNumber)
    .then(data => {
      // console.log(data);
      if (!name) {
        Notiflix.Notify.failure('There is nothing to search');
        return;
      }
      if (data.hits.length === 0) {
        mistaceFunction();
        return;
      }
      renderGallery(data.hits);
      countFounding(data.totalHits);
      scroll();
      if (data.hits.length >= 40) {
        loadBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error));
}

loadBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  pageNumber += 1;
  fetchImages(name, pageNumber)
    .then(data => {
      // console.log(data);
      renderGallery(data.hits);
      countFounding(data.totalHits);
      scroll();
      if (data.hits.length < 40) {
        loadBtn.classList.add('is-hidden');
        alertEndOfSearch();
      }
    })
    .catch(error => {
      console.log(error);
      loadBtn.classList.add('is-hidden');
      alertEndOfSearch();
    });
}
function mistaceFunction() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please, try again.'
  );
}

function countFounding(pages) {
  Notiflix.Notify.success(`Hooray! We found ${pages} images.`);
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
