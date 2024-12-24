const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

const xhr = new XMLHttpRequest();
let asideUrl;
xhr.open('GET',"/page/nav.html", true);
xhr.responseType = 'text';
xhr.setRequestHeader('Accept', 'text/plain');
xhr.send();
xhr.onload = () => {
   nav.innerHTML = xhr.responseText;
   nav.querySelector('.navbar').querySelectorAll('a')
   .forEach(nav => {
      nav.addEventListener('click', function (event) {
         event.preventDefault();
         let target = event.target;
         console.log(target);
         // if(target.tagName !== 'A') return;
         asideUrl = target.closest('li').dataset.asideUrl;
         localStorage.setItem('asideUrl', asideUrl);
      })
   });
};
xhr.onerror = () => new Error(xhr.responseText);

export {nav, asideUrl };
// let navText;
// loadNav(navUrl, function (htmlText) {
//    nav.innerHTML = htmlText;

// });
// let getAsideUrl =localStorage.getItem('asideUrl');
// // setTimeout(function () { return getAsideUrl; }, 3000);
// loadNav(getAsideUrl, function (htmlText) {
//    nav.innerHTML += htmlText;
//    // let url = document.querySelector('aside');
//    // url.onclick = function (event) {
//    //    if(event.target.tagName !== 'A') return;
//    //    // loadNav(asideUrl, function (htmlText) {
//    //    //    nav.innerHTML += htmlText;
//    //    // });
//    // }
// });
//       // setNavToAside(navText, asideUrl);
//
// function setNavToAside(navText, asideUrl) {
//    switch(navText) {
//       case "JavaScript":
//          asideUrl = "/page/1-js/js-aside.html";
//          // loadNav("/page/1-js/js-aside.html", function (htmlText) {
//          //    nav.innerHTML += htmlText;
//          // });
//          break;
//       case "HTML":
//          asideUrl = "/page/2-html-doc/doc-aside.html";
//          break;
//       case "JAVA":
//          asideUrl = "/page/3-java/java-aside.html";
//          break;
//       case "info":
//          asideUrl = "/page/4-info/info-aside.html";
//          break;
//       default:
//          asideUrl = "";
//    }
// }
// //
// // loadNav(navUrl, function(navText) {
// //    nav.innerHTML = navText;
// //    let menus = document.querySelectorAll('.nav');
// //    menus.forEach(function(item) {
// //       let asideLocation = item.firstElementChild.href+"";
// //          if(asideLocation.includes(checkLocation)) {
// //             item.style.backgroundColor = "black";
// //          }
// //    });
// //    nav.onclick = function(event) {
// //       event.preventDefault();
// //       let target = event.target;
// //       let url = target.textContent;
// //       console.log(url);
// //       setNavToAside(url);
// //    }
// // });
// loadNav(footerUrl, function(footerText) {
//    footer.outerHTML = footerText;
// });
//
// let checkLocation = location.href.includes("/index.html")
//    ? "index" :  location.href.split('/').slice(4,5)+"";