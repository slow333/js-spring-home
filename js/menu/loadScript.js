function loadScript(callback) {
   let script = document.createElement("script");
   script.src = '/js/menu/loadNav.js';
   script.onload = () => callback(script);
   document.head.append(script);
}
loadScript(function (page) {
   // console.log(page);
});