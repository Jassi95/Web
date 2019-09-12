var size = 5;
var gameTable = Array(size).fill().map(()=>Array(size).fill(0));//makes 5x5 table
var turn = 1;
var time;
//functions to handle the HTML
function timer() {//https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_progressbar_labels_js4
  var elem = document.getElementById("myBar");
  var width = 0;
  time = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(time);
      //document.getElementById("myP").className = "w3-text-green w3-animate-opacity";
      if (turn == 1) {
        turn = 2
      }else{turn = 1}
      timer();
    } else {
      width++;
      elem.style.width = width + '%';
      var num = width * 1 / 10;
      num = num.toFixed(0)
      num = 10-num
      //document.getElementById("demo").innerHTML = num;
    }
  }
}

function makeMark(x,y){
  var s =  document.getElementById("board").rows[x].cells[y];
  if (turn == 1){
    s.innerHTML="x";
    s.className="x"
    }

  else{
    s.innerHTML="o";
    s.className="o"
  }
}


function addCell(tr,colnum) {
  var td = document.createElement('td');
  td.id = colnum
  td.innerHTML = '';
  tr.appendChild(td)
}


function addRow(board, size, rownum) {
  var tr = document.createElement('tr');
  tr.id=rownum
  for (var i =0; i<size;i++){
    addCell(tr,i);
    board.appendChild(tr)
  }

}

function createTable(size){
  for (var i = 0; i < size; i++) {
    addRow(board,size,i)
  }
}


//functions to handle the functionalities
function gameEnding(){
   //resets the game
   window.location.reload();
}

function five_in_row(array){
  var n=0;
  for (let i= 0; i<array.length; i++){
    if(array[i]==array[i+1]&& array[i]!=0){
      n=n+1
    }
    else {
      n=0;
    }
    //console.log(n)
    if (n==4){
      if (turn == 2){
        alert("Player 1 won!");
      }
      else{alert("Player 2 won!")}
    gameEnding();
    }
  }
}


function check(){
  var l_to_r = [];
  var r_to_l = [];
//horizontal
 for (let y = 0; y < size; y++) {
   five_in_row(gameTable[y])
 }
 //diaconal
 for (let x = 0; x < size; x++) {//https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array
   var col=gameTable.map(function(value,index){return value[x]});
   five_in_row(col)
 }
 //cross from left to right
   for (let i = 0; i<size; i++){
    l_to_r.push(gameTable[i][size-i-1])

   }
   five_in_row(l_to_r)
 //console.log(l_to_r);

 //cross from right to left
  for (let j = 0; j<size; j++){
   r_to_l.push(gameTable[j][j])
  }
  five_in_row(r_to_l)
 }


function engine(x,y){
 clearInterval(time);
 timer();
 console.log(x,y,gameTable)
 if (gameTable[x][y]==0){
   gameTable[x][y]=turn;
   makeMark(x,y)
   if (turn==2){turn=1}
   else turn=2;
   check()
 }
}


function main() {
  board = document.getElementById('board');
  createTable(size);
  var location = document.querySelector('table');
   // listen for a click
   timer();
   location.addEventListener('click', function(ev){// This is used to handle onclick events
       // get the event targets ID
       var rowID = ev.target.id;
       var colID = ev.target.parentNode.id;
       console.log(colID,rowID);
       engine(colID,rowID);

   })
}
