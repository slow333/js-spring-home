import { nav } from '../nav.js';
let contentState = {content: "about", active: false };

const aside = new XMLHttpRequest();
aside.open('GET', "/page/1-js/js-aside.html", true);
aside.responseType = 'text';
aside.send();
aside.onload = function load() {
   nav.innerHTML += aside.responseText;
   let subs = document.querySelectorAll('.sub');
   subs.forEach(sub => {
      sub.querySelectorAll('.content').forEach(content => {
         content.classList.toggle('active');
      })
   });
}
