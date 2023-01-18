var butt=document.getElementById("starting");

butt.addEventListener("click", function(){
    window.location.assign("http://127.0.0.1:5500/Snake.html")
});

  function TOHome(){
    window.location.assign("http://127.0.0.1:5500/index.html")
  }

var canvas=document.getElementById("mycanvas");
var context=canvas.getContext('2d');

const GRID=10; // per row has 30 grids
const min=1;
const max=39;


var gameover = false;
var size=2; //body size intialized


//width by GRID = 40 so each row has 40
//height by GRID=40 so each column has 40
//total = 900 position
var WGrid=new Array(1600);
var HGrid=new Array(1600);

for(var i=0;i<=size;i++){
    WGrid[i] = 50- i*10;
    HGrid[i] = 50;

}


var moveleft = false;
var moveright=true;
var  moveUP= false;
var moveDOWN= false;


var ate_apple=true;
var x_apple;
var y_apple;



function GameOver()
{
    context.fillStyle='rgb(236, 145, 7)';
    context.textBaseline='middle';
    context.textAlign="30px monospace";
    context.font="30px Arial";
    context.fillText('Game Over !',120,60);
}

function placeApple()
{
    var R =Math.floor(Math.random()* (max -min)+min);
    x_apple= R*GRID;
    R=Math.floor(Math.random()* (max -min)+min);
    y_apple=R*GRID;
}
function display()
{
    context.clearRect(0,0, canvas.width, canvas.height);

    if(gameover)
    {
        //call gameover function
        GameOver();
    }
    else
    {

        if(ate_apple)
        {
            placeApple();
            ate_apple=false;
        }
        
        context.beginPath();
        context.fillStyle = "rgb(212, 9, 43)";
        context.arc(x_apple,y_apple,7,0, 2*Math.PI,false);
        context.fill();
        context.closePath();

        for(var z=0; z<=size; z++)
        {
            //head
            if(z==0)
            {
               context.beginPath();
               context.fillStyle = "green";
               context.arc(WGrid[z],HGrid[z],7,0, 2*Math.PI,false);
               context.fill();
               context.closePath();
            }
            else //body for size items
            {
                context.beginPath();
                context.fillStyle = "green";
                context.arc(WGrid[z],HGrid[z],7,0, 2*Math.PI,false);
                context.fill();
                context.closePath();
            }
        }
    }
    
}

onkeydown= function(e)
{
    var key= e.keyCode;
    if((key==37)&&(!moveright))  //move left
    {
        moveleft=true;
        moveUP=false;
        moveDOWN=false;
    }
    if((key==39)&&(!moveleft))  //move right
    {
        moveright=true;
        moveUP=false;
        moveDOWN=false;
    }
    if((key==38)&&(!moveDOWN))  //move Up
    {
        moveleft=false;
        moveUP=true;
        moveright=false;
    }
    if((key==40)&&(!moveUP))  //move Down
    {
        moveright=false;
        moveleft=false;
        moveDOWN=true;
    }

} 


function move()
{
     for(var j = size; j > 0; j--) //for body
     {
        WGrid[j]= WGrid[(j-1)];
        HGrid[j]=HGrid[(j-1)];
     }
     //for head
     if(moveleft)
     {
        WGrid[0]=WGrid[0]-GRID;

     }
     if(moveright)
     {
        WGrid[0]=WGrid[0]+GRID;

     }
     if(moveUP)
     {
        HGrid[0]=HGrid[0]-GRID;
     }
     if(moveDOWN)
     {
        HGrid[0]=HGrid[0]+GRID;

     }
}

function validatemove()
{
     //check if head and body collided
      for(var x=GRID;x>0;x--)
      {
        if(( x>4) && (WGrid[0] == WGrid[x])&& (HGrid[0]==HGrid[x]))
        {
            gameover=true;
        }
      }

     //collision to convas border
     if(HGrid[0] >= canvas.height)
     {
         gameover=true;
     }
     if(HGrid[0] < 0)
     {
         gameover=true;
     }
     if (WGrid[0] >= canvas.width)
     {
        gameover=true;
     }
     if (WGrid[0] < 0)
     {
        gameover=true;
     }

}

function eatApple()
{
    if((WGrid[0] == x_apple) && (HGrid[0]==y_apple))
    {
        size++;
        ate_apple=true;
    }
}


function cyclic()
{
     //Eat apple and required grow
    eatApple();
     //validation move and check collision 
     validatemove();
     //keep the record of head & body in canvas for movement
     move();
    //display head & body. also place apple
     display();

    setTimeout("cyclic()",150);
}

cyclic();