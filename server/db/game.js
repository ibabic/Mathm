
function randomArguments () {
    const listArray1 = ["sin(30 deg)","sin(90 deg)","sin(150 deg)","sin(210 deg)","sin(270 deg)","sin(330 deg)",
"cos(60 deg)","cos(120 deg)","cos(180 deg)","cos(300 deg)","cos(360 deg)"];
const listArray2 = ['pi','pi^2','e','e^2']
const listArray3 = ['log(e)','log(e^2)'];

var getMeRandomElements = function(sourceArray, neededElements) {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
        result.push(sourceArray[Math.floor(Math.random()*sourceArray.length)]);
    }
    return result;
}

var randomElements1 = getMeRandomElements(listArray1, 3);
var randomElements2 = getMeRandomElements(listArray3, 1);
var randomElements3 = getMeRandomElements(listArray2, 2);;
var randomElements4 = `${Math.floor(Math.random() * 8)+1}/${Math.floor(Math.random() * 8)+1}`;
var randomElements5 = `${Math.floor(Math.random() * 4)+2}^${Math.floor(Math.random() * 4)}`;
var randomElements6 = `${Math.floor(Math.random() * 5)}!`;
var randomElements7 = `${Math.floor(Math.random() * 4)+1}^${Math.floor(Math.random() * 3)+1}`;
var randomElements8 = `${Math.floor(Math.random() * 2)+1}^${Math.floor(Math.random() * 5)+1}`;
var randomElements9 = `${Math.floor(Math.random() * 2)+1}^${Math.floor(Math.random() * 5)+1}-${Math.floor(Math.random() * 15)+1}`;
var randomElements10 = `${Math.floor(Math.random() * 3)+1}^${Math.floor(Math.random() * 4)+1}-${randomElements2[0]}`;
var randomElements11 = `${Math.floor(Math.random() * 3)+1}^${Math.floor(Math.random() * 4)+1}-${Math.floor(Math.random() * 5)}!`;
var randomElements12 = `${Math.floor(Math.random() * 5)}! * ${randomElements1[2]}`;
var randomElements13 = `${Math.floor(Math.random() * 4)+1}^${Math.floor(Math.random() * 3)+1} / ${Math.floor(Math.random() * 4)}!`;

var randomElements1rep = [];
randomElements1.forEach(element => {
	var str = null;
	str = element.replace("deg", "°").replace(/\s/g,'');
	randomElements1rep.push(str);
 });


 var randomElements2rep = [];
 randomElements2.forEach(element => {
 	var str = null;
	str = element.replace("log", "ln");
 	randomElements2rep.push(str);
  });

  var randomElements12rep = null;
  randomElements12rep = randomElements12.replace("deg", "°").replace(/\s/g,'');

 var randomElements10rep = null;
 randomElements10rep = randomElements10.replace("log", "ln");

  var randomArray = [{text: randomElements1rep[0], value: randomElements1[0]},{text: randomElements2rep[0], value: randomElements2[0]},{text: randomElements3[0], value: randomElements3[0]},{text: randomElements4, value: randomElements4},{text: randomElements5, value: randomElements5},{text: randomElements6, value: randomElements6},{text: randomElements7, value: randomElements7},{text: randomElements8, value: randomElements8},
  {text: randomElements9, value: randomElements9},{text: randomElements10rep, value: randomElements10}, {text: randomElements1rep[1], value: randomElements1[1]},
  {text: randomElements11, value: randomElements11}, {text: randomElements3[1], value: randomElements3[1]},
  {text: randomElements12rep, value: randomElements12}, {text: randomElements13, value: randomElements13}];

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
  var shuffleArray = shuffle(randomArray);
  return shuffleArray;
}
  module.exports = { randomArguments };