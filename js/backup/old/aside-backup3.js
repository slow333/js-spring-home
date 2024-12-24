import {nav} from '../nav.js';

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
      let selectedAside = document.querySelector('.aside')
      let links = selectedAside.querySelectorAll('a');
      document.querySelectorAll('.content-toggle').forEach(el => {
         el.hidden = localStorage.getItem('id') !== el.id;
      });
      let aTag = document.querySelectorAll('.aside a');
      aTag.forEach((item) => currentLink(item));

      selectedAside.onclick = event => toggleMenu (event);
      links.forEach(link => {
         link.onclick = (event) => setLocalStorageId(event);
      })
   }
}

asideInfo(asideUrl);

function setLocalStorageId(event) {
   let id = event.target.closest('.content-toggle').id;
   localStorage.setItem('id', id);
}

function toggleMenu(event) {
   let id = event.target.dataset.toggleId;
   let elem = document.getElementById(id);

   if (!id) return;
   elem.hidden = !elem.hidden;
}
function currentLink(item) {
   if(item.href === location.href) {
      item.style.color = 'white';
      item.style.background = 'orangered';
   }
}