const rootStyle=document.documentElement.style;let prevX=0,prevY=0,centerWidth=document.body.clientWidth/2,centerHeight=document.body.clientHeight/2;document.addEventListener("mousemove",(function(e){(prevX-e.clientX<5||prevX-e.clientX>5)&&(prevX=e.clientX,rootStyle.setProperty("--tx",(centerWidth-e.clientX)/10+"px")),(prevY-e.clientY<5||prevY-e.clientY>5)&&(prevY=e.clientY,rootStyle.setProperty("--ty",(centerHeight-e.clientY)/10+"px"))}));