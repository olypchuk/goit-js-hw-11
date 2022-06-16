import * as axios from 'axios';
import { fetchImg } from './js/fetch';
import { markupGallery } from './js/markupGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loadMoreBtn=document.querySelector(".load-more")
const searchForm = document.querySelector("#search-form");
const gallery=document.querySelector(".gallery")
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27996406-97aa9c49a494d96b999a7c23c';
const input = searchForm.searchQuery;



  if (gallery.children.length === 0) {
    searchForm.addEventListener("submit", fetchGallery);
  }
 
  loadMoreBtn.addEventListener("click", fetchGallery)


function fetchGallery(e) {
  e.preventDefault();
  // console.log(e.target.elements.searchQuery.value);
  if (input.value === '') {
    Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    return
  }

  fetchImg()
    .then(res => markupGallery(res))
    .catch(error => console.log(error))
   searchForm.removeEventListener("submit", fetchGallery)
}

// function markupGallery(photos) {
//   console.log(photos.totalHits);
//    Notify.success(`Hooray! We found ${photos.totalHits} images.`) 
//     const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = photos;

//     const markup = photos.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })=> `<div class="photo-card">
//     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//     <p class="info-item">
//     <b>Likes :${likes}</b>
//     </p>
//     <p class="info-item">
//     <b>Views :${views}</b>
//     </p>
//     <p class="info-item">
//     <b>Comments :${comments}</b>
//     </p>
//     <p class="info-item">
//     <b>Downloads :${downloads}</b>
//     </p>
//     </div>
//     </div>`).join("")
  
  
//  gallery.innerHTML=markup
// }