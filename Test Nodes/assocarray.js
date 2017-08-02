var data;
var poems = [];
var genArr = [];
var lineArray = [];


function preload() {
  data = loadJSON("poetry.json");
}

function setup() {
  var button = select('#generate');
  var button2 = select('#randomize');
  button.mousePressed(generate);
  button2.mousePressed(randomize);
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    poems.push(data[i]);
  }
  paragraph = select('#poem');
  randomP = select('#randomPoem');

  for (var i = 0; i < poems.length; i++) {
    for (var j = 0; j < poems[i].lines.length; j++) {
      lineArray.push(poems[i].lines[j])
    }
  }

  noCanvas();
}

function generate() {

  genArr = [];
  var text = '';
  var initialP = random(poems);
  for (var i = 0; i < initialP.lines.length; i++) {
    genArr.push(initialP.lines[i]);
    text += initialP.lines[i] + "<br>";
  }
  paragraph.html(text);

}

function randomize() {

  var randomArray = [];

  for (var i = 1; i < 13; i += 2) {
    console.log(i)
    randomArray.push(genArr[i - 1]);

    var words = genArr[i];
    var split = words.split(' ');
    var final = split[split.length - 1].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase().slice(-3);
    //console.log(final)

    filteredLines = lineArray.filter(function(x) {
      var split2 = x.split(' ');
      var final2 = split2[split2.length - 1].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
      //console.log(final2);
      if (final2.length > 4) {
        var check = final2.slice(-4);
      } else {
        var check = final2.slice(-3);
      }
      //console.log(final2);
      //console.log(check);
      return check.includes(final);
    })
    //console.log(filteredLines);
    chooseRandom();
  }
  //console.log(randomArray);
  function chooseRandom() {
    var randomLine = random(filteredLines);
    if (randomLine) {
      if (filteredLines.length == 1) {
        randomArray.push(genArr[i]);
      } else if (randomLine !== genArr[i] && !genArr.indexOf(randomLine) === false) {
        randomArray.push(randomLine);
      } else {
        chooseRandom();
      }
    }
  }

  randomArray.push(genArr[genArr.length - 2])
  randomArray.push(genArr[genArr.length - 1])
  console.log(randomArray)

  var ranText = '';

  for (var i = 0; i < randomArray.length; i++) {
    ranText += randomArray[i] + "<br>";
  }
  randomP.html(ranText)
}
