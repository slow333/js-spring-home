function loadScript(src, callback) {
   let script = document.createElement("script");
   script.src = src;
   script.onload = () => callback(script);
   document.head.append(script);
}
loadScript('/js/menu/loadNav.js', function (page) {
   // console.log(page);
});