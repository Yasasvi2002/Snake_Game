let dx=1,dy=0,fx=35,fy=25;
let xsnake=[25,24,0],ysnake=[25,25,25];
let last=0,speed=10,xprev=0,yprev=0,score=0,slength=3,flag=0,newspeed=speed;
let gmaeover=new Audio("/snake/images/gameover.wav"),bite=new Audio("/snake/images/bite.mp3"),transition=new Audio("/snake/images/key1.wav");
let move=new Audio("/snake/images/move.mp3");    
fx=Math.round(7+30*(Math.random()));
    fy=Math.round(7+30*(Math.random()));
    x=Math.round(7+25*(Math.random()));
    y=Math.round(7+25*(Math.random()));
    xsnake[0]=x;ysnake[0]=y;
    xsnake[1]=x-1;ysnake[1]=y;xsnake[2]=x-2;ysnake[2]=y;

//functions
 
function gameloop(curr){
    window.requestAnimationFrame(gameloop);
    if((curr-last)/1000<1/speed){
        return ;
    }
    else{
    last=curr;
    gameEngine();
    }
}
function gameEngine(){
  
    function Display(id,x,y){
        headElement = document.createElement('div');
        headElement.style.gridRowStart = y;
        headElement.style.gridColumnStart = x;
        headElement.classList.add(id)
        bg.appendChild(headElement);
    }
    function Colide(){
        let x=xsnake[0],y=ysnake[0];
        if(x<0||x>=40||y<0||y>=40){
            return 1;
        }
       
        for(let i=1;i<slength;i++){
            if(xsnake[i]==x && ysnake[i]==y){
                return 1;
            }
        }
        return 0;
    }
    if(Colide()){
        gmaeover.play();
        for(let i=0;i<slength;i++){
            xsnake.pop();
            ysnake.pop();
        }
        dx=1;dy=0;fx=35;fy=25;xsnake=[25,24,0];ysnake=[25,25,25];last=0;speed=10;score=0;
        fx=Math.round(7+30*(Math.random()));
        fy=Math.round(7+30*(Math.random()));
        x=Math.round(7+25*(Math.random()));
        y=Math.round(7+25*(Math.random()));
        xsnake[0]=x;ysnake[0]=y;
        xsnake[1]=x-1;ysnake[1]=y;xsnake[2]=x-2;ysnake[2]=y;slength=3;
            alert(`GAME OVER PRESS "Enter" or OK TO CONTINUE`);
            
    }

    if(xsnake[0]==fx && ysnake[0]==fy){
        bite.play();
        let x,y;
        score+=(speed-0);
        x=(xsnake[slength-1]);
        y=(ysnake[slength-1]);
        for(let i=slength-2;i>=0;i--){
            ysnake[i+1]=ysnake[i];
             xsnake[i+1]=xsnake[i];
         }
         xsnake[0]+=dx;
         ysnake[0]+=dy;
        xsnake.push(x);
        ysnake.push(y);
        slength++;
        // xsnake.unshift( xsnake[0] + dx);
        // ysnake.unshift( xsnake[0] + dy);
        fx=Math.round(2+37*(Math.random()));
        fy=Math.round(2+37*(Math.random()));
    }
    //move
    // move.play();
    // console.log(xsnake);
    for(let i=slength-2;i>=0;i--){
       ysnake[i+1]=ysnake[i];
        xsnake[i+1]=xsnake[i];
    }
    xsnake[0]+=dx;
    ysnake[0]+=dy;
    // console.log(xsnake);

    bg.innerHTML="";
        // Display('shead',xsnake[0],ysnake[0]);
        // Display('black',xprev,yprev);//to clear past values
        
    Display('shead',xsnake[0],ysnake[0]);
    // console.log(slength);
    for(let i=1;i<slength;i++){
       let x=xsnake[i],y=ysnake[i];
        Display('sbody',x,y);
        
      
    }
    
    //display food
    // foodElement = document.createElement('div');
    // foodElement.style.gridRowStart = fy;
    // foodElement.style.gridColumnStart = fx;
    // foodElement.classList.add('food')
    // bg.appendChild(foodElement);
    Display('food',fx,fy);
    speeds.innerHTML="speed: "+ speed;
    scores.innerHTML="score: "+ score;
    
    
}

//main
window.requestAnimationFrame(gameloop);
window.addEventListener('keydown',function (e){
    if(e.key=='ArrowUp'||e.key=='w'){
        transition.play();
        if(dx==0 && dy==1){

        }
        else{
        dx=0;dy=-1;
        } 
    }
    else if(e.key=='ArrowDown'||e.key=='s'){
        transition.play();
        if(dx==0 && dy==-1){

        }
        else{
        dx=0;dy=1;}
    }
    else if(e.key=='ArrowRight'||e.key=='d'){
        transition.play();
        if(dx==-1 && dy==0){

        }
        else{
        dx=1;dy=0;}
    }
    else if(e.key=='ArrowLeft'||e.key=='a'){
        transition.play();
        if(dx==1 && dy==0){

        }
        else{
        dx=-1;dy=0;}
    }
    else if(e.key=='.'){
        transition.play();
        speed++;
        
    }
    else if(e.key==" "){
        transition.play();
        if(flag==0){
            newspeed=speed;
            speed=0;
            flag=1;
        }
        else{
            speed=newspeed;
            flag=0;
        }
    }
    else{

    }

})
