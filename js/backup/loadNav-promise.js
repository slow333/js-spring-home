function loadNav(src) {
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

loadNav('/page/components/nav.html')
   .then(function (text) {
      let nav = document.createElement('nav');
      nav.setAttribute('class', 'navbar');
      nav.setAttribute('id', 'navbar');
      nav.innerHTML = text;
      document.body.prepend(nav);
      return new Promise((resolve, reject) => {
         resolve(nav);
      })
   }).then(function (nav) {
      nav.onclick = function (e) {
         switch (e.target.textContent) {
            case 'HOME':
               window.location = "/index.html";
               break;
            case 'JavaScript':
               window.location = "../../page/js/01-intro/01-start.html";
               break;
            case 'HTML':
               window.location = "../../page/dom/01-basic/01-start.html";
               break;
            case 'JAVA':
               window.location = "../../page/java/01-basic/01-start.html";
               break;
         }
      }
      let aside = document.createElement('aside');
      aside.setAttribute('id', 'aside');
      if (location.href === 'http://127.0.0.1:8080/index.html') {
         loadNav('/page/components/home-aside.html')
            .then(text => {
               aside.innerHTML = text;
               document.body.prepend(aside);
            });
      }
      if (location.href.includes('http://127.0.0.1:8080/page/js')) {
         loadNav('/page/components/js-aside.html')
            .then(text => handleAside(text, aside));
      }
      if (location.href.includes('http://127.0.0.1:8080/page/dom')) {
         loadNav('/page/components/dom-aside.html')
            .then(text => handleAside(text, aside));
      }
      if (location.href.includes('http://127.0.0.1:8080/page/java')) {
         loadNav('/page/components/java-aside.html')
            .then(text => handleAside(text, aside));
      }
      return new Promise((resolve, reject) => {
         resolve(aside);
      })
   })
function handleAside(html, aside){
   aside.innerHTML = html;
   document.body.prepend(aside);
   aside.onclick = (event) =>  toggleHide(event)

   aside.querySelectorAll('a').forEach(function (a) {
      setCurrentUrl(a);
      // document.querySelectorAll('aside ul li ul')
      //    .forEach(toggle => toggle.hidden = true);
      // console.log(location.href.split('/')[5]);
      // console.log(a.href.split('/')[5]);
      // if(a.href.split('/')[5] === location.href.split('/')[5]){
      //    a.closest('ul').hidden = false;
      // }
   });
}
function setCurrentUrl(element) {
   if(location.href.includes(element.href)) {
      element.style.color = 'white';
      element.style.background = 'orangered';
   }
}
function toggleHide (e) {
   if (e.target.tagName !== 'LI') return;
   document.querySelectorAll('aside ul li ul')
      .forEach(toggle => toggle.hidden = true);
   let contentToggle = e.target.querySelector('ul');
   contentToggle.hidden = !contentToggle.hidden;
}
function clickUrl(e) {
   // e.preventDefault();
   if (e.target.tagName !== 'A') return;
   let urls = document.querySelectorAll('aside a');
   console.log(urls);
      urls.forEach(toggle => {
         toggle.closest('ul').hidden = true
      });
   let contentToggle = e.target.closest('ul');
   console.log(contentToggle);
   contentToggle.hidden = false;
}