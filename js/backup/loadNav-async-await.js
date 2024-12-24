function loadXML(src) {
   return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.responseType = 'text';
      xhr.setRequestHeader('Accept', 'text/plain');
      xhr.send();
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.responseText);
   });
}

async function loadMenu(){
   let navText = await loadXML('/page/components/nav.html');
   let nav = await setNavEl(navText);
   let asideUrl = await selectAside(nav);
   let asideText = await loadXML(asideUrl);
   let newAside = await setAside(asideText);
   newAside.onclick = toggleHide;
   setCurrentUrl(newAside);
}
let promise = loadMenu();
promise.then(result => console.log(result));

async function setNavEl(text){
   let nav = document.createElement('nav');
   nav.setAttribute('class', 'navbar');
   nav.setAttribute('id', 'navbar');
   nav.innerHTML = text;
   document.body.prepend(nav);
   return nav
}
async function selectAside (nav) {
   nav.onclick = (event) => {
      let url;
      let textContent = event.target.textContent;
      if (textContent === 'HOME') url = "/index.html";
      else if (textContent === 'JavaScript') url = "/page/js/01-intro/01-start.html";
      else if (textContent === 'HTML') url = "/page/dom/01-basic/01-start.html";
      else if (textContent === 'JAVA') url = "/page/java/01-basic/01-start.html";
      window.location = url;
   };
   let asideUrl;
   if (location.href === 'http://127.0.0.1:8080/index.html')
      asideUrl = '/page/components/home-aside.html';
   if (location.href.includes('http://127.0.0.1:8080/page/js'))
      asideUrl ='/page/components/js-aside.html';
   if (location.href.includes('http://127.0.0.1:8080/page/dom'))
      asideUrl = '/page/components/dom-aside.html';
   if (location.href.includes('http://127.0.0.1:8080/page/java'))
      asideUrl = '/page/components/java-aside.html';
   return asideUrl;
}
async function setAside(text) {
   let aside = document.createElement('aside');
   aside.setAttribute('id', 'aside');
   aside.innerHTML = text;
   document.querySelector('nav').after(aside);
   return aside;
}
function toggleHide(e) {
   if (e.target.tagName !== 'LI') return;
   document.querySelectorAll('aside ul li ul')
      .forEach(toggle => toggle.hidden = true);
   let contentToggle = e.target.querySelector('ul');
   contentToggle.hidden = !contentToggle.hidden;
   return new Promise((resolve, reject) => {
      resolve(document.querySelector('aside'))
   })
}

function setCurrentUrl(aside) {
   aside.querySelectorAll('a').forEach(function (a) {
      if (location.href.includes(a.href)) {
         a.style.color = 'white';
         a.style.background = 'orangered';
      }
   });
   jsAsideToggleByUrl();
}

function jsAsideToggleByUrl() {
   document.querySelectorAll('aside ul li ul')
      .forEach(toggle => toggle.hidden = true);
   if (location.href.includes('03-object')) {
      document.querySelector('#js-object').hidden = false;
   } else if (location.href.includes('02-basic')) {
      document.querySelector('#js-basic').hidden = false;
   } else if (location.href.includes('01-intro')) {
      document.querySelector('#js-intro').hidden = false;
   }
}

