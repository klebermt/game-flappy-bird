var contexto = document.getElementById("lienso_juego").getContext("2d");
contexto.canvas.width = 300;
contexto.canvas.height = 533;

//variables
var score = 0;
var fps = 60;
var gravedad = 1.5;

var player = {
    x: 50,
    y: 150,
    width: 50,
    height: 50
}

var tuberias = new Array();
tuberias[0] = {
    x:contexto.canvas.width,
    y:0
}
//sonidos
var punto = new Audio();
punto.src = "audios/punto.mp3";
//imagenes
var bird = new Image();
bird.src = "imagenes/bird.png";

var background = new Image();
background.src = "imagenes/background.png";

var suelo = new Image();
suelo.src = "imagenes/suelo.png";

var tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

var tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png";

//control
function press(){
    player.y -= 25;
}

//bucle
setInterval(loop, 1000/fps);
function loop(){
    contexto.clearRect(0,0,300,533);
    //fondo
    contexto.drawImage(background,0,0);
    //piso
    contexto.drawImage(suelo, 0,contexto.canvas.height - suelo.height);
    //personaje
    contexto.drawImage(bird, player.x, player.y); 

    player.y += gravedad;
    //tuberias
    for(var i = 0; i<tuberias.length; i++){
        var desfase = tuberiaNorte.height + 80;
        contexto.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y);
        contexto.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + desfase);
        tuberias[i].x--;

        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0;
        }

        if (tuberias[i].x == 150){
            tuberias.push({
                x:contexto.canvas.width,
                y:Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            });
        }
        //colisiones
        if(player.x + bird.width>=tuberias[i].x && 
            player.x <=tuberias[i].x + tuberiaNorte.width &&
            (player.y <= tuberias[i].y + tuberiaNorte.height ||
            player.y + bird.height >= tuberias[i].y + desfase) ||
            player.y + bird.height >= contexto.canvas.height - suelo.height){
            location.reload();
        }

        if(tuberias[i].x == 50){
            score++;
            punto.play();
        }
    }
    
    //condiciones
    contexto.fillStyle = "rgba(0,0,0,1)";
    contexto.font = "25px arial";
    contexto.fillText("SCORE: "+score, 10, contexto.canvas.height - 40)
    //eventos

    
}

window.addEventListener("keydown",press);