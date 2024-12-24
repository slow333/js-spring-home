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

      let navbar = document.querySelector('.navbar');
      navbar.onclick = function (e) {
         e.preventDefault();
         let target = e.target
         if(target.tagName !== 'A') return;
         console.log(target.textContent);
      }

      let selectedAside = document.querySelector('#sub-nav');
      let toggleSubNav = document.querySelectorAll('#sub-nav .content-toggle');
      let links = selectedAside.querySelectorAll('a');

      document.querySelectorAll('.content-toggle').forEach(el => {
         el.hidden = localStorage.getItem('id') !== el.id;
      });
      links.forEach((item) => currentLink(item));

      selectedAside.onclick = function(event) {
         let target = event.target;
         if(target.tagName !== 'LI') return;
         // if(!target.classList.contains('sub-content')) return;
         toggleSubNav.forEach(toggle => toggle.hidden = true);
         let contentToggle = target.querySelector('ul');
         contentToggle.hidden = !contentToggle.hidden;
      }
      links.forEach(link => {
         link.onclick = (event) => setTimeout(() => {
            let id = event.target.closest('.content-toggle').id;
            localStorage.setItem('id', id);
         });
      })
   }
}

asideInfo(asideUrl);

function currentLink(item) {
   if(item.href === location.href) {
      item.style.color = 'white';
      item.style.background = 'orangered';
   }
}