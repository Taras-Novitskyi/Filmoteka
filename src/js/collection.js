import { fetchGenreId } from "./collectionFetch";
import { fetchPopularMovies } from "./collectionFetch";
import { renderMarkUp } from "./collectionRender";
import updateMarkupPagination from './pagination';
import { renderPagination } from "./collectionRender";
import { refs } from './refs/refs';


let page = 1;
const collection = document.querySelector(`.container-films`);
const pagination = document.querySelector(`.pagination`);


  let genreCollection = {};
  fetchGenreId()
  .then(genreId => {
    genreId.data.genres.forEach(function (genre) {
      genreCollection[genre.id] = genre.name
    })
  }).catch(error => console.log(error));


function fetchMovies(page) {
  fetchPopularMovies(page).then(response => {
  const render = renderMarkUp(response.data.results, genreCollection);
  // const renderedPagination = renderPagination(Number(response.data.page), Number(response.data.total_pages))
    collection.innerHTML = render;
    // pagination.innerHTML = renderedPagination;

    updateMarkupPagination(
      response.data.total_pages,
      page,
      fetchMoviesOnPagination
    );
})
}

function fetchMoviesOnPagination(page) {
  document.querySelector('.header').scrollIntoView();
  fetchPopularMovies(page).then(response => {
    const render = renderMarkUp(response.data.results, genreCollection);
    collection.innerHTML = render;
  });
}

// pagination by VladLysenko
// pagination.addEventListener("click", (e) => {
//   e.preventDefault()
//   fetchMovies(e.target.dataset.page)
// })
fetchMovies(page)

