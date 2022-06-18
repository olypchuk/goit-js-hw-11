import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const loadMoreBtn=document.querySelector(".load-more")
const gallery = document.querySelector(".gallery")
const instance = new SimpleLightbox('.gallery div a', { captionDelay: 250, captionsData: "alt" })
const buttonDelay = () => {
  setTimeout(() => {
    loadMoreBtn.classList.remove('is-hide'), 0
  })
}
export function conditions(data) {

  if (data.totalHits === 0) {
    loadMoreBtn.classList.add('is-hide')
   Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
    
    return
    }
 if (gallery.children.length===0) {
   Notify.success(`Hooray! We found ${data.totalHits} images.`) 
   gallery.innerHTML = ""
   loadMoreBtn.classList.add('is-hide')
    buttonDelay()
  }

  if (data.hits.length === 0) {
    Notify.failure("We're sorry, but you've reached the end of search results.")
    return
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

}



// export function markupGallery(photos) {
//   if (photos.totalHits === 0) {
//    Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
//     //  loadMoreBtn.classList.add('is-hide')
//     return
   
//     }
//  if (gallery.children.length===0) {
//    Notify.success(`Hooray! We found ${photos.totalHits} images.`) 
//    gallery.innerHTML=""
//   }
//   console.log(photos.totalHits);
//   if (photos.hits.length === 0) {
//     Notify.failure("We're sorry, but you've reached the end of search results.")
//     return
//   }
  
//     const markup = photos.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })=> `<div class="photo-card"><a href="${largeImageURL}">
//     <img class="photo-list" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
//     <div class="info">
//     <p class="info-item">
//     <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//     <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//     <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//     <b>Downloads ${downloads}</b>
//     </p>
//     </div>
//     </div>`).join("")
   

//     gallery.insertAdjacentHTML("beforeend", markup)
//     instance.refresh().close()

// }