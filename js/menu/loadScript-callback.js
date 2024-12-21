function loadScript(src) {
   return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(script);
      document.head.append(script);

   })
}
loadScript('/js/menu/loadNav.js').then(resolve => function (resolve) {
   console.log(resolve);
});