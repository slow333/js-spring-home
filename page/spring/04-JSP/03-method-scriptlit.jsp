<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JSP</title>
  <link rel="icon" href="/favicon-32x32.png" />
  <link href="/css/style.css" rel="stylesheet" >
  <script src="/js/menu/loadScript.js"></script>
</head>
<body>
<main>
<h1>선언문, 스크립트 릿, 표현식</h1>
<section>
  <h2>선언문</h2>
    <% //스크립트릿
  String str2= "== 지역번수 입니다. ==";
  %>
  <h3>스크립트 릿에서 선언한 str2 <%= str2 %> </br>
  전역변수에서 선언한 str은 위치에 상관없음. <%= str %> <%= getStr() %>
  </h3>
  <%! //선언문-전역변수 선언
  String str = "== 전역변수 선언 ==";
  %>
  <%! //선언문-메소드 선언
  String getStr() {
   return str; 
  }
  %>

</section>
</main>
</body>
</html>