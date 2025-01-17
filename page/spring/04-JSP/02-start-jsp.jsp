<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page info="copyright by &copy;KalpaSystems" %>
<%@ page import="java.sql.Timestamp" %>
<%@ page import="java.text.*" %>
<%@ page import="java.util.*" %>

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
<h1>JSP 기본 사항</h1>
<h3>JSP는 HTML에서 java를 사용할수 있게히줌</h3>
  <section>
    <h2>JSP 입문</h2>
    <hr/>
    <h3>page directive - info 속성</h3>
    <h4><%= getServletInfo() %></h4> <!-- 상단의 infor 정보를 보여줌 -->
    <h3>page directive - contentType 속성 </h3>
    <h4><%= "한글 출력확인." %></h4>
    <h3>page directive - import 속성</h3>
    <h4><%
    Timestamp now = new Timestamp(System.currentTimeMillis());
    Date today = new Date();
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String strDate = format.format(now);
    %>
    오늘은 <%= strDate %> </br>
    <%= today.toString() %>
    </h4>
    <h3>include 디렉티브(파일을 불러와서 붙여넣어줌.)
    <%
    String name="용가리 입니다.";
    %>
    <%@ include file="top.jsp" %>
    <%@ include file="bottom.jsp" %>    
    </h3>
  </section>
  
</main>
</body>
</html>