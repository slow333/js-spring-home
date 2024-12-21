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

loadXML('/page/components/nav.html')
   .then(function (text) {
      let nav = document.createElement('nav');
      nav.setAttribute('class', 'navbar');
      nav.setAttribute('id', 'navbar');
      nav.innerHTML = text;
      document.body.prepend(nav);
      return new Promise((resolve, reject) => {
         resolve(nav);
      })
   })
   .then(function (nav) {
      nav.onclick = (event) => getAside(event);

      if (location.href === 'http://127.0.0.1:8080/index.html') {
         loadAside('/page/components/home-aside.html')
      }
      if (location.href.includes('http://127.0.0.1:8080/page/js')) {
         loadAside('/page/components/js-aside.html')
      }
      if (location.href.includes('http://127.0.0.1:8080/page/dom')) {
         loadAside('/page/components/dom-aside.html')
      }
      if (location.href.includes('http://127.0.0.1:8080/page/java')) {
         loadAside('/page/components/java-aside.html')
      }
   })

function getAside(event) {
   let url;
   let textContent = event.target.textContent;
   if (textContent === 'HOME') url = "/index.html"; else if (textContent === 'JavaScript') url = "/page/js/01-intro/01-start.html"; else if (textContent === 'HTML') url = "/page/dom/01-basic/01-start.html"; else if (textContent === 'JAVA') url = "/page/java/01-basic/01-start.html";
   window.location = url;
}

function loadAside(url) {
   loadXML(url)
      .then(text => setAside(text))
      .then(function (aside) {
         aside.onclick = (event) => toggleHide(event);
         return setCurrentUrl(aside)
      })
}

function setAside(text) {
   let aside = document.createElement('aside');
   aside.setAttribute('id', 'aside');
   aside.innerHTML = text;
   document.querySelector('nav').after(aside);
   return new Promise((resolve, reject) => {
      resolve(aside);
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