var players = [
  {coordinates:[0,0]},
  {coordinates:[0,0]}
];

var current = 0;

function generateMap() {
  var table = document.getElementById('table');
  var x = 0; var y = 0;
  for (i=0; i < 25; i ++){
    if (y%2){
      if(i == 15){
        table.rows[4-y].cells[4-x].innerText = "SNAKE! Move to position 5!";
      }
      else if(i == 8){
        table.rows[4-y].cells[4-x].innerText = "LADDER! Move to position 15!";
      }
      else if(i == 19){
        table.rows[4-y].cells[4-x].innerText = "LADDER! Move to position 24!";
      }
      else{
        table.rows[4-y].cells[4-x].innerText = i;
      }
    }
    else{
      if(i == 0){
        table.rows[4-y].cells[x].innerText = "Start!";
      }
      else if(i == 23){
        table.rows[4-y].cells[x].innerText = "SNAKE! Move to position 16!";
      }
      else if(i == 24){
        table.rows[4-y].cells[x].innerText = "FINISH!";
      }
      else{
        table.rows[4-y].cells[x].innerText = i;
      }
    }
    x ++;
    if (x == 5){
      x = 0;
      y ++;
    }
  }
  if (players[0].coordinates[1]%2){
    table.rows[4-players[0].coordinates[1]].cells[4-players[0].coordinates[0]].innerText += " P1 ";
  }
  else {
    table.rows[4-players[0].coordinates[1]].cells[players[0].coordinates[0]].innerText += " P1 ";
  }
  if (players[1].coordinates[1]%2){
    table.rows[4-players[1].coordinates[1]].cells[4-players[1].coordinates[0]].innerText += " P2 ";
  }
  else {
    table.rows[4-players[1].coordinates[1]].cells[players[1].coordinates[0]].innerText += " P2 ";
  }
};

function move() {
  var log = document.getElementById('log');
  var random = Math.floor(Math.random() * 6)+1;
  var temp = random;
  var currentLog = log.innerHTML;
  log.innerHTML = "";
  while (random){
    players[current].coordinates[0] ++;
    if (players[current].coordinates[0] == 4){
      players[current].coordinates[1] ++;
      players[current].coordinates[0] = 0;
    }
    if (players[current].coordinates[1]>4){
      log.innerHTML = "<p>Player "+Number(current+1)+" has won the game!</p>";
      log.innerHTML += "<p>Player "+Number(current+1)+" has rolled: "+temp+"</p>";
      log.innerHTML += currentLog;
      document.getElementById("roll").disabled = true;
      generateMap();
      return;
    }
    random --;
  }
  if (players[current].coordinates[0]==3 && players[current].coordinates[1]==4){
    log.innerHTML = "<p>Player "+Number(current+1)+" has landed on a snake! Moving to position 16!</p>";
    players[current].coordinates[0] = 1;
    players[current].coordinates[1] = 3;
  }
  else if (players[current].coordinates[0]==0 && players[current].coordinates[1]==3){
    log.innerHTML = "<p>Player "+Number(current+1)+" has landed on a snake! Moving to position 5!</p>";
    players[current].coordinates[0] = 0;
    players[current].coordinates[1] = 1;
  }
  else if (players[current].coordinates[0]==3 && players[current].coordinates[1]==1){
    log.innerHTML = "<p>Player "+Number(current+1)+" has landed on a ladder! Moving to position 15!</p>";
    players[current].coordinates[0] = 0;
    players[current].coordinates[1] = 3;
  }
  else if (players[current].coordinates[0]==4 && players[current].coordinates[1]==3){
    log.innerHTML = "<p>Player "+Number(current+1)+" has landed on a ladder! Moving to position 24 (FINISH)!</p>";
    log.innerHTML += "<p>Player "+Number(current+1)+" has won the game!</p>";
    log.innerHTML += "<p>Player "+Number(current+1)+" has rolled: "+temp+"</p>";
    log.innerHTML += currentLog;
    document.getElementById("roll").disabled = true;
    generateMap();
    return;
  }
  log.innerHTML += "<p>Player "+Number(current+1)+" has rolled: "+temp+"</p>";
  log.innerHTML += currentLog;
  if (current == 0){
    current = 1;
  }
  else {
    current = 0;
  }
  console.log(players[current].coordinates[0], players[current].coordinates[1]);
  generateMap();

}
