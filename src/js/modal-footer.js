// import image from '../images/footer';

import * as image from '../images/footer/no-foto.jpg';
import * as image3 from '../images/footer/img_6550.jpg';
import * as image4 from '../images/footer/me-foto-1.jpg';
import * as image5 from '../images/footer/Taras-Novitskyi.jpg';
import * as sprite from '../images/sprite.svg';

(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      backdrop: document.querySelector(".modal-footer"),
      modal: document.querySelector("[data-modal]"),
    };

    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    refs.backdrop.addEventListener(`click`, onBackdropClick);

    function toggleModal(event){
      event.preventDefault();
      refs.modal.classList.toggle("is-hidden");

    }
    function onCloseModal(){
      refs.modal.classList.add(`is-hidden`);
    }
    function onBackdropClick(event){
      if(event.currentTarget === event.target){
        onCloseModal();
      }
    }
  })();
  //////// cart////////

  const cart = [
    {img: `${image}`, h3: `Scrum Master Yurii Perekrestnyi`, a:`https://github.com/Jodlei`, href: `https://uk.linkedin.com/`},
    {img: `${image}`, h3: `Team Lead Vladyslav Yachyn`, a:`https://github.com/Reqvite`, href: `https://uk.linkedin.com/`},
    {img: `${image3}`, h3: `Alexander Kulyk`, a:`https://github.com/alexander-kulyk`, href: `https://uk.linkedin.com/`},
    {img: `${image4}`, h3: `Viunyk Daria`, a:`https://github.com/Darya-Viunyk`, href: `https://www.linkedin.com/in/darya-viunyk-50b386181/`},
    {img: `${image5}`, h3: `Taras Novitskyi`, a:`https://github.com/Taras-Novitskyi`, href: `https://uk.linkedin.com/`},
    {img: `${image}`, h3: `Evgeniy`, a:`https://github.com/eugeniusz57`, href: `https://uk.linkedin.com/`},
  ];
  // DFilmoteka\src\images\sprite.svg:\archive\Goit\js\
  const paletteCarts = document.querySelector(`.js-palette`);
  const createCarts = createCart(cart);
  paletteCarts.insertAdjacentHTML(`beforebegin`, createCarts);
  function createCart(cart){
    return cart.map(({img, h3, a, href}) =>{
      return `
      <li class="team-footer__card">
      <img
        class="team-footer__foto"
        src="${img}"
        alt="foto"
      />
      <div class="about-footer">
        <h3 class="footer-text__big">${h3}</h3>
        <p lang="en" class="footer-text__smol">Frontend Developer</p>
        <ul class="networks-footer list">
          <li class="networks-footer__list">
            <a href="${a}" class="networks-footer__link">
              <svg class="networks-footer__icon" width="20" height="20">
                <use href="${sprite}#icon-git-icon"></use>
              </svg>
            </a>
          </li>
          <li class="networks-footer__list">
            <a href="${href}" class="networks-footer__link">
              <svg class="networks-footer__icon" width="20" height="20">
                <use href="${sprite}#icon-link-icon"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </li>`;
    })
    .join("");
  }