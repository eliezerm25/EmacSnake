let $canvas= document.querySelector("canvas");
let ctx= $canvas.getContext("2d",{ willReadFrequently: true });
let x=50;
let y=30;
let width=10;
let height=5
let moveStep=10;
let direction="ArrowRight";
let setTime;
let speed=150;
let statusGame="pause";
let arrayClear=[];
let piece={x:0,y:0}   
let score=0;

document.addEventListener("keyup",function(event){
    const{key}=event
    event.preventDefault();
    markDiretion(key);
})
function initial(){
  arrayClear=[];
  x=50;
  y=30;
  moveStep=10;
  document.querySelector(".Game").style.display="flex"
  document.querySelector(".GameOver").style.display="none"  
  ctx.fillStyle="#fff"
  ctx.fillRect(x,y,width,height)
  x+=moveStep
  ctx.fillRect(x,y,width,height)
  x+=moveStep
  ctx.fillRect(x,y,width,height)
  x+=moveStep
  ctx.fillRect(x,y,width,height)
  console.log(x,y)
  arrayClear.push({startCount:50,objectX:x,objectY:y,objectDirection:direction}); 
  createPieces()

}
function autoMove(dirrection){
   setTime=setInterval(()=>{
     ctx.fillStyle="#fff"
     switch(direction){
      case"ArrowRight": 
        x+=moveStep
        if(x!=piece.x && y!=piece.y&&ctx.getImageData(x,y,width,height ).data[3]!=0)
         gameOver()
        if(x>$canvas.width)
         gameOver()
        ctx.fillRect(x,y,width,height)          
        if(x==piece.x && y==piece.y){
         score++
         x+=moveStep
         ctx.fillStyle="red"
         ctx.fillRect(x,y,width,height)
         createPieces()
        }
        break
      case "ArrowLeft":
        x-=moveStep
        if(x!=piece.x && y!=piece.y&&ctx.getImageData(x,y,width,height ).data[3]!=0)
         gameOver()
        if(x<0)
         gameOver()
        ctx.fillRect(x,y,width,height)        
        if(x==piece.x && y==piece.y){
         score++
         x-=moveStep
         ctx.fillStyle="red"
         ctx.fillRect(x,y,width,height)
         createPieces()
        }
        break
      case"ArrowDown":
        y+=moveStep
        if(x!=piece.x && y!=piece.y&&ctx.getImageData(x,y,width,height ).data[3]!=0)
         gameOver()
        if(y>$canvas.height)
         gameOver()
        ctx.fillRect(x,y,width,height)       
        if(x==piece.x && y==piece.y){
         score++
         y+=moveStep
         ctx.fillStyle="red"
         ctx.fillRect(x,y,width,height)
         createPieces()
        }
        break
      case"ArrowUp":
      
        y-=moveStep
        if(x!=piece.x && y!=piece.y&&ctx.getImageData(x,y,width,height ).data[3]!=0)
         gameOver()
        if(y<0)
          gameOver()
        ctx.fillRect(x,y,width,height)     
        if(x==piece.x && y==piece.y){
         score++
         y-=moveStep
         ctx.fillStyle="red"
         ctx.fillRect(x,y,width,height)
         createPieces()
        }
        break
     }
     if(arrayClear.length>0){
      arrayClear[arrayClear.length-1].objectX=x;
      arrayClear[arrayClear.length-1].objectY=y;
      if(arrayClear[0].objectDirection=="ArrowRight" || arrayClear[0].objectDirection=="ArrowDown")
        clearUp(arrayClear[0])
      else
        clearDown(arrayClear[0])
     }    
     document.querySelector("span").innerText="Score: "+score;
    },speed);  
}
function clearUp(obj){
  switch(obj.objectDirection)
  {
    case"ArrowRight":
     if(obj.startCount<=obj.objectX){
       ctx.clearRect(obj.startCount,obj.objectY,width,height)
       obj.startCount+=10;
     }
     if(obj.startCount>=obj.objectX)
       arrayClear.shift()
     break
    case"ArrowDown":
      if(obj.startCount<=obj.objectY){
        ctx.clearRect(obj.objectX,obj.startCount,width,height)
        obj.startCount+=5;
      }
      if(obj.startCount>=obj.objectY)
        arrayClear.shift()
  }
}
function clearDown(obj){
  switch(obj.objectDirection){
   case"ArrowLeft":
     if(obj.startCount>=obj.objectX){
       ctx.clearRect(obj.startCount,obj.objectY,width,height)
       obj.startCount-=10;
     }
     if(obj.startCount<=obj.objectX)
       arrayClear.shift()  
     break
   case"ArrowUp":
    if(obj.startCount>=obj.objectY){
      ctx.clearRect(obj.objectX,obj.startCount,width,height)
      obj.startCount-=5;
    }
    if(obj.startCount<=obj.objectY)
       arrayClear.shift()   
  } 
}
function gameOver(){
  console.log(x,y)
    clearInterval(setTime)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    statusGame="pause";
    document.querySelector(".Score").innerText="Score: "+score;
    score=0;     
    direction="ArrowRight";
    document.querySelector(".Game").style.display="none"
    document.querySelector(".GameOver").style.display="flex"
}
function createPieces(){
  piece.x= Math.floor(Math.random()*($canvas.width-40)+10)
  piece.y= Math.floor(Math.random()*($canvas.height-25)+10)
  piece.x-=piece.x%10
  piece.y-=piece.y%5
  if(ctx.getImageData(piece.x,piece.y,10,5).data[3]!=0)
   createPieces()
  ctx.fillStyle="red"   
  ctx.fillRect(piece.x,piece.y,10,5)
}
function markDiretion(key){
  switch (key)
  {
     case "ArrowRight":
       if(direction!="ArrowRight" && direction!="ArrowLeft" && statusGame=="play"){
         direction="ArrowRight";
         moveStep=10;
         arrayClear.push({startCount:x,objectX:x,objectY:y,objectDirection:direction});                  dropY=y;
       }
       break;
     case "ArrowLeft":
       if(direction!="ArrowLeft" && direction!="ArrowRight" && statusGame=="play")
        {
           direction="ArrowLeft";
           moveStep=10;
           arrayClear.push({startCount:x,objectX:x,objectY:y,objectDirection:direction});                  dropY=y;
        }
        break;
     case "ArrowUp":
       if(direction!="ArrowUp" &&direction!="ArrowDown" && statusGame=="play"){
         direction="ArrowUp";
         moveStep=5;
         arrayClear.push({startCount:y,objectX:x,objectY:y,objectDirection:direction});                  dropY=y;
       }
       break;
     case "ArrowDown":
       if(direction!="ArrowDown" &&direction!="ArrowUp" && statusGame=="play"){
         direction="ArrowDown";
         moveStep=5;
         arrayClear.push({startCount:y,objectX:x,objectY:y,objectDirection:direction});                  dropY=y;
       }
       break;
     case " ":
       if(statusGame=="pause"){
        statusGame="play"
        initial()
        autoMove()  
        document.querySelector("h3").innerText=""
       }
       break;
     case "Enter":
       if(statusGame=="play"){
         statusGame="pause"
         clearInterval(setTime) 
         document.querySelector("h3").innerText="Press Space to play"
       }
  }
}