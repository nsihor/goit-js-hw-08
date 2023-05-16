// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const gallery = galleryItems
  .map(
    (item) =>
      `<li class="gallery__item" style='list-style: none'>
        <a class="gallery__link" href=${item.original}>
            <img class="gallery__image" src=${item.preview} alt=${item.description} title=${item.description} />
        </a>
    </li>`).join("");

const galleryContainer = document.querySelector(".gallery");
galleryContainer.innerHTML = gallery;

const imgModal = new SimpleLightbox('.gallery a', {captionDelay: 250, captionsData: 'title'});