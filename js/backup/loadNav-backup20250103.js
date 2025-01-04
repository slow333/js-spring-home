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
   setStyleByCurrentUrl(aside, nav);
   showToggleByCurrUrl(aside);
   aside.onclick = toggleAsideSub;
}
loadMenu().catch(error => new Error(error.message));

// xhr을 통해 받은 responseText를 가지고 nav element 생성
async function setNavEl(text){
   let nav = document.createElement('nav');
   nav.setAttribute('class', 'navbar');
   nav.setAttribute('id', 'navbar');
   nav.innerHTML = text;
   document.body.prepend(nav);
   return nav
}
// nav에 설정된 href를 활용해서 현재의 location 기반 aside file 선택
async function selectAsideUrl () {
   if (location.href === 'http://127.0.0.1:8080/'
       || location.href === "http://127.0.0.1:8080/index.html") {
      document.title = "HOME";
      return null;
   }
   let asideName = location.href.split('/')[4];
   document.title = asideName;
   return `/page/components/${asideName}-aside.html`;
}
// aside file을 활용한 loadXML에서 받은 responseText를 활용 aside 생성
async function setAside(asideText) {
   if(asideText){
      let aside = document.createElement('div');
      aside.innerHTML = asideText;
      document.querySelector('nav').after(aside);
      return aside;
   }
}
// 현재 location.href를 활용 현재 선택된 sub menu style 변경
// 현재 aside의 id에 따라 nav menu style 변경
function setStyleByCurrentUrl(aside, nav) {
   aside.querySelectorAll('a').forEach(function (a) {
      if (location.href.includes(a.href)) {
         a.style.color = 'white';
         a.style.background = 'orangered';
      }
   });
   let id = document.querySelector('aside').id;
   nav.querySelector(`.${id}`).style.background = 'black';
}
// 1. 현재 location.href를 활용해서 a.href를 검색
// 2. 해당 a 객체가 포함된 ul 객체에 대해 보이게 하기
function showToggleByCurrUrl(aside) {
   let findHref = location.href.split('/')[5];
   let selectedLink = aside.querySelector('a[href*='+`"${findHref}"`+']');
   selectedLink.closest('ul').hidden = false;
}
// aside 제목(li) 선택 시 하위 리스트(ul) show toggle
function toggleAsideSub(e) {
   if (e.target.tagName !== 'H2') return;
   let contentToggle = e.target.closest('.sub-content').querySelector('.content-toggle');
   contentToggle.hidden = !contentToggle.hidden;
}