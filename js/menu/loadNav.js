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
   let asideUrl = await selectAsideUrl(nav);
   let asideText = await loadXML(asideUrl);
   let aside = await setAside(asideText);
   setCurrentUrl(aside, asideUrl, nav);
   aside.addEventListener('click', toggleHide);
}
let promise = loadMenu();
promise.then(result => result);

async function setNavEl(text){
   let nav = document.createElement('nav');
   nav.setAttribute('class', 'navbar');
   nav.setAttribute('id', 'navbar');
   nav.innerHTML = text;
   document.body.prepend(nav);
   return nav
}

async function selectAsideUrl (nav) {
   let asideUrl;
   if (location.href === 'http://127.0.0.1:8080/index.html')
      asideUrl = null;
   if (location.href.includes('http://127.0.0.1:8080/page/js'))
      asideUrl ='/page/components/js-aside.html';
   if (location.href.includes('http://127.0.0.1:8080/page/dom'))
      asideUrl = '/page/components/dom-aside.html';
   if (location.href.includes('http://127.0.0.1:8080/page/java'))
      asideUrl = '/page/components/java-aside.html';
   return asideUrl;
}

async function setAside(asideUrl) {
   if(asideUrl){
      let aside = document.createElement('aside');
      aside.setAttribute('id', 'aside');
      aside.innerHTML = asideUrl;
      document.querySelector('nav').after(aside);
      return aside;
   }
}

function setCurrentUrl(aside, asideUrl, nav) {
   aside.querySelectorAll('a').forEach(function (a) {
      if (location.href.includes(a.href)) {
         a.style.color = 'white';
         a.style.background = 'orangered';
      }
   });
   toggleByUrl(aside);
   if(asideUrl === '/page/components/js-aside.html') {
      nav.querySelector('.javascript').style.background = 'black';
   } else if(asideUrl === '/page/components/dom-aside.html') {
      nav.querySelector('.html').style.background = 'black';
   } else if(asideUrl === '/page/components/java-aside.html') {
      nav.querySelector('.java').style.background = 'black';
   } else{
      nav.querySelector('.home').style.background = 'black';
   }
}

function toggleByUrl(aside) {
   document.querySelectorAll('aside ul li ul')
      .forEach(toggle => toggle.hidden = true);
   let position = location.href.split('/')[5];
   let selectedLink = aside.querySelector('[href*='+`"${position}"`+']');
   selectedLink.closest('ul').hidden = false;
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