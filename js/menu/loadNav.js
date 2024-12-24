function loadXML(src) {
   return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      if(src){
         xhr.open('GET', src, true);
         xhr.responseType = 'text';
         xhr.setRequestHeader('Accept', 'text/plain');
         xhr.send();
         xhr.onload = () => resolve(xhr.responseText);
         xhr.onerror = () => reject(xhr.responseText);
      }
   });
}

async function loadMenu(){
   let navText = await loadXML('/page/components/nav.html');
   let nav = await setNavEl(navText);
   let asideUrl = await selectAsideUrl();
   let asideText = await loadXML(asideUrl);
   let aside = await setAside(asideText);
   document.querySelectorAll('aside ul li ul')
      .forEach(toggle => toggle.hidden = true);
   setCurrentUrl(aside, nav);
   toggleByUrl(aside);
   aside.addEventListener('click', toggleHide);
}
loadMenu().catch(error => new Error(error.message));

async function setNavEl(text){
   let nav = document.createElement('nav');
   nav.setAttribute('class', 'navbar');
   nav.setAttribute('id', 'navbar');
   nav.innerHTML = text;
   document.body.prepend(nav);
   return nav
}

async function selectAsideUrl () {
   if (location.href === 'http://127.0.0.1:8080/index.html')
      return null;
   let asideName = location.href.split('/')[4];
   return `/page/components/${asideName}-aside.html`;
}

async function setAside(asideText) {
   if(asideText){
      let aside = document.createElement('div');
      aside.innerHTML = asideText;
      document.querySelector('nav').after(aside);
      return aside;
   }
}

function setCurrentUrl(aside, nav) {
   aside.querySelectorAll('a').forEach(function (a) {
      if (location.href.includes(a.href)) {
         a.style.color = 'white';
         a.style.background = 'orangered';
      }
   });
   let id = document.querySelector('aside').id;
   nav.querySelector(`.${id}`).style.background = 'black';
}

function toggleByUrl(aside) {
   let findHref = location.href.split('/')[5];
   let selectedLink = aside.querySelector('a[href*='+`"${findHref}"`+']');
   selectedLink.closest('ul').hidden = false;
}

function toggleHide(e) {
   if (e.target.tagName !== 'LI') return;
   let contentToggle = e.target.querySelector('ul');
   contentToggle.hidden = !contentToggle.hidden;
}