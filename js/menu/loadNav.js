async function loadMenu(){
   await loadHeadLinks();
   let responseNav = await fetch('/page/components/nav.html');
   let navText = await responseNav.text();
   let nav = await setNavEl(navText);

   await loadFooter("/page/components/footer.html");

   let asideUrl = await selectAsideUrl();
   document.querySelector('.navBtn').onclick =  () =>
      document.querySelector('#footer').scrollIntoView(false, {behavior: 'smooth'});
   document.querySelector('.footerBtn').onclick = () => window.scrollTo(0,0);
   let responseAside;
   if(asideUrl){
     responseAside = await fetch(asideUrl);
   }
   let asideText = await responseAside.text();
   let aside = await setAside(asideText);
   document.querySelectorAll('aside ul li ul')
      .forEach(toggle => toggle.hidden = true);
   setStyleByCurrentUrl(aside, nav);
   showToggleByCurrUrl(aside);
   aside.onclick = toggleAsideSub;
   hamburger.onclick = function(){
      let aside = document.querySelector('.aside');
      aside.classList.toggle('is-active');
   };
}
loadMenu().catch(error => new Error(error.message));

async function loadHeadLinks(){
   let links = await fetch('/page/components/links.html');
   let linksText = await links.text();
   document.head.insertAdjacentHTML("afterbegin",linksText);
   // <link rel="icon" href="/favicon-32x32.png" />
   let favicon = document.createElement('link');
   favicon.rel="icon";
   document.head.append(favicon);
   let icon = await fetch("/images/home.png");
   let img = await icon.blob();
   favicon.href = URL.createObjectURL(img);
   return linksText;
}

// responseText를 가지고 nav element 생성
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
   let asideName = location.href.split('/')[4] || "HOME";
   if(asideName.length > 0 && asideName !== "HOME"){
      document.title = asideName;
      return `/page/components/${asideName}-aside.html`;
   } else {
      document.title = "HOME";
      return null;
   }
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
         a.classList.add('currentUrl');
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
   let contentToggle = e.target.nextElementSibling;
   contentToggle.hidden = !contentToggle.hidden;
}
async function loadFooter(src) {
   let responseFooter = await fetch(src);
   let footerText = await responseFooter.text();

   let footer = document.createElement('footer');
   footer.setAttribute('class', 'footer');
   footer.setAttribute('id', 'footer');
   footer.innerHTML = footerText;
   document.body.append(footer);
   return footer
}