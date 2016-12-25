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
var aa=new Array(); //定义一维数组
function Square(state,value){
	this.state = state;
	this.value = value;
}
function mov(){ 
	var a=document.getElementById('footer');
	a.addEventListener('drag',dra,false);
	a.addEventListener('dragend',draed,false);
	window.addEventListener('keydown',dra,false);
	document.getElementById('start').addEventListener('click',init,false);
	document.getElementById('start').onmousedown=function(){mousdown("start")};
	document.getElementById('bo').onmouseup=function(){mousup("start")};
	//document.getElementById('start').addEventListener('mouseup',mousup(start),false);
	document.getElementById("example").innerHTML="2048";
	document.getElementById("maxscore").innerHTML="历史最好成绩<br/>0";
	document.getElementById("start").innerHTML="开始";
	document.getElementById("score").innerHTML="分数<br/>0";
	document.getElementById('ok').addEventListener('click',closemask,false);
	document.getElementById('ok').onmousedown=function(){mousdown("ok")};
	document.getElementById('ok').onmouseup=function(){mousup("ok")};
	document.getElementById('restart').addEventListener('click',init,false);
	document.getElementById('restart').onmousedown=function(){mousdown("restart")};
	document.getElementById('restart').onmouseup=function(){mousup("restart")};

	document.getElementById('example').addEventListener('click',playsound,false);
	//init();
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
	X=ev.clientX;
	Y=ev.clientY;
	if(test<2){
		x1=X;
		y1=Y;
	}
	//document.getElementById('footer').style.cursor = "move" ;
	//document.getElementById("score").innerHTML="down: (" + X + "," + Y + ","+ test +")";
	//document.getElementById("maxscore").innerHTML="drag: (" + x1 + "," + y1 + ","+ test +")"
	var xc1=X-x1;
	var yc1=Y-y1;
	if(((Math.abs(xc1)>50||Math.abs(yc1)>50)&&X!=0&&Y!=0&&b==true&&s==true)||(ev.keyCode&&s==true)){
		x2=X;
		y2=Y;
		xc=x2-x1;
		yc=y2-y1;
		if(Math.abs(xc)>Math.abs(yc)||ev.keyCode){
			if(xc>0||ev.keyCode==39){
				b=false;
				right(4);
				right(8);
				right(12);
				right(16);
				loadall();
				loadScore();
				if(moveableRight){
					create();
				}
				//document.getElementById("example").innerHTML="fangxiang: (" + "右" +")";
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}else if(xc<0||ev.keyCode==37){
				b=false;
				left(1);
				left(5);
				left(9);
				left(13);
				loadall();
				loadScore();
				if(moveableLeft){
					create();
				}
				
				//document.getElementById("example").innerHTML="fangxiang: (" + "左" +")";
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}
		}
		if(Math.abs(xc)<Math.abs(yc)||ev.keyCode){
			if(yc>0||ev.keyCode==40){
				b=false;
				down(13);
				down(14);
				down(15);
				down(16);
				loadall();
				loadScore();
				if(moveableDown){
					create();
				}
				//document.getElementById("example").innerHTML="fangxiang: (" + "下" +")";
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}else if(yc<0||ev.keyCode==38){
				b=false;
				up(1);
				up(2);
				up(3);
				up(4);
				loadall();
				loadScore();
				if(moveableUp){
					create();
				}
				//document.getElementById("example").innerHTML="fangxiang: (" + "上" +")";
				//document.getElementById("start").innerHTML="chazhi: (" + xc + "," + yc + ","+ test +")";
				
			}
		}
	}
	

}	
function draed(ev){
	test=0;
	b=true;
	//document.getElementById("score").innerHTML="down: (" + X + "," + Y + ","+ test +")";
}
function init(){
	closemask();
	for(i=0;i<16;i++){
		 aa[i+1]=new Square(0,0);
	} 
	/*if(aa[1].value==0){
	alert(aa[1].state);
	}
	load(1,aa[1].value);*/
	loadall();
	if(score>maxScore){
		maxScore=score;
	}
	document.getElementById("maxscore").innerHTML="历史最好成绩<br/>"+maxScore;
	score=0;
	loadScore();
	create();
	create();
	s=true;
	/*load(5,8);
	load(3,16);
	load(6,32);
	load(7,64);
	load(8,128);
	load(2,256);
	load(9,512);
	load(10,1024);
	load(11,2048);*/
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
		if(rand==1){
			expandinit(90,70,rand,'k'+rand,figer);
		}else if(rand==2){
			expandinit(210,70,rand,'k'+rand,figer);
		}else if(rand==3){
			expandinit(330,70,rand,'k'+rand,figer);
		}else if(rand==4){
			expandinit(450,70,rand,'k'+rand,figer);
		}else if(rand==5){
			expandinit(90,190,rand,'k'+rand,figer);
		}else if(rand==6){
			expandinit(210,190,rand,'k'+rand,figer);
		}else if(rand==7){
			expandinit(330,190,rand,'k'+rand,figer);
		}else if(rand==8){
			expandinit(450,190,rand,'k'+rand,figer);
		}else if(rand==9){
			expandinit(90,310,rand,'k'+rand,figer);
		}else if(rand==10){
			expandinit(210,310,rand,'k'+rand,figer);
		}else if(rand==11){
			expandinit(330,310,rand,'k'+rand,figer);
		}else if(rand==12){
			expandinit(450,310,rand,'k'+rand,figer);
		}else if(rand==13){
			expandinit(90,430,rand,'k'+rand,figer);
		}else if(rand==14){
			expandinit(210,430,rand,'k'+rand,figer);
		}else if(rand==15){
			expandinit(330,430,rand,'k'+rand,figer);
		}else if(rand==16){
			expandinit(450,430,rand,'k'+rand,figer);
		}
		//expandinit(90,70,5,'k'+5,256);
		//alert(rand+","+aa[rand]);
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
	sequenceLeft(i);
	if(aa[i].value!=0){
		if(aa[i].value==aa[i+1].value){
			aa[i].value=aa[i].value*2;
			aa[i].state=1;
			score=score+aa[i].value;
			aa[i+1].value=0;
			aa[i+1].state=0;
			moveableLeft=true;
		}
	}
	if(aa[i+1].value!=0){
		if(aa[i+1].value==aa[i+2].value){
			aa[i+1].value=aa[i+1].value*2;
			aa[i+1].state=1;
			score=score+aa[i+1].value;
			aa[i+2].value=0;
			aa[i+2].state=0;
			moveableLeft=true;
		}
	}
	if(aa[i+2].value!=0){
		if(aa[i+2].value==aa[i+3].value){
			aa[i+2].value=aa[i+2].value*2;
			aa[i+2].state=1;
			score=score+aa[i+2].value;
			aa[i+3].value=0;
			aa[i+3].state=0;
			moveableLeft=true;
		}
	}
	sequenceLeft(i);
}
function right(i){
	sequenceRight(i);
	if(aa[i].value!=0){
		if(aa[i].value==aa[i-1].value){
			aa[i].value=aa[i].value*2;
			aa[i].state=1;
			score=score+aa[i].value;
			aa[i-1].value=0;
			aa[i-1].state=0;
			moveableRight=true;
		}
	}
	if(aa[i-1].value!=0){
		if(aa[i-1].value==aa[i-2].value){
			aa[i-1].value=aa[i-1].value*2;
			aa[i-1].state=1;
			score=score+aa[i-1].value;
			aa[i-2].value=0;
			aa[i-2].state=0;
			moveableRight=true;
		}
	}
	if(aa[i-2].value!=0){
		if(aa[i-2].value==aa[i-3].value){
			aa[i-2].value=aa[i-2].value*2;
			aa[i-2].state=1;
			score=score+aa[i-2].value;
			aa[i-3].value=0;
			aa[i-3].state=0;
			moveableRight=true;
		}
	}
	sequenceRight(i);
}

function down(i){
	sequenceDown(i);
	if(aa[i].value!=0){
		if(aa[i].value==aa[i-4].value){
			aa[i].value=aa[i].value*2;
			aa[i].state=1;
			score=score+aa[i].value;
			aa[i-4].value=0;
			aa[i-4].state=0;
			moveableDown=true;
		}
	}
	if(aa[i-4].value!=0){
		if(aa[i-4].value==aa[i-8].value){
			aa[i-4].value=aa[i-4].value*2;
			aa[i-4].state=1;
			score=score+aa[i-4].value;
			aa[i-8].value=0;
			aa[i-8].state=0;
			moveableDown=true;
		}
	}
	if(aa[i-8].value!=0){
		if(aa[i-8].value==aa[i-12].value){
			aa[i-8].value=aa[i-8].value*2;
			aa[i-8].state=1;
			score=score+aa[i-8].value;
			aa[i-12].value=0;
			aa[i-12].state=0;
			moveableDown=true;
		}
	}
	sequenceDown(i);
}
function up(i){
	sequenceUp(i);
	if(aa[i].value!=0){
		if(aa[i].value==aa[i+4].value){
			aa[i].value=aa[i].value*2;
			aa[i].state=1;
			score=score+aa[i].value;
			aa[i+4].value=0;
			aa[i+4].state=0;
			moveableUp=true;
		}
	}
	if(aa[i+4].value!=0){
		if(aa[i+4].value==aa[i+8].value){
			aa[i+4].value=aa[i+4].value*2;
			aa[i+4].state=1;
			score=score+aa[i+4].value;
			aa[i+8].value=0;
			aa[i+8].state=0;
			moveableUp=true;
		}
	}
	if(aa[i+8].value!=0){
		if(aa[i+8].value==aa[i+12].value){
			aa[i+8].value=aa[i+8].value*2;
			aa[i+8].state=1;
			score=score+aa[i+8].value;
			aa[i+12].value=0;
			aa[i+12].state=0;
			moveableUp=true;
		}
	}
	sequenceUp(i);

}
function sequenceLeft(i){
	for(var n=0;n<4;n++){
		if(aa[i].value==0){
			if(aa[i+1].value!=0){
				aa[i].value=aa[i+1].value;
				aa[i].state=aa[i+1].state;
				aa[i+1].value=0;
				aa[i+1].state=0;
				moveableLeft=true;
			}
		}
		if(aa[i+1].value==0){
			if(aa[i+2].value!=0){
				aa[i+1].value=aa[i+2].value;
				aa[i+1].state=aa[i+2].state;
				aa[i+2].value=0;
				aa[i+2].state=0;
				moveableLeft=true;
			}
		}
		if(aa[i+2].value==0){
			if(aa[i+3].value!=0){
				aa[i+2].value=aa[i+3].value;
				aa[i+2].state=aa[i+3].state;
				aa[i+3].value=0;
				aa[i+3].state=0;
				moveableLeft=true;
			}
		}
	}
	
}
function sequenceRight(i){
	for(var n=0;n<4;n++){
		if(aa[i].value==0){
			if(aa[i-1].value!=0){
				aa[i].value=aa[i-1].value;
				aa[i].state=aa[i-1].state;
				aa[i-1].value=0;
				aa[i-1].state=0;
				moveableRight=true;
			}
		}
		if(aa[i-1].value==0){
			if(aa[i-2].value!=0){
				aa[i-1].value=aa[i-2].value;
				aa[i-1].state=aa[i-2].state;
				aa[i-2].value=0;
				aa[i-2].state=0;
				moveableRight=true;
			}
		}
		if(aa[i-2].value==0){
			if(aa[i-3].value!=0){
				aa[i-2].value=aa[i-3].value;
				aa[i-2].state=aa[i-3].state;
				aa[i-3].value=0;
				aa[i-3].state=0;
				moveableRight=true;
			}
		}
	}
	
}

function sequenceDown(i){
	for(var n=0;n<4;n++){
		if(aa[i].value==0){
			if(aa[i-4].value!=0){
				aa[i].value=aa[i-4].value;
				aa[i].state=aa[i-4].state;
				aa[i-4].value=0;
				aa[i-4].state=0;
				moveableDown=true;
			}
		}
		if(aa[i-4].value==0){
			if(aa[i-8].value!=0){
				aa[i-4].value=aa[i-8].value;
				aa[i-4].state=aa[i-8].state;
				aa[i-8].value=0;
				aa[i-8].state=0;
				moveableDown=true;
			}
		}
		if(aa[i-8].value==0){
			if(aa[i-12].value!=0){
				aa[i-8].value=aa[i-12].value;
				aa[i-8].state=aa[i-12].state;
				aa[i-12].value=0;
				aa[i-12].state=0;
				moveableDown=true;
			}
		}
	}
}
function sequenceUp(i){
	for(var n=0;n<4;n++){
		if(aa[i].value==0){
			if(aa[i+4].value!=0){
				aa[i].value=aa[i+4].value;
				aa[i].state=aa[i+4].state;
				aa[i+4].value=0;
				aa[i+4].state=0;
				moveableUp=true;
			}
		}
		if(aa[i+4].value==0){
			if(aa[i+8].value!=0){
				aa[i+4].value=aa[i+8].value;
				aa[i+4].state=aa[i+8].state;
				aa[i+8].value=0;
				aa[i+8].state=0;
				moveableUp=true;
			}
		}
		if(aa[i+8].value==0){
			if(aa[i+12].value!=0){
				aa[i+8].value=aa[i+12].value;
				aa[i+8].state=aa[i+12].state;
				aa[i+12].value=0;
				aa[i+12].state=0;
				moveableUp=true;
			}
		}
	}
}
function loadall(){
	for(var i=1;i<=16;i++){
		load(i,aa[i].value);
	}
	isFull();
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
		//alert("游戏结束！\n你的分数为："+score+"\n请点击开始按钮重新开始");
		showmask();
	}
	//alert(true);
}

function showmask(){
	document.getElementById("mask").style.display="block";
	document.getElementById("mask2").style.display="block";
	document.getElementById("finalscore").innerHTML="分数<br/>"+score;
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

function load(rand,figer){
	var div=document.getElementById("k"+rand);
	//document.getElementById("k"+i).style.background="url(./images/"+div[i].value+".png)";
	if(aa[rand].state==1){
		document.all.bgs.src="merge.wav"; 
		if(rand==1){
			expandinit(90,70,rand,'k'+rand,figer);
		}else if(rand==2){
			expandinit(210,70,rand,'k'+rand,figer);
		}else if(rand==3){
			expandinit(330,70,rand,'k'+rand,figer);
		}else if(rand==4){
			expandinit(450,70,rand,'k'+rand,figer);
		}else if(rand==5){
			expandinit(90,190,rand,'k'+rand,figer);
		}else if(rand==6){
			expandinit(210,190,rand,'k'+rand,figer);
		}else if(rand==7){
			expandinit(330,190,rand,'k'+rand,figer);
		}else if(rand==8){
			expandinit(450,190,rand,'k'+rand,figer);
		}else if(rand==9){
			expandinit(90,310,rand,'k'+rand,figer);
		}else if(rand==10){
			expandinit(210,310,rand,'k'+rand,figer);
		}else if(rand==11){
			expandinit(330,310,rand,'k'+rand,figer);
		}else if(rand==12){
			expandinit(450,310,rand,'k'+rand,figer);
		}else if(rand==13){
			expandinit(90,430,rand,'k'+rand,figer);
		}else if(rand==14){
			expandinit(210,430,rand,'k'+rand,figer);
		}else if(rand==15){
			expandinit(330,430,rand,'k'+rand,figer);
		}else if(rand==16){
			expandinit(450,430,rand,'k'+rand,figer);
		}
		aa[rand].state=0;
	}

	if(figer==0){
		div.innerHTML="";
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

/*var int=self.setInterval("clock()",50);
function clock()
  {
  var t=new Date()
  document.getElementById("clock").value=t;
  }*/
 //clearInterval(int);
   /*$(function(){
         
         $("#example").click(function(){
            $("#example").animate({width:'110',height:'110',right:'20px'},1000);
         })
    })*/


var ex=new Array();
function expandinit(l,t,n,idname,figer){
	var hh=0;
	var ww=0;
	var ll=0;
	var tt=0;
	var ft=0;
	var f=0;
	ll=l;
	tt=t;
	//ll=400;
	//tt=50;
	//i=1;
	ex[n]=self.setInterval(function(){expand(l,t,n,idname,figer)},20);
	

	function expand(l,t,n,idname,figer){
		//alert(i);
		hh=hh+20;
		ww=ww+20;
		ll=ll-10;
		tt=tt-10;
		
		//document.getElementById("example").cssText = "heigth:300px;width:300px;top:300px";
		var node=document.getElementById(idname);
		if(figer==0){
			node.innerHTML="";
			node.style.backgroundColor="#BEB4AA";
			f=10;
		}
		if(figer==2){
			node.style.backgroundColor="#E6DCD2";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			node.style.lineHeight="150%"; 
			node.style.color="#000000";
			f=10;
		}else if(figer==4){
			node.style.backgroundColor="#BD9266";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			node.style.lineHeight="150%"; 
			node.style.color="#000000";
			f=10;
		}else if(figer==8){
			node.style.backgroundColor="#FFC78E";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			f=10;
		}else if(figer==16){
			node.style.backgroundColor="#FF8000";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			f=10;
		}else if(figer==32){
			node.style.backgroundColor="#FFAD86";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			f=10;
		}else if(figer==64){
			node.style.backgroundColor="#FFFF00";
			node.innerHTML=figer;
			node.style.fontSize="50pt";
			node.style.lineHeight="150%"; 
			node.style.color="#FFFFFF";
			f=10;
		}else if(figer==128){
			node.style.backgroundColor="#CC3300";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			f=8;
		}else if(figer==256){
			node.style.backgroundColor="#FFFF80";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			f=8;
		}else if(figer==512){
			node.style.backgroundColor="#804040";
			node.innerHTML=figer;
			node.style.fontSize="40pt";
			node.style.lineHeight="180%"; 
			node.style.color="#FFFFFF";
			f=8;
		}else if(figer==1024){
			node.style.backgroundColor="#FF0080";
			node.innerHTML=figer;
			node.style.fontSize="30pt";
			node.style.lineHeight="250%"; 
			node.style.color="#FFFFFF";
			f=6;
		}else if(figer==2048){
			node.style.backgroundColor="#FF0000";
			node.innerHTML=figer;
			node.style.fontSize="30pt";
			node.style.lineHeight="250%"; 
			node.style.color="#FFFFFF";
			f=6;
		}

		ft=ft+f;
		node.style.left = ll+'px';
		node.style.top = tt+'px';
		node.style.height = hh+'px';
		node.style.width = ww+'px';
		node.style.fontSize = ft+'pt';
		
		//node.style.lineHeight = lh+'%';
		if(hh==100){
			
			hh=0;
			ww=0;
			ll=0;
			tt=0;
			ft=0;
			window.clearInterval(ex[n]);
			return;
			//ex=0;
		
		}
	}
}