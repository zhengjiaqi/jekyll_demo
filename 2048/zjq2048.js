//<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8"%>
window.onload=mov;
var test = 0;
var X=0;
var Y=0;
var x1=0;
var y1=0;
var xc=0;
var yc=0;
var x2=0;
var y2=0;

var b=true;
var s=false;
var full=false;
var score=0;
var maxScore=0;
var moveableLeft=false;
var moveableRight=false;
var moveableUp=false;
var moveableDown=false;
var aa=new Array(); 
function Square(state,value,top,left){
	this.state = state;
	this.value = value;
	this.top = top;
	this.left = left;
}
function mov(){ 
	var a=document.getElementById('footer');
	a.addEventListener('drag',dra,false);
	a.addEventListener('touchstart',dra,false);
	a.addEventListener('dragend',draed,false);
	window.addEventListener('keydown',dra,false);
	window.onkeyup=function(){s=true};
	document.getElementById('start').addEventListener('click',init,false);
	document.getElementById('start').onmousedown=function(){mousdown("start")};
	document.getElementById('bo').onmouseup=function(){mousup("start")};
	//document.getElementById('start').addEventListener('mouseup',mousup(start),false);
	document.getElementById("example").innerHTML="2048";
	document.getElementById("maxscore").innerHTML="最好成绩<br/>0";
	document.getElementById("start").innerHTML="开始";
	document.getElementById("score").innerHTML="分数<br/>0";
	document.getElementById('ok').addEventListener('click',closemask,false);
	document.getElementById('ok').onmousedown=function(){mousdown("ok")};
	document.getElementById('ok').onmouseup=function(){mousup("ok")};
	document.getElementById('restart').addEventListener('click',init,false);
	document.getElementById('restart').onmousedown=function(){mousdown("restart")};
	document.getElementById('restart').onmouseup=function(){mousup("restart")};
	document.getElementById('example').addEventListener('click',show2048,false);
	window.addEventListener('touchmove',function(e){e.preventDefault()},false);
	
	$("#score").click(function(){
	  $.texiao2("k3",8);
	});
	
	var du = document.getElementById("footer");
	du.ontouchstart = function(e){
		e.preventDefault;
	
	}
	du.ontouchmove = function(e){
		e.preventDefault;
		dra(e);
	}
	du.ontouchend=function (e){
		e.preventDefault;
		//alert("en");
		test=0;
		b=true;
		s=true;
		//document.getElementById("score").innerHTML="down: (" + X + "," + Y + ","+ test +")";
	}
	//init();
}
$.extend({
	texiao1:function(idname,figer){
		//alert(idname+","+figer);
		var node=document.getElementById(idname);
		var fs=0;
		if(figer==0){
			node.innerHTML="";
			node.style.backgroundColor="#BEB4AA";
			
		}
		if(figer==2){
			node.style.backgroundColor="#E6DCD2";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#000000";
			
		}else if(figer==4){
			node.style.backgroundColor="#BD9266";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#000000";
			
		}else if(figer==8){
			node.style.backgroundColor="#FFC78E";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==16){
			node.style.backgroundColor="#FF8000";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==32){
			node.style.backgroundColor="#FFAD86";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==64){
			node.style.backgroundColor="#FFFF00";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==128){
			node.style.backgroundColor="#CC3300";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			fs=40;
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==256){
			node.style.backgroundColor="#FFFF80";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			fs=40;
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==512){
			node.style.backgroundColor="#804040";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			fs=40;
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==1024){
			node.style.backgroundColor="#FF0080";
			node.innerHTML=figer;
			node.style.fontSize="30pt";
			fs=30;
			node.style.lineHeight="250%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==2048){
			node.style.backgroundColor="#FF0000";
			node.innerHTML=figer;
			node.style.fontSize="30pt";
			fs=30;
			node.style.lineHeight="250%"; 
			node.style.color="#FFFFFF";
			
		}

		$("#"+idname).css({ 
	  	"height": "0px", 
	  	"width": "0px", 
	  	"left": "50px", 
	  	"top": "50px", 
	  	"fontSize": "0pt", 
	  	}).animate({ 
	    width: "100px",
	    height: "100px", 
	    top: "0px", 
	    left: "0px",
	    "fontSize": fs+"pt",  
	    //fontSize: "10em", 
	    //borderWidth: 10
	  }, 300 );}
	});
$.extend({
	texiao2:function(idname,figer){
		//alert(idname+","+figer);
		var node=document.getElementById(idname);
		var fs=0;
		if(figer==0){
			node.innerHTML="";
			node.style.backgroundColor="#BEB4AA";
			
		}
		if(figer==2){
			node.style.backgroundColor="#E6DCD2";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#000000";
			
		}else if(figer==4){
			node.style.backgroundColor="#BD9266";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#000000";
			
		}else if(figer==8){
			node.style.backgroundColor="#FFC78E";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==16){
			node.style.backgroundColor="#FF8000";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==32){
			node.style.backgroundColor="#FFAD86";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==64){
			node.style.backgroundColor="#FFFF00";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			fs=50;
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==128){
			node.style.backgroundColor="#CC3300";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			fs=40;
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==256){
			node.style.backgroundColor="#FFFF80";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			fs=40;
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==512){
			node.style.backgroundColor="#804040";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			fs=40;
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==1024){
			node.style.backgroundColor="#FF0080";
			node.innerHTML=figer;
			node.style.fontSize="30pt";
			fs=30;
			node.style.lineHeight="250%"; 
			node.style.color="#FFFFFF";
			
		}else if(figer==2048){
			node.style.backgroundColor="#FF0000";
			node.innerHTML=figer;
			node.style.fontSize="30pt";
			fs=30;
			node.style.lineHeight="250%"; 
			node.style.color="#FFFFFF";
			
		}

		$("#"+idname).css({ 
	  	"height": "120px", 
	  	"width": "120px", 
	  	"left": "-10px", 
	  	"top": "-10px", 
	  	"fontSize": (fs+10)+"pt", 
	  	}).animate({ 
	    width: "100px",
	    height: "100px", 
	    top: "0px", 
	    left: "0px",
	    "fontSize": fs+"pt",  
	    
	  }, 300 );}
	});
function change(idname,figer){
	var div=document.getElementById(idname);
	if(div!=null){
		if(figer==0){
		div.innerHTML="&nbsp;";
		div.style.backgroundColor="#BEB4AA";
		}
		if(figer==2){
			div.style.backgroundColor="#E6DCD2";
			div.innerHTML=figer;
			div.style.fontSize="50pt";
			div.style.lineHeight="150%"; 
			div.style.color="#000000";
		}else if(figer==4){
			div.style.backgroundColor="#BD9266";
			div.innerHTML=figer;
			div.style.fontSize="50pt";
			div.style.lineHeight="150%"; 
			div.style.color="#000000";
		}else if(figer==8){
			div.style.backgroundColor="#FFC78E";
			div.innerHTML=figer;
			div.style.fontSize="50pt";
			div.style.lineHeight="150%"; 
			div.style.color="#FFFFFF";
		}else if(figer==16){
			div.style.backgroundColor="#FF8000";
			div.innerHTML=figer;
			div.style.fontSize="50pt";
			div.style.lineHeight="150%"; 
			div.style.color="#FFFFFF";
		}else if(figer==32){
			div.style.backgroundColor="#FFAD86";
			div.innerHTML=figer;
			div.style.fontSize="50pt";
			div.style.lineHeight="150%"; 
			div.style.color="#FFFFFF";
		}else if(figer==64){
			div.style.backgroundColor="#FFFF00";
			div.innerHTML=figer;
			div.style.fontSize="50pt";
			div.style.lineHeight="150%"; 
			div.style.color="#FFFFFF";
		}else if(figer==128){
			div.style.backgroundColor="#CC3300";
			div.innerHTML=figer;
			div.style.fontSize="40pt";
			div.style.lineHeight="180%"; 
			div.style.color="#FFFFFF";
		}else if(figer==256){
			div.style.backgroundColor="#FFFF80";
			div.innerHTML=figer;
			div.style.fontSize="40pt";
			div.style.lineHeight="180%"; 
			div.style.color="#FFFFFF";
		}else if(figer==512){
			div.style.backgroundColor="#804040";
			div.innerHTML=figer;
			div.style.fontSize="40pt";
			div.style.lineHeight="180%"; 
			div.style.color="#FFFFFF";
		}else if(figer==1024){
			div.style.backgroundColor="#FF0080";
			div.innerHTML=figer;
			div.style.fontSize="30pt";
			div.style.lineHeight="250%"; 
			div.style.color="#FFFFFF";
		}else if(figer==2048){
			div.style.backgroundColor="#FF0000";
			div.innerHTML=figer;
			div.style.fontSize="30pt";
			div.style.lineHeight="250%"; 
			div.style.color="#FFFFFF";
		}
	}
	
}

function is2048(){
	for(i=1;i<=16;i++){
		 if(aa[i].value==2048){
		 	showmask2();
		 	return;
		 }
	} 

}
$.extend({
	floor1:function(figer,end,start,leftstart,topstart,leftend,topend,name){
		var fs=0;
		var mydiv=document.createElement("div");
		document.getElementById("main").appendChild(mydiv); 
		mydiv.setAttribute("id",name);
		mydiv.innerHTML="0";
		console.log("移动end："+end+",start:"+start);
		mydiv.setAttribute("class","square1 s1 s3");
		change(name,figer);
		
		//change("k"+start,0);
		$("#"+name).css({ 
	  	"left": leftstart, 
	  	"top": topstart,  
	  	//"display": block, 
	  	});
	  	change("k"+start,0);
	  	$("#"+name).animate({ 
	    top: topend, 
	    left: leftend,
	  	}, 300,"",function (){
	  		
	  		$.load(end,aa[end].value);
	  		$("div").remove(".s3");
	  		if(moveableLeft||moveableRight||moveableUp||moveableDown){
					create();
			}
	  	}
	  	);
	  }
	});
$.extend({
	floor2:function(figer,end,start,leftstart,topstart,leftend,topend,name){
		var fs=0;
		var mydiv=document.createElement("div");
		document.getElementById("main").appendChild(mydiv); 
		mydiv.setAttribute("id",name);
		mydiv.innerHTML="0";
		console.log("合并end："+end+",start:"+start);
	
		mydiv.setAttribute("class","square1 s1 s3");
		change(name,figer);
		//change("k"+end,figer);
		change("k"+start,0);
		$("#"+name).css({ 
	  	"left": leftstart, 
	  	"top": topstart, 
	  	//"display": block, 
	  	});
		change("k"+start,0);
	  	$("#"+name).animate({ 
	    top: topend, 
	    left: leftend,
	  	}, 300,"",function (){
	  		//alert(figer);
	  		$.texiao2('k'+end,figer*2);
	  		$.load(end,aa[end].value);
	  		$("div").remove(".s3");
	  		if(moveableLeft||moveableRight||moveableUp||moveableDown){
					create();
			}
	  	}
	  	);
	  	
	  }
	});
function distory(){
	alert("ss");
	$("div").remove(".s3");
	

}

function is2048(){
	for(i=1;i<=16;i++){
		 if(aa[i].value==2048){
		 	showmask2();
		 	return;
		 }
	} 

}
function show2048(){
	//requestAnimationFrame(is2048);
	aa[5].value=2048;
 // alert(aa[5].value);
  $.texiao1("k2",2048);
  //is2048();
}
function playsound(){
	//alert(1);
	document.all.bgs.src="move.wav"; 
}
function mousdown(name){
	//this.name=name;
	document.getElementById(name).style.backgroundColor="#FFC080";
}
function mousup(name){
	//this.name=name;
	document.getElementById(name).style.backgroundColor="#FFF200";
}

function dra(ev){
	//alert(ev.keyCode);
	test++;
	var ev=ev||window.event;
	var touche=0;
	//alert(typeof(ev.changedTouches));
	if("undefined"!=typeof(ev.changedTouches)){
		touche=ev.changedTouches[0];
		X=touche.pageX;
		Y=touche.pageY;
		//document.getElementById("score").innerHTML=X+","+Y;
	}else if(ev.clientX!=""||ev.clientX!=undefined){
		X=ev.clientX;
		Y=ev.clientY;
	}
	
	

	
	if(test<2){
		x1=X;
		y1=Y;
	}
	
	var xc1=X-x1;
	var yc1=Y-y1;
	//document.getElementById("score").innerHTML=X+","+Y+";<br/>"+x1+","+y1+";<br/>"+xc1+","+yc1;
	if(((Math.abs(xc1)>50||Math.abs(yc1)>50)&&X!=0&&Y!=0&&b==true&&s==true)||(ev.keyCode&&s==true)){
		x2=X;
		y2=Y;
		xc=x2-x1;
		yc=y2-y1;
		if(Math.abs(xc)>Math.abs(yc)||ev.keyCode){
			if(xc>0||ev.keyCode==39){
				b=false;
				s=false;
				right(4);
				right(8);
				right(12);
				right(16);
				loadall();
				loadScore();
				
				
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}else if(xc<0||ev.keyCode==37){
				b=false;
				s=false;
				left(1);
				left(5);
				left(9);
				left(13);
				loadall();
				loadScore();
				
				
				
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}
		}
		if(Math.abs(xc)<Math.abs(yc)||ev.keyCode){
			if(yc>0||ev.keyCode==40){
				b=false;
				s=false;
				down(13);
				down(14);
				down(15);
				down(16);
				loadall();
				loadScore();
				
				
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}else if(yc<0||ev.keyCode==38){
				b=false;
				s=false;
				up(1);
				up(2);
				up(3);
				up(4);
				loadall();
				loadScore();
				
				
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}
		}
	}
	

}	
function draed(ev){
	test=0;
	b=true;
	s=true;
	//document.getElementById("score").innerHTML="down: (" + X + "," + Y + ","+ test +")";
	//document.getElementById("score").innerHTML="down: (" + X + "," + Y + ","+ test +")";
}
function init(){

	closemask();
	for(i=0;i<16;i++){
		 aa[i+1]=new Square(0,0,0,0);
	} 
	aa[1].top=20;
	aa[1].left=40;
	aa[2].top=20;
	aa[2].left=160;
	aa[3].top=20;
	aa[3].left=280;
	aa[4].top=20;
	aa[4].left=400;

	aa[5].top=140;
	aa[5].left=40;
	aa[6].top=140;
	aa[6].left=160;
	aa[7].top=140;
	aa[7].left=280;
	aa[8].top=140;
	aa[8].left=400;

	aa[9].top=260;
	aa[9].left=40;
	aa[10].top=260;
	aa[10].left=160;
	aa[11].top=260;
	aa[11].left=280;
	aa[12].top=260;
	aa[12].left=400;

	aa[13].top=380;
	aa[13].left=40;
	aa[14].top=380;
	aa[14].left=160;
	aa[15].top=380;
	aa[15].left=280;
	aa[16].top=380;
	aa[16].left=400;

	
	loadall();
	if(score>maxScore){
		maxScore=score;
	}
	document.getElementById("maxscore").innerHTML="最好成绩<br/>"+maxScore;
	score=0;
	loadScore();
	create();
	create();
	s=true;

}
function create(){

	var rand=Math.floor(Math.random()*16)+1;
	var figer=0;
	if(full==false){
		if(aa[rand].value==0){
		figer=createfigure();
		aa[rand].value=figer;
		document.all.bgs2.src="move.wav";
		//load(rand,figer);
			$.texiao1('k'+rand,figer);
		
		
	}else{
		//rand=Math.floor(Math.random()*16)+1;
		create();
		}
	}
	moveableLeft=false;
	moveableRight=false;
	moveableUp=false;
	moveableDown=false;
}
function createfigure(){
	var fi=Math.floor(Math.random()*10)+1;
	if(fi==5){
		return 4;
	}else{
		return 2;
	}
}

function left(i){
	
	 mergerLeft(i);
}
function right(i){
	
	mergerRight(i);
}

function down(i){
	
	mergerDown(i);
}
function up(i){
	
	mergerUp(i);

}

function mergerLeft(i){
	for(var n=i+1,k=0,p=3;n<=i+3;n++,k++,p--){
		var mergerable=true;
		for(var y=0;y<p;y++){
			//console.log("内循环值:"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
			if(aa[i+k].value==0){
				if(aa[n+y].value!=0){
					//console.log(0+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
					var fig=aa[n+y].value;
					aa[i+k].value=aa[n+y].value;
					aa[i+k].state=aa[n+y].state;
					aa[n+y].value=0;
					aa[n+y].state=0;
					moveableLeft=true;
					
					$.floor1(fig,(i+k),(n+y),aa[n+y].left,aa[n+y].top,aa[i+k].left,aa[i+k].top,"y"+i+"u"+n+"a");
					
				}

			}
			if(aa[i+k].value!=0&&aa[i+k].value==aa[n+y].value&&mergerable==true){
				if(aa[n+y-1]!=null&&aa[i+k+1]!=null){
					if(!(n+y-1!=i+k&&(aa[n+y-1].value!=0||aa[i+k+1].value!=0))){
					//console.log("非0"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
						var fig=aa[n+y].value;
						aa[i+k].value=aa[i+k].value*2;
						aa[i+k].state=1;
						score=score+aa[i+k].value;
						aa[n+y].value=0;
						aa[n+y].state=0;
						moveableLeft=true;
						mergerable=false;
						$.floor2(fig,(i+k),(n+y),aa[n+y].left,aa[n+y].top,aa[i+k].left,aa[i+k].top,"y"+i+"u"+n+"b");
						
					}
				}
				
				
			}
		}
	}
}
function mergerRight(i){
	for(var n=i-1,k=0,p=3;n>=i-3;n--,k++,p--){
		//alert("da");
		var mergerable=true;
		for(var y=0;y<p;y++){
			//console.log("内循环值:"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
			if(aa[i-k].value==0){
				if(aa[n-y].value!=0){
					//console.log(0+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
					var fig=aa[n-y].value;
					aa[i-k].value=aa[n-y].value;
					aa[i-k].state=aa[n-y].state;
					aa[n-y].value=0;
					aa[n-y].state=0;
					moveableRight=true;
					$.floor1(fig,(i-k),(n-y),aa[n-y].left,aa[n-y].top,aa[i-k].left,aa[i-k].top,"y"+i+"u"+n+"c");
				}

			}
			if(aa[i-k].value!=0&&aa[i-k].value==aa[n-y].value&&mergerable==true){
				if(aa[n-y+1]!=null&&aa[i-k-1]!=null){
					if(!(n-y!=i-k-1&&(aa[n-y+1].value!=0||aa[i-k-1].value!=0))){
						//console.log("非0"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
						var fig=aa[n-y].value;
						aa[i-k].value=aa[i-k].value*2;
						aa[i-k].state=1;
						score=score+aa[i-k].value;
						aa[n-y].value=0;
						aa[n-y].state=0;
						moveableRight=true;
						mergerable=false;
						$.floor2(fig,(i-k),(n-y),aa[n-y].left,aa[n-y].top,aa[i-k].left,aa[i-k].top,"y"+i+"u"+n+"d");
						
						
					}
				}
				
			}
		}
	}
}

function mergerUp(i){
	for(var n=i+4,k=0,p=12;n<=i+12;n=n+4,k=k+4,p=p-4){
		var mergerable=true;
		for(var y=0;y<p;y=y+4){
			//console.log("内循环值:"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
			if(aa[i+k].value==0){
				if(aa[n+y].value!=0){
					//console.log(0+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
					var fig=aa[n+y].value;
					aa[i+k].value=aa[n+y].value;
					aa[i+k].state=aa[n+y].state;
					aa[n+y].value=0;
					aa[n+y].state=0;
					moveableUp=true;
					
					$.floor1(fig,(i+k),(n+y),aa[n+y].left,aa[n+y].top,aa[i+k].left,aa[i+k].top,"y"+i+"u"+n+"e");
					
				}

			}
			if(aa[i+k].value!=0&&aa[i+k].value==aa[n+y].value&&mergerable==true){
				if(aa[n+y-4]!=null&&aa[i+k+4]!=null){
					if(!(n+y-4!=i+k&&(aa[n+y-4].value!=0||aa[i+k+4].value!=0))){
					//console.log("非0"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
						var fig=aa[n+y].value;
						aa[i+k].value=aa[i+k].value*2;
						aa[i+k].state=1;
						score=score+aa[i+k].value;
						aa[n+y].value=0;
						aa[n+y].state=0;
						moveableUp=true;
						mergerable=false;
						$.floor2(fig,(i+k),(n+y),aa[n+y].left,aa[n+y].top,aa[i+k].left,aa[i+k].top,"y"+i+"u"+n+"f");
						
					}
				}
				
				
			}
		}
	}
}

function mergerDown(i){
	for(var n=i-4,k=0,p=12;n>=i-12;n=n-4,k=k+4,p=p-4){
		//alert("da");
		var mergerable=true;
		for(var y=0;y<p;y=y+4){
			//console.log("内循环值:"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
			if(aa[i-k].value==0){
				if(aa[n-y].value!=0){
					//console.log(0+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
					var fig=aa[n-y].value;
					aa[i-k].value=aa[n-y].value;
					aa[i-k].state=aa[n-y].state;
					aa[n-y].value=0;
					aa[n-y].state=0;
					moveableDown=true;
					$.floor1(fig,(i-k),(n-y),aa[n-y].left,aa[n-y].top,aa[i-k].left,aa[i-k].top,"y"+i+"u"+n+"c");
				}

			}
			if(aa[i-k].value!=0&&aa[i-k].value==aa[n-y].value&&mergerable==true){
				if(aa[n-y+4]!=null&&aa[i-k-4]!=null){
					if(!(n-y!=i-k-4&&(aa[n-y+4].value!=0||aa[i-k-4].value!=0))){
						//console.log("非0"+":"+"i:"+i+",k:"+k+",n:"+n+",y:"+y+",p:"+p);
						var fig=aa[n-y].value;
						aa[i-k].value=aa[i-k].value*2;
						aa[i-k].state=1;
						score=score+aa[i-k].value;
						aa[n-y].value=0;
						aa[n-y].state=0;
						moveableDown=true;
						mergerable=false;
						$.floor2(fig,(i-k),(n-y),aa[n-y].left,aa[n-y].top,aa[i-k].left,aa[i-k].top,"y"+i+"u"+n+"d");
						
						
					}
				}
				
			}
		}
	}
}

function loadall(){
	for(var i=1;i<=16;i++){
		load2(i,aa[i].value);
		//$.load(i,aa[i].value);
	}
	is2048();
	isFull();
	//distory();
}
function isFull(){
	for(var i=1;i<=16;i++){
		if(aa[i].value==0){
			full=false;
			return;
		}
	}
	full=true;
	var over=isover();
	if(over){
		showmask();
	}
	//alert(true);
}

function showmask(){
	document.getElementById("finalscore").innerHTML="分数<br/>"+score;
	document.getElementById("gameover").innerHTML="game over!";
	document.getElementById("mask").style.display="block";
	document.getElementById("mask2").style.display="block";
	
}
function showmask2(){
	document.getElementById("finalscore").innerHTML="分数<br/>"+score;
	document.getElementById("gameover").innerHTML="你赢了!";
	document.getElementById("mask").style.display="block";
	document.getElementById("mask2").style.display="block";
	
}
function closemask(){
	document.getElementById("mask").style.display="none";
	document.getElementById("mask2").style.display="none";
}
function isover(){
	for(var i=1;i<=16;i++){
		if(i==1){
			if(aa[i].value==aa[i+1].value||aa[i].value==aa[i+4].value){
				return false;
			}
		}else if(i==4){
			if(aa[i].value==aa[i-1].value||aa[i].value==aa[i+4].value){
				return false;
			}
		}else if(i==13){
			if(aa[i].value==aa[i-4].value||aa[i].value==aa[i+1].value){
				return false;
			}
		}else if(i==16){
			if(aa[i].value==aa[i-1].value||aa[i].value==aa[i-4].value){
				return false;
			}
		}else if(i==2||i==3){
			if(aa[i].value==aa[i-1].value||aa[i].value==aa[i+1].value||aa[i].value==aa[i+4].value){
				return false;
			}
		}else if(i==5||i==9){
			if(aa[i].value==aa[i-4].value||aa[i].value==aa[i+1].value||aa[i].value==aa[i+4].value){
				return false;
			}
		}else if(i==8||i==12){
			if(aa[i].value==aa[i-4].value||aa[i].value==aa[i-1].value||aa[i].value==aa[i+4].value){
				return false;
			}
		}else if(i==14||i==15){
			if(aa[i].value==aa[i-4].value||aa[i].value==aa[i-1].value||aa[i].value==aa[i+1].value){
				return false;
			}
		}else if(i==16||i==7||i==10||i==11){
			if(aa[i].value==aa[i-4].value||aa[i].value==aa[i+4].value||aa[i].value==aa[i-1].value||aa[i].value==aa[i+1].value){
				return false;
			}
		}

	}
	return true;
}
function loadScore(){
	var sc=document.getElementById("score");
	sc.innerHTML="分数<br/>"+score;
}
$.extend({
	load:function(rand,figer){
		var div=document.getElementById("k"+rand);
		//document.getElementById("k"+i).style.background="url(./images/"+div[i].value+".png)";
		if(aa[rand].state==1){
			document.all.bgs.src="merge.wav"; 
			//$.texiao2('k'+rand,figer);
			aa[rand].state=0;
		}

		change("k"+rand,figer);
	  	
	  }
	});
function load2(rand,figer){
	var div=document.getElementById("k"+rand);
	//document.getElementById("k"+i).style.background="url(./images/"+div[i].value+".png)";
	if(aa[rand].state==1){
		document.all.bgs.src="merge.wav"; 
		//$.texiao2('k'+rand,figer);
		aa[rand].state=0;
	}

	if(figer==0){
		div.innerHTML="";
		div.style.backgroundColor="#BEB4AA";
	}
}

