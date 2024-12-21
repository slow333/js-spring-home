const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

let navUrl = "/page/nav.html";
let footerUrl = "/page/footer.html";
let asideUrl;
function loadNav(url, callback) {
   const xhr = new XMLHttpRequest();

   xhr.open('GET', url, true);
   xhr.responseType = 'text';
   xhr.setRequestHeader('Accept', 'text/plain');
   xhr.send();
   xhr.onload = () => callback(xhr.response);
   xhr.onerror = () => new Error(xhr.responseText);
}
let checkLocation = location.href.includes("/index.html")
   ? "index" :  location.href.split('/').slice(4,5)+"";

loadNav(navUrl, function(navText) {
   nav.innerHTML = navText;
   let menus = document.querySelectorAll('.nav');
   menus.forEach(function(item) {
      let asideLocation = item.firstElementChild.href+"";
         if(asideLocation.includes(checkLocation)) {
            item.style.backgroundColor = "black";
         }
   });
   let navbar = document.querySelector('.navbar');
   navbar.onclick = function (e) {
      e.preventDefault();
      let target = e.target
      if(target.tagName !== 'A') return;
      let goAsideUrl = target.textContent;
      console.log(goAsideUrl);
      switch(goAsideUrl) {
         case 'JavaScript':
            asideInfo('/page/1-js/js-aside.html');
            break;
         case 'HTML':
            asideInfo('/page/2-html-doc/doc-aside.html');
            break;
         case 'JavaScript':
            asideInfo('/page/1-js/js-aside.html');
            break;
      }
   }

});

loadNav(footerUrl, function(footerText) {
   footer.outerHTML = footerText;
});

function asideInfo(url) {
   const aside = new XMLHttpRequest();
   aside.open('GET', url, true);
   aside.responseType = 'text';
   aside.send();
   aside.onload = function load() {
      nav.innerHTML += aside.responseText;
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

function currentLink(item) {
   if(item.href === location.href) {
      item.style.color = 'white';
      item.style.background = 'orangered';
   }
}