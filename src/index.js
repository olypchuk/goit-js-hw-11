import * as axios from 'axios';
import *as fetch from './js/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { conditions } from './js/markupGallery';


const loadMoreBtn=document.querySelector(".load-more")
const searchForm = document.querySelector("#search-form");
const gallery=document.querySelector(".gallery")


let page;
let searchQuery;


searchForm.addEventListener("submit", search);
loadMoreBtn.addEventListener("click", onLoadMoreBtn)


 function search(e) {
   e.preventDefault();
  loadMoreBtn.classList.add('is-hide')
  page = 1
  searchQuery = e.currentTarget.elements.searchQuery.value.trim()
  gallery.innerHTML = ''

  if (searchQuery === '') {
    Notify.warning("Sorry, there are no images matching your search query. Please try again.")
  return
  }
   fetching()
   e.currentTarget.reset()
}
 
function fetching() {
  return fetch.fetchImg(searchQuery,page)
    .then(res => conditions(res))
    .catch(error => console.log(error))
  
}
function onLoadMoreBtn(e) {
  page += 1;
  e.preventDefault();
  fetching()

}
