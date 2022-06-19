import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const loadMoreBtn=document.querySelector(".load-more")
const gallery = document.querySelector(".gallery")
const instance = new SimpleLightbox('.gallery div a', { captionDelay: 250, captionsData: "alt" })
const arrowUp = document.querySelector(".arrow")
arrowUp.addEventListener("click", function (e) {
  e.preventDefault();
  const blockId = arrowUp.getAttribute("href")
  document.querySelector(""+blockId)
  .scrollIntoView({
    behavior: "smooth",
    block:"start"
  })
})
const buttonDelay = () => {
  setTimeout(() => {
    loadMoreBtn.classList.remove('is-hide'), 0
  })
}

export function conditions(data) {

  if (data.totalHits === 0) {
   loadMoreBtn.classList.add('is-hide')
   arrowUp.classList.add("is-hide")
   Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
    
    return
    }
 if (gallery.children.length===0) {
   Notify.success(`Hooray! We found ${data.totalHits} images.`) 
   gallery.innerHTML = ""
  //  loadMoreBtn.classList.add('is-hide')
   arrowUp.classList.remove("is-hide")
   // buttonDelay()
   loadMoreBtn.classList.remove('is-hide')
  }
console.log(data.hits.length);
  if (data.hits.length<40) {
    Notify.failure("We're sorry, but you've reached the end of search results.")
    loadMoreBtn.classList.add('is-hide')
    // return
  }
  markupGallery(data)
}

function markupGallery(photos) {

    const markup = photos.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })=> `<div class="photo-card"><a href="${largeImageURL}">
    <img class="photo-list" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
    <p class="info-item">
    <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
    <b>Views ${views}</b>
    </p>
    <p class="info-item">
    <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads ${downloads}</b>
    </p>
    </div>
    </div>`).join("")
   
    gallery.insertAdjacentHTML("beforeend", markup)
    instance.refresh().close()
scroll()
}
function scroll() {
  
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}