import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Target';
import { Fraction, toTex, Expression, Equation } from 'algebra.js';
//import KatexComponent from 'react-katex-component';
import katex from 'katex';
import Latex from 'react-latex';
const math = require('mathjs');




class App extends Component {
	
	
	render() {

	  
var expr = new Expression("x");
expr = expr.multiply(2);
expr = expr.multiply("x");
expr = expr.add("y");
expr = expr.add(new Fraction(1, 3));

console.log(expr.toString());

var answer1 = expr.eval({x: 2});
var answer2 = expr.eval({x: 2, y: new Fraction(3, 4)});

console.log(answer1.toString());
console.log(answer2.toString());



		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

		const listOne = [
			{ id: 1, text: toTex(answer2) },
			{ id: 2, text: " 2" },
			{ id: 3, text: " 3" }
		];

		const listTwo = [
			{ id: 4, text: " 4" },
			{ id: 5, text: " 5" },
			{ id: 6, text: " 6" }
		];

		const listThree = [
			{ id: 7, text: " 7" },
			{ id: 8, text: " 8" },
			{ id: 9, text: " 9" }
		];



		return (
			
			<div style={{...style}}>
				<Latex>{toTex(expr)}</Latex>
				<Container id={1} list={listOne} />
				<Container id={2} list={listTwo} />
				<Container id={3} list={listThree} />
			</div>
			
		);
	}
}

export default DragDropContext(HTML5Backend)(App);