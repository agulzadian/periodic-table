var table = document.getElementById('pTable')
var elements = [];
var row1 = document.getElementById('r1');
var row2 = document.getElementById('r2');
var row3 = document.getElementById('r3');
var row4 = document.getElementById('r4');
var row5 = document.getElementById('r5');
var row6 = document.getElementById('r6');
var row7 = document.getElementById('r7');
var row8 = document.getElementById('r8');
var row9 = document.getElementById('r9');
var rowsArray = [
  {row: row1, limit: 2, offsetC: 0},
  {row: row2, limit: 8, offsetC: 2},
  {row: row3, limit: 8, offsetC: 10},
  {row: row4, limit: 18, offsetC: 18},
  {row: row5, limit: 18, offsetC: 36},
  {row: row6, limit: 18, offsetC: 54},
  {row: row7, limit: 18, offsetC: 86},
  {row: row8, limit: 15, offsetC: 56},
  {row: row9, limit: 15, offsetC: 88}
];
// http stuff
var data = new XMLHttpRequest();
data.open('GET', '/js/data.json', true);
data.onreadystatechange = function() {
  if (data.readyState == 4 && data.status == "200") {
    elements = JSON.parse(data.response);
    generate();
  }
};
data.send();

// generate generating content and format of cells
function generate() {
  function insertCells(row, setLimit, offsetC) {
    this.row = row;
    this.setI = setLimit;
    this.offsetC = offsetC;

    function setupCell(i, offsetRow) {
      var offsetBreak = 0;
      if (row == row6 && i > 2 || row == row7 && i > 2) {
        offsetBreak = 14;
      }

      var c = offsetRow + offsetBreak + i;
      var cel = row.insertCell(i);
      var el = elements[c];
      var elGroup = el.groupBlock;
      elGroup = elGroup.replace(/\s/g, "-").toLowerCase();
      cel.innerHTML = '<ul class="' + elGroup + '">' +
        '<li>' + el.atomicNumber + '</li>' +
        '<li>' + el.symbol + '</li>' +
        '<li>' + el.name + '</li>' +
        '<li>' + el.atomicMass + '</li>' +
        '</ul>';
    }

    for (var i = 0; i < setLimit; i++) { //after the break
      if (row == row6 && i == 2) {
        var cel = row.insertCell(i);
        cel.innerHTML = '57 - 71';
      } else if (row == row7 && i == 2) {
        var cel = row.insertCell(i);
        cel.innerHTML = '89 - 103'
      } else { // if not a break row
        setupCell(i, offsetC);
      }
    }
  }
  //actually producing the cells
  for (var i = 0; i < rowsArray.length; i++) {
    insertCells(rowsArray[i].row, rowsArray[i].limit, rowsArray[i].offsetC);
  }

  //  filler cells
  for (var i = 1; i < 17; i++) {
    row1.insertCell(i);
  }
  for (var i = 2; i < 12; i++) {
    row2.insertCell(i);
  }
  for (var i = 2; i < 12; i++) {
    row3.insertCell(i);
  }
  row8.insertCell(0);
  row8.insertCell(1);
  row9.insertCell(0);
  row9.insertCell(1);
}

function test() {
  console.log('foo');
}
