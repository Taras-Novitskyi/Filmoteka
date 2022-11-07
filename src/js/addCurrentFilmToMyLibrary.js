import Notiflix from 'notiflix';
import { renderMarkUp } from './markups/collectionRender';

const libraryButton = document.querySelector('.header__mylibrary');
const container = document.querySelector('.container-films');

let dataWatched = [];

export function onClickAddToWached(data, evt) {
  const watchedMovieInLS = JSON.parse(localStorage.getItem('watched'));

  if (evt.target.name !== 'watched') {
    return;
  }

  if (dataWatched.some(el => el.id === data.id)) {
    Notiflix.Notify.info(`Тhis movie has already been added to the watched.`, {
      timeout: 2000,
    });
    return;
  }

  if (watchedMovieInLS !== null) {
    const checkingListWatchedArr = watchedMovieInLS.some(
      el => el.id === data.id
    );

    if (checkingListWatchedArr) {
      Notiflix.Notify.info(
        `Тhis movie has already been added to the watched list.`,
        {
          timeout: 2000,
        }
      );
      return;
    } else {
      watchedMovieInLS.push(data);
      localStorage.setItem('watched', JSON.stringify(watchedMovieInLS));
      Notiflix.Notify.success(`Add movie to watched list.`, {
        timeout: 2000,
      });
    }
    return;
  }

  dataWatched.push(data);
  localStorage.setItem('watched', JSON.stringify(dataWatched));

  Notiflix.Notify.success(`Add movie to watched list.`);
}

function onWatchedClick(e) {
  const watchedMovieInLS = JSON.parse(localStorage.getItem('watched'));
  if (e.target.name == 'watched-btn') {
    if (watchedMovieInLS === '') {
      Notiflix.Notify.failure(`My library is emty`);
      return;
    }

    const markupWatched = renderMarkUp(
      JSON.parse(localStorage.getItem('watched'))
    );
    container.innerHTML = '';
    container.innerHTML = markupWatched;
  }
}

libraryButton.addEventListener('click', onWatchedClick);
