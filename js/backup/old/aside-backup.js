import { nav } from '../nav.js';

let url = new URL(import.meta.url);
//console.log(url);
let search = url.search; 
const searchParams = new URLSearchParams(search);
let asideUrl = searchParams.get('name');
//console.log(parmVal);

function asideInfo(url) {
   const aside = new XMLHttpRequest();
   aside.open('GET', url, true);
   aside.responseType = 'text';
   aside.send();
   aside.onload = function load() {
      nav.innerHTML += aside.responseText;
      let aTag = document.querySelectorAll('.aside a');
      aTag.forEach((item) => {
         if(item.href === location.href) {
            item.style.color = 'white';
            item.style.background = 'orangered';
         }
      });
   }
}

asideInfo(asideUrl);