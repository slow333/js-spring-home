import { nav } from '../nav.js';

export function asideJs() {
   const aside = new XMLHttpRequest();
   aside.open('GET', "/page/1-js/js-aside.html", true);
   aside.responseType = 'text';
   aside.send();
   aside.onload = function load() {
      nav.innerHTML += aside.responseText;
      let aTag = document.querySelectorAll('.aside a');
      // console.log(location.href);
      aTag.forEach((item) => {
         if(item.href === location.href) {
            item.style.color = 'white';
            item.style.background = 'orangered';
         }
      });
   }
}
asideJs();
