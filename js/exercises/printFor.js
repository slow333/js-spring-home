function printText(str){
   let s ='';
   for (let i=0; i < str.length; i++){
      s += str[i];
   }
   console.log(s.split('/')[5]);
}
// printText("http://127.0.0.1:8080/page/html/02-event/01-browser-event.html")