function EBI(id) {
  return document.getElementById(id);
}
var canvas = EBI("canvas");
var ctx = canvas.getContext("2d");
var usersize = EBI("size");
var an_size = EBI("change");

var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontsize;
var lose = false;

start();
an_size.onclick = function() {
  if (usersize.value >= 2 && usersize.value <= 20) {
    size = usersize.value;
    width = canvas.width / size - 6;
    console.log(usersize.value);
    canvasclean();
    start();
  }
}

function cell(row, col) {
  this.value = 0;
  this.x = col * width + 5 * (col + 1);
  this.y = row * width + 5 * (row + 1);
}

function boxes() {
  var i, j;
  for (i = 0; i < size; i++) {
    cells[i] = [];
    for (j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawcell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value) {
    case 0:
      ctx.fillStyle = '#bab2b2';
      break;
    case 2:
      ctx.fillStyle = '#c4c37f';
      break;
    case 4:
      ctx.fillStyle = '#328777';
      break;
    case 8:
      ctx.fillStyle = '#c47f7f';
      break;
    case 16:
      ctx.fillStyle = '#c49c7f';
      break;
    case 32:
      ctx.fillStyle = '#9dd0f2';
      break;
    case 64:
      ctx.fillStyle = '#824455';
      break;
    case 128:
      ctx.fillStyle = '#b69cf1';
      break;
    case 256:
      ctx.fillStyle = '#0040ff';
      break;
    case 512:
      ctx.fillStyle = '#ff0080';
      break;
    case 1024:
      ctx.fillStyle = '#605054';
      break;
    case 2048:
      ctx.fillStyle = '#FF7F50';
      break;
    case 4096:
      ctx.fillStyle = '#ffbf00';
      break;
    default:
      ctx.fillStyle = '#ff0080';
  }
  ctx.fill();
  if (cell.value) {
    fontsize = width / 2;
    ctx.font = fontsize + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width / 7);
  }
}

function canvasclean() {
  ctx.clearRect(0, 0, 500, 500);
}
document.onkeydown = function(event) {
  if (!lose) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      up();
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      right();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      down();
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      left();
    }
  }
}

function start() {
  boxes();
  createtable();
  addcell();
  addcell();
}

function createtable() {
  var i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      drawcell(cells[i][j]);
    }
  }
}

function addcell() {
  var blank = 0;
  var i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        blank++;
      }
    }
  }
  if (!blank) {
    over();
    return;
  }
  while (true) {
    var row = Math.floor(Math.random() * size);
    var col = Math.floor(Math.random() * size);
    if (!cells[row][col].value) {
      cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
      createtable();
      return;
    }
  }
}

function right() {
  var i, j;
  var col;
  for (i = 0; i < size; i++) {
    for (j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        col = j;
        while (col + 1 < size) {
          if (!cells[i][col + 1].value) {
            cells[i][col + 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col++;
          } else if (cells[i][col].value == cells[i][col + 1].value) {
            cells[i][col + 1].value *= 2;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addcell();
}

function left() {
  var i, j;
  var col;
  for (i = 0; i < size; i++) {
    for (j = 1; j < size; j++) {
      if (cells[i][j].value) {
        col = j;
        while (col - 1 >= 0) {
          if (!cells[i][col - 1].value) {
            cells[i][col - 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col--;
          } else if (cells[i][col].value == cells[i][col - 1].value) {
            cells[i][col - 1].value *= 2;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addcell();
}

function up() {
  var i, j, row;
  for (j = 0; j < size; j++) {
    for (i = 1; i < size; i++) {
      if (cells[i][j].value) {
        row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addcell();
}

function down() {
  var i, j, row;
  for (j = 0; j < size; j++) {
    for (i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addcell();
}
