import { nav } from '../nav.js';

let url = new URL(import.meta.url);
let search = url.search;
const searchParams = new URLSearchParams(search);
let asideUrl = searchParams.get('name');

function asideInfo(url) {
   const aside = new XMLHttpRequest();
   aside.open('GET', url, true);
   aside.responseType = 'text';
   aside.send();
   aside.onload = function load() {
      nav.innerHTML += aside.responseText;
      let contents = document.querySelectorAll('.content')
      contents.forEach(item => {
         item.hidden = true
         if(item.href === location.href) {
            item.style.color = 'white';
            item.style.background = 'orangered';
         }
      });
      let selected = document.querySelector('.aside')
      selected.addEventListener('click', function (event) {
         let target = event.target;
         if(!target.classList.contains('sub')) return;
         toggleContent(target);
      });
   }
}
function toggleContent(target) {
   target.querySelectorAll('.content').forEach(content => {
      (content.hidden) ? content.hidden = false: content.hidden = true;
   });
}
asideInfo(asideUrl);