import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Target';
import axios from 'axios';
import { Fraction, toTex, Expression, Equation } from 'algebra.js';
//import KatexComponent from 'react-katex-component';
import katex from 'katex';
import Formula from './Formula';
import Latex from 'react-latex';
const math = require('mathjs');
const MathJax = require('react-mathjax');



        // axios.get( 'http://localhost:3000/list' )
        //     .then( response => {
        //         console.log(response.data);
               
        //     } )
        //     .catch( error => {
        //         console.log(error);
                
        //     } );
    
class App extends Component {
	render() {

// evaluate expressions
//console.log(math.eval('log(e)'));

		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

		const listOne = [
		{ id: 1, text: <Formula tex={'2^6'}/>},
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
		const listFour = [
			
		];

		return (
			
			<div style={{...style}}>
				<Container id={1} list={listOne} />
				<Container id={2} list={listTwo} />
				<Container id={3} list={listThree} />
				<Container id={4} list={listFour}  />
			</div>
			
		);
	}
}

export default DragDropContext(HTML5Backend)(App);