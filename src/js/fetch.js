const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27996406-97aa9c49a494d96b999a7c23c';
import * as axios from 'axios';

export function fetchImg(inputValue,page) {
 const searchParams = new URLSearchParams({
    key: API_KEY,
    q:inputValue,
    image_type: "photo",
    orientation: "horizontal",
   safesearch: "true",
    page: page,
    per_page:40
 }) 

   const url = `${BASE_URL}?${searchParams}`
   
   return fetch(url)
      .then(res => res.json())
  
}

