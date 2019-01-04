import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Target';
import axios from 'axios';
import Formula from './Formula';
import Countdown from 'react-countdown-now';
import Modernizr from 'browsernizr';
import TouchBackend from 'react-dnd-touch-backend';
const math = require('mathjs');
const MathJax = require('react-mathjax');


const listArray1 = ["sin(30 deg)","sin(90 deg)","sin(150 deg)","sin(210 deg)","sin(270 deg)","sin(330 deg)",
"cos(60 deg)","cos(120 deg)","cos(180 deg)","cos(300 deg)","cos(360 deg)"];
const listArray2 = ['pi','pi^2','e','e^2']
const listArray3 = ['log(e)','log(e^2)'];
//const listArray3 = [`${Math.floor(Math.random() * Math.floor(4)+2)}!`, '',''];

//var randomItem1 = listArray1[Math.floor(Math.random()*listArray1.length)];
//var randomItem2 = listArray2[Math.floor(Math.random()*listArray2.length)];
// console.log(randomItem1);
 //console.log(listArray3);

var getMeRandomElements = function(sourceArray, neededElements) {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
        result.push(sourceArray[Math.floor(Math.random()*sourceArray.length)]);
    }
    return result;
}
// // const lista = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
// // for(var i=0; i<100; i ++){
// // 	var randomlista = getMeRandomElements(lista,10);
// // 	console.log(randomlista);
// // }
// var randomlista = getMeRandomElements(lista,10);
// console.log(randomlista);
var randomElements1 = getMeRandomElements(listArray1, 5);
var randomElements2 = getMeRandomElements(listArray2, 3);
var randomElements3 = getMeRandomElements(listArray3, 2);;
var randomElements4 = `${Math.floor(Math.random() * 8)+1}/${Math.floor(Math.random() * 8)+1}`;
var randomElements5 = `${Math.floor(Math.random() * 4)+2}^${Math.floor(Math.random() * 4)}`;
var randomElements6 = `${Math.floor(Math.random() * 5)}!`;
var randomElements7 = `${Math.floor(Math.random() * 4)+1}^${Math.floor(Math.random() * 3)+1}`;
var randomElements8 = `${Math.floor(Math.random() * 2)+1}^${Math.floor(Math.random() * 5)+1}`;
var randomElements9 = `${Math.floor(Math.random() * 2)+1}^${Math.floor(Math.random() * 5)+1}-${Math.floor(Math.random() * 15)+1}+${randomElements3[1]}`;
console.log(randomElements1);
console.log(randomElements2);
console.log(randomElements3);
console.log(randomElements4);
console.log(randomElements5);
console.log(randomElements6);

var randomElements1rep = [];
randomElements1.forEach(element => {
	var str = null;
	str = element.replace("deg", "°").replace(/\s/g,'');
	randomElements1rep.push(str);
 });
console.log(randomElements1rep);

 var randomElements2rep = [];
 randomElements3.forEach(element => {
 	var str = null;
	str = element.replace("log", "ln");
 	randomElements2rep.push(str);
  });
  console.log(randomElements2rep[0]);




        // axios.get( 'http://localhost:3000/list' )
        //     .then( response => {
        //         console.log(response.data);
               
        //     } )
        //     .catch( error => {
        //         console.log(error);
                
        //     } );
    
class App extends Component {
	constructor(props) {
		super(props);

		//this.toggle = this.toggle.bind(this);
		this.state = {
			Over: false,
			touched: true,
			disable1:true,
			disable2:true,
			disable3:true,
			disable4:true,
			value1: null,
			value2: null,
			value3: null,
			value4: null,
		};
		this.getData = this.getData.bind(this);
		this.getValue = this.getValue.bind(this);
	}
	
	
	getData(value, ft){
		switch(value){
			case 1: this.setState((this.state, {disable1: ft})); 	break;
			case 2: this.setState((this.state, {disable2: ft}));	break;
			case 3: this.setState((this.state, {disable3: ft}));	break;
			case 4: this.setState((this.state, {disable4: ft}));	break;
		}
	}	
	getValue(value, ft){
		console.log('Inside getValue',value,ft);
		switch(value){
			case 1: this.setState((this.state, {value1: ft})); 	break;
			case 2: this.setState((this.state, {value2: ft}));	break;
			case 3: this.setState((this.state, {value3: ft}));	break;
			case 4: this.setState((this.state, {value4: ft}));	break;
		}
	}	

	render() {

//console.log(math.eval('log(e)'));
		console.log(this.state.value1);
		console.log(this.state.value2);
		console.log(this.state.value3);
		console.log(this.state.value4);
		if(this.state.Over){
		var resultArray = [];
		resultArray.push(this.state.value1, this.state.value2, this.state.value3, this.state.value4);
		console.log('resultArray', resultArray);
		resultArray.sort( function(a,b) { return b - a; } );
		console.log('resultArraysort', resultArray);
		var result = resultArray[0] - resultArray [3];
		console.log(result);
		}
		

const style = {
	display: "flex",
	justifyContent: "start",
	paddingTop: "20px",
	flexWrap: "wrap",
	marginBottom: "20px"
}

		const listOne = [
		{ id: 1, text: <Formula tex={randomElements5}/>, value: randomElements5}, 
			{ id: 2, text: <Formula tex={randomElements4}/>, value: randomElements4 },
			{ id: 3, text: <Formula tex={randomElements2rep[0]}/>, value: randomElements3[0] },
			{ id: 4, text: <Formula tex={randomElements2rep[0]}/>, value: randomElements3[0] }
		];

		const listTwo = [
			{ id: 5, text: <Formula tex={randomElements2[0]}/>, value: randomElements2[0] },
			{ id: 6, text: <Formula tex={randomElements1rep[0]}/>, value: randomElements1[0] },
			{ id: 7, text: " 6", value: 6},
			{ id: 8, text: <Formula tex={randomElements2rep[0]}/>, value: randomElements3[0] }
		];

		const listThree = [
			{ id: 9, text: <Formula tex={randomElements8}/>, value: randomElements8 },
			{ id: 10, text: <Formula tex={randomElements7}/>, value: randomElements7},
			{ id: 11, text: <Formula tex={randomElements6}/>, value: randomElements6},
			{ id: 12, text: <Formula tex={randomElements2rep[0]}/>, value: randomElements3[0] }
		];
		const listFour = [
			{ id: 12, text: <Formula tex={randomElements9}/>, value: randomElements9 },
			{ id: 14, text: <Formula tex={randomElements7}/>, value: randomElements7},
			{ id: 15, text: <Formula tex={randomElements6}/>, value: randomElements6},
			{ id: 16, text: <Formula tex={randomElements2rep[0]}/>, value: randomElements3[0] }
		];
		
	const renderer = ({ seconds, completed }) => {
	var divStyle = {
		color: 'black',
		backgroundImage: 'lightgreen',
	  };
	if(seconds < 5)
	{ 
	  divStyle.color = 'red';
	}
	return <h1 style={divStyle}>{seconds}</h1>;
  
};

const renderer2 = ({ seconds }) => {
	  // Render a countdown
	  var divStyle = {
		color: 'green',
		backgroundImage: 'lightgreen',
	  };
	  
	  return <h4 style={divStyle}>Time is up!! New game for: {seconds}</h4>;
	
};
		
		return (
			<div>
				{this.state.touched ? <Countdown date={ Date.now() + 10000} renderer={renderer}  onComplete={() => this.setState((this.state, {
				Over: true,
				touched: false 
			}))}/> : null}
			{!this.state.touched  ? <Countdown date={ Date.now() + 20000} renderer={renderer2} onComplete={() => this.setState((this.state, {
				Over: false,
				touched: true 
			}))}/> : null}
			<div style={{...style}}>
			<div>
			+<Container id={1} list={listOne} Over={this.state.Over} operation={"+"} drop={this.state.disable1} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue}/>
			</div>
			<div>
			-<Container id={2} list={listTwo} Over={this.state.Over} operation={"-"} drop={this.state.disable2} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue}/>
			</div>	
			<div>
			*<Container id={3} list={listThree} Over={this.state.Over} operation={"*"} drop={this.state.disable3} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue}/>
			</div>
			<div>
			/<Container id={4} list={listFour}  Over={this.state.Over} operation={"/"} drop={this.state.disable4} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue}/>
			</div>
			
			</div>
			<div>{this.state.Over ? `you got ${result} points` : null}</div>
			</div>
			
		);
	}
}

export default DragDropContext(Modernizr.touchevents ? TouchBackend : HTML5Backend)(App);