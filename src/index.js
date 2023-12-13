import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './js/create-markup';
import { getPhotos } from './js/api';
import { spinnerPlay, spinnerStop } from './js/spinner';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btnSubmit: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.js-gallery'),
  loadMore: document.querySelector('.js-load-more'),
};

let page = 1;
let q = '';
let per_page = 40;

const lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let callback = (entries, observer) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      page += 1;

      spinnerPlay();

      try {
        const data = await getPhotos(q, page, per_page);
        const markup = createMarkup(data.hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        lightboxGallery.refresh();

        hasMorePhotos(data.totalHits);
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        spinnerStop();
      }
    }
  });
};

let observer = new IntersectionObserver(callback, options);

const handleSubmit = async event => {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value;

  if (!query) {
    Notify.warning('No-no! You need to enter text.');
    return;
  }

  page = 1;
  q = query;

  refs.gallery.innerHTML = '';

  spinnerPlay();

  try {
    const data = await getPhotos(q, page, per_page);

    if (data.totalHits === 0) {
      throw Notify.failure(
        `Sorry, there are no images matching your search ${query}. Please try again.`
      );
    }
    Notify.success(`Hooray! We found images`);

    const markup = createMarkup(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightboxGallery.refresh();

    hasMorePhotos(data.totalHits);
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
};

refs.form.addEventListener('submit', handleSubmit);

function hasMorePhotos(totalHits) {
  if (page < Math.ceil(totalHits / per_page)) {
    const item = document.querySelector('.js-card-link:last-child');
    observer.observe(item);
  } else {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
