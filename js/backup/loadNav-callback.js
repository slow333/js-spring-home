function loadNav(src, callback) {
   let xhr = new XMLHttpRequest();
   xhr.open('GET', src, true);
   xhr.responseType = 'text';
   xhr.setRequestHeader('Accept', 'text/plain');
   xhr.send();
   xhr.onload = () => callback(xhr.responseText);
}
loadNav('/page/components/nav.html', text => {
   let nav = document.createElement('nav');
   nav.setAttribute('class', 'navbar');
   nav.setAttribute('id', 'navbar');
   nav.innerHTML = text;
   document.body.prepend(nav);
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
   if(location.href === 'http://127.0.0.1:8080/index.html') {
      loadNav('/page/components/home-aside.html', text => {
         aside.innerHTML = text;
         document.body.prepend(aside);
      });
   }
   if(location.href.includes('http://127.0.0.1:8080/page/js')) {
      loadNav('/page/components/js-aside.html', text => {
         aside.innerHTML = text;
         document.body.prepend(aside);
      });
   }
   if(location.href.includes('http://127.0.0.1:8080/page/dom')) {
      loadNav('/page/components/dom-aside.html', text => {
         aside.innerHTML = text;
         document.body.prepend(aside);
      });
   }
   if(location.href.includes('http://127.0.0.1:8080/page/java')) {
      loadNav('/page/components/java-aside.html', text => {
         aside.innerHTML = text;
         document.body.prepend(aside);
      });
   }
   console.log(location.href);
});