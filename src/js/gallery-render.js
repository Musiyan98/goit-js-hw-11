import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const gallery = document.querySelector('.gallery');
function renderGallery(images) {
  const markup = images.map(renderElement).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
}

function renderElement(image) {
  const {
    id,
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;
  return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b></br>${likes}</p>
              <p class="info-item"><b>Views</b></br>${views}</p>
              <p class="info-item"><b>Comments</b></br>${comments}</p>
              <p class="info-item"><b>Downloads</b></br>${downloads}</p>
            </div>
          </div>
        </a>
      `;
}

export { renderGallery };
