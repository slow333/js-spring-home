import {nav, asideUrl} from './nav.js';

const aside = new XMLHttpRequest();
aside.open('GET', asideUrl, true);
aside.responseType = 'text';
aside.send();
aside.onload = function load() {
   nav.innerHTML += aside.responseText;
   // document.querySelector('.navbar')
   // let selectedAside = document.querySelector('#sub-nav');
   // let toggleSubNav = document.querySelectorAll('#sub-nav .content-toggle');
   // let links = selectedAside.querySelectorAll('a');
   //
   // document.querySelectorAll('.content-toggle').forEach(el => {
   //    el.hidden = localStorage.getItem('id') !== el.id;
   // });
   // links.forEach((item) => currentLink(item));
   //
   // selectedAside.onclick = function (event) {
   //    let target = event.target;
   //    if (target.tagName !== 'LI') return;
   //    // if(!target.classList.contains('sub-content')) return;
   //    toggleSubNav.forEach(toggle => toggle.hidden = true);
   //    let contentToggle = target.querySelector('ul');
   //    contentToggle.hidden = !contentToggle.hidden;
   // }
   // links.forEach(link => {
   //    link.onclick = (event) => setTimeout(() => {
   //       let id = event.target.closest('.content-toggle').id;
   //       localStorage.setItem('id', id);
   //    });
   // })
}

function currentLink(item) {
   if(item.href === location.href) {
      item.style.color = 'white';
      item.style.background = 'orangered';
   }
}