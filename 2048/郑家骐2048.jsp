﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>郑家骐2048</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link href="zjq2048.css" rel="stylesheet" type="text/css">
	<script  type="text/javascript" src="./jquery.js" charset="UTF-8"></script>
	<script language="javascript" src="./zjq2048.js" charset="UTF-8"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body onselectstart="return false;" id="bo">
	<div id="container"  >
		<div id="header">
			<div class="square3" id="example"></div>
			<div class="square2" id="score"></div>
			<div class="square2" id="maxscore"></div>
			<div class="square3" id="start"></div>
		</div>
		<div id="main">
			<div class="square1 s1" id="b1" ><div class="square1" id="k1"></div></div>
			<div class="square1 s1" id="b2" ><div class="square1" id="k2"></div></div>
			<div class="square1 s1" id="b3" ><div class="square1" id="k3"></div></div>
			<div class="square1 s1" id="b4" ><div class="square1" id="k4"></div></div>
			<div class="square1 s1" id="b5" ><div class="square1" id="k5"></div></div>
			<div class="square1 s1" id="b6" ><div class="square1" id="k6"></div></div>
			<div class="square1 s1" id="b7" ><div class="square1" id="k7"></div></div>
			<div class="square1 s1" id="b8" ><div class="square1" id="k8"></div></div>
			<div class="square1 s1" id="b9" ><div class="square1" id="k9"></div></div>
			<div class="square1 s1" id="b10" ><div class="square1" id="k10"></div></div>
			<div class="square1 s1" id="b11" ><div class="square1" id="k11"></div></div>
			<div class="square1 s1" id="b12" ><div class="square1" id="k12"></div></div>
			<div class="square1 s1" id="b13" ><div class="square1" id="k13"></div></div>
			<div class="square1 s1" id="b14" ><div class="square1" id="k14"></div></div>
			<div class="square1 s1" id="b15" ><div class="square1" id="k15"></div></div>
			<div class="square1 s1" id="b16" ><div class="square1" id="k16"></div></div>
			
		</div>
		<div draggable="true" id="footer"></div>
		<div id="mask">
			
		</div>
		<div id="mask2">
			<div id="gameover">game over! </div>
			<div id="finalscore">分数<br/>14214 </div>
			<div>
				<div id="ok">确定</div>
				<div id="restart">重新开始</div>
			</div>
		</div>
	</div>
	<audio id="bgs"src="" autoplay=true>
	<audio id="bgs2"src="" autoplay=true>
</body>
</html>
