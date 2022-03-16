let tableData = [];
let getTableData = () => {
  tableData = [
    ...Array.prototype.map.call(document.querySelectorAll("table "), function (
      table
    ) {
      if (table) {
        return Array.prototype.map.call(table.querySelectorAll("tr"), function (
          tr
        ) {
          if (tr) {
            return Array.prototype.map.call(
              tr.querySelectorAll("td input"),
              function (input) {
                if (input.value) {
                  return Number(input.value);
                }
              }
            );
          }
        });
      }
    })
  ];

  console.log(tableData);
};

const table3AddCells = (e) => {
  let tbl = document.querySelector("#table3");
  let a = tbl.querySelector(".calculate");

  let inpX = document.createElement("input");
  let inpY = document.createElement("input");
  let x = document.createElement("tr");
  let tdX = document.createElement("td");
  tdX.appendChild(inpX);
  let tdY = document.createElement("td");
  tdY.appendChild(inpY);
  x.appendChild(tdX);
  x.appendChild(tdY);
  a.before(x);
  getTableData();
};
const table3DelCells = (e) => {
  let b = e.target.closest("tr");
  b.parentElement.removeChild(b);

  getTableData();
};

let maxSize = 0;
const setTableSize = (e) => {
  maxSize = Math.min(tableData[0].length, tableData[1].length) - 2;
  if (tableData[2].length - 2 < maxSize) {
    table3AddCells(e);
  } else if (tableData[2].length - 3 > maxSize) {
    table3DelCells(e);
  }
};

const countData = (e) => {
  getTableData();
  setTableSize(e);
  let arr = [];

  const maxSize = Math.min(tableData[0].length, tableData[1].length) - 2;
  for (let i = 0; i < maxSize; i++) {
    arr.push([
      tableData[0][i + 1][0] + tableData[1][i + 1][0],
      tableData[0][i + 1][1] + tableData[1][i + 1][1]
    ]);
  }

  let tbl = document.querySelector("#table3");
  for (let i = 1; i < tbl.rows.length - 1; i++) {
    for (let j = 0; j < tbl.rows[i - 1].cells.length; j++)
      tbl.rows[i].cells[j].innerHTML =
        `<input value =` + `${arr[i - 1][j]}` + `>`;
  }
  getTableData();
};

//const buttonElem = document.querySelector("button.calculate");
//const onButtonClick = function (e) { countData();};

//buttonElem.addEventListener("click", onButtonClick);

Array.from(document.querySelectorAll("table")).forEach(function (e) {
  e.addEventListener("click", function (e) {
    if (e.target.matches("button.delete")) {
      let a = e.target.closest("tr");
      a.parentElement.removeChild(a);
      getTableData();
    } else if (e.target.matches("button.add")) {
      let a = e.target.closest("tr");
      let inpX = document.createElement("input");
      let inpY = document.createElement("input");

      let x = document.createElement("tr");
      let tdX = document.createElement("td");
      tdX.appendChild(inpX);
      let tdY = document.createElement("td");
      tdY.appendChild(inpY);
      let tdZ = document.createElement("button");
      tdZ.className = "delete";
      tdZ.appendChild(document.createTextNode("Delete"));

      x.appendChild(tdX);
      x.appendChild(tdY);
      x.appendChild(tdZ);
      a.before(x);
      getTableData();
    } else if (e.target.matches("button.calculate")) {
      countData(e);
      drawCanvas();
    }
  });
});

const drawCanvas = () => {
  let canvas = document.querySelector("#cnvs");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(20, 10);
  ctx.lineTo(20, 140);
  ctx.moveTo(20, 2);
  ctx.lineTo(18, 10);
  ctx.lineTo(23, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(20, 140);
  ctx.lineTo(300, 140);
  ctx.moveTo(303, 140);
  ctx.lineTo(290, 142);
  ctx.lineTo(290, 137);
  ctx.fill();
  ctx.stroke();

  // упростим массив данных графика
  let data = [
    [...tableData[2][1]],
    [...tableData[2][2]],
    [...tableData[2][3]],
    [...tableData[2][4]]
  ];
  console.log(data);

  let maxX = data.map((el) => el[0]);
  maxX = Math.max.apply(null, maxX);
  let gapX = (Math.ceil(maxX / 10) * 10) / 5;
  let maxY = data.map((el) => el[1]);
  maxY = Math.max.apply(null, maxY);
  let gapY = (Math.ceil(maxY / 10) * 10) / 5;
  console.log(maxX, maxY, gapX, gapY);

  // Цикл для отображения легенды по Y
  for (let i = 0; i < 6; i++) {
    ctx.lineWidth = 1.4;
    ctx.fillText((6 - i) * gapY, 2, i * 20 + 23);
    ctx.beginPath();
    ctx.moveTo(15, i * 20 + 20);
    ctx.lineTo(20, i * 20 + 20);
    ctx.stroke();
  }

  // Цикл для отображения легенды по X
  for (let i = 0; i < 6; i++) {
    ctx.fillText(gapX * i, 20 + i * 50, 150);
  }

  let sizeX = ((300 - 20) / 50) * 6;
  let sizeY = ((140 - 10) / 20) * 10;
  //Отрисовка линии
  for (let i = 0; i < data.length - 1; i++) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(
      20 + (data[i][0] / sizeX) * 280,
      140 - (130 * data[i][1]) / sizeY
    );
    ctx.lineTo(
      20 + (data[i + 1][0] / sizeX) * 280,
      140 - (130 * data[i + 1][1]) / sizeY
    );
    ctx.stroke();
    ctx.fill();
  }

  /*dobavka

var data = [
  {x: 50, y: 50, color: 'orange'},
  {x: 80, y: 88, color: 'green'},
  {x: 100, y: 50, color: 'red'},
  {x: 200, y: 90, color: 'red'},
];

var xMinValue = getMin(data, function(d){ return d.x; });
var xMaxValue = getMax(data, function(d){ return d.x; });
var yMinValue = getMin(data, function(d){ return d.y });
var yMaxValue = getMax(data, function(d){ return d.y });

var xAxisLength = width - 2 * margin;
var yAxisLength = height - 2 * margin;

var xAxisStart = 22;
var xAxisEnd = 255;
var yAxisStart = 3;
var yAxisEnd = 400;

//Определяем разницу значений величин по осям
var rangeValuesX = xAxisEnd - xAxisStart;
var rangeValuesY = yAxisEnd - yAxisStart;
//Определяем коэффициенты для нахождения координат значений по осям
var factorPositionX = xAxisLength / rangeValuesX;
var factorPositionY = yAxisLength / rangeValuesY;

createAxisLine(width, height, margin);
outputValuesAxis();
createLineGraph();


function createAxisLine(width, height, margin) {
  var indentAxis = 10;

  var xAxisX_1 = margin - indentAxis;
  var xAxisY_1 = margin;
  var xAxisX_2 = xAxisX_1;
  var xAxisY_2 = height - margin;

  var yAxisX_1 = margin;
  var yAxisY_1 = (height - margin) + indentAxis;
  var yAxisX_2 = width - margin;
  var yAxisY_2 = yAxisY_1;

  c.beginPath();
  c.moveTo(xAxisX_1, xAxisY_1);
  c.lineTo(xAxisX_2, xAxisY_2);
  c.stroke();

  c.beginPath();
  c.moveTo(yAxisX_1, yAxisY_1);
  c.lineTo(yAxisX_2, yAxisY_2);
  c.stroke();
}
function outputValuesAxis() {
  //Дефолтные величины
  var stepWidth = 50;
  var indent = 20;

  //Определяем количество шагов на каждой из оси
  var amountStepsX = Math.round(xAxisLength / stepWidth);
  var amountStepsY = Math.round(yAxisLength / stepWidth);
  //Определяем коэффициенты для нахождения значений по осям
  var factorValueX = rangeValuesX / amountStepsX;
  var factorValueY = rangeValuesY / amountStepsY;


  c.beginPath();
  c.font = "10px Arial";
  c.textAlign="center";
  c.textBaseline="top";

  for(var i = 0; i < amountStepsX; i++){
    var valueAxisX = Math.round(xAxisStart + i * factorValueX);
    var positionX = scaleX(valueAxisX);
    var positionY = (height - margin + indent);
    c.fillText(valueAxisX, positionX, positionY);
  }


  c.beginPath();
  c.font = "10px Arial";
  c.textAlign="end";
  c.textBaseline="middle";

  for(var i = 0; i < amountStepsY; i++){
    var valueAxisY = Math.round(yAxisStart + i * factorValueY);
    var positionX = margin - indent;
    var positionY = scaleY(valueAxisY);
    c.fillText(valueAxisY, positionX, positionY);
  }


}
function createLineGraph() {
  for(var i = 0; i < data.length; i++){
    if(i != data.length - 1){ // Если элемент не последний
      var currentX = data[i].x;
      var currentY = data[i].y;
      var nextX = data[i+1].x;
      var nextY = data[i+1].y;

      c.beginPath();
      c.moveTo(scaleX(currentX), scaleY(currentY));
      c.lineTo(scaleX(nextX), scaleY(nextY));
      c.strokeStyle = data[i].color;
      c.stroke();
    }
  }
}

function scaleX(value){
  return ((factorPositionX * value) + margin) - (xAxisStart * factorPositionX);
}
function scaleY(value){
  return (height - (factorPositionY * value) - margin) + (yAxisStart * factorPositionY);
}
function getMin(data, callback){
  var arr = [];
  for(var i in data) { arr.push(callback(data[i])); }
  return Math.min.apply(null, arr);
}
function getMax(data, callback){
  var arr = [];
  for(var i in data) { arr.push(callback(data[i])); }
  return Math.max.apply(null, arr);
}
}


*/
};
