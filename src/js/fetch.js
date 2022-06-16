const searchForm = document.querySelector("#search-form");
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27996406-97aa9c49a494d96b999a7c23c';
const input = searchForm.searchQuery;
let page = 1;
let per_page=30
export function fetchImg() {
 const searchParams = new URLSearchParams({
    key: API_KEY,
    q:input.value,
    image_type: "photo",
    orientation: "horizontal",
   safesearch: "true",
    page: page,
    per_page:per_page
 }) 


const url=`${BASE_URL}?${searchParams}`
        return fetch(url)
          .then(res => {
            page += 1
            per_page+=5
         return res.json()
        }
   )
  
}

