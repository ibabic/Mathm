import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Target';
import axios from 'axios';
import Formula from './Formula';
import Modernizr from 'browsernizr';
import TouchBackend from 'react-dnd-touch-backend';
import io from 'socket.io-client';
import Spinner from '../UI/Spinner/Spinner.js'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './DnD.css';
const socket = io('http://localhost:3000');

socket.on('connect', function () {
	console.log('connected to server');
});
function setArguments (cb){
socket.on('listArguments', data => cb(null,data));
}
function removeArguments (cb){
	socket.on('removeArguments', data => cb(null,data));
	}

function setTimer (cb){
	socket.on('counter', data => cb(null, data));
}
function saveResult (result) {
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	const authData = {
		token: token,
		userId: userId,
		result: result
	};
  axios.post('http://localhost:3000/results', authData )
  .then( response => {
	 //console.log('axios result response', response);
  } )
  .catch( error => {
	  //console.log(error);
  } );}

class App extends Component {
	constructor(props) {
		super(props);

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
			timer: null,
			arguments: [],
			setDisable:false,
			firstGame: false,
			rangListLoad: true,
			userPointsLoad: true,
			setUserPoints: true
		};
		this.getData = this.getData.bind(this);
		this.getValue = this.getValue.bind(this);
		setTimer((err, data) => {
			this.setState((this.state, {
				timer: data.timer,
				Over: data.over
			})); 
		});
		setArguments((err, data) => {
				this.setState((this.state, {
					arguments: data
				})); 
		});
		removeArguments((err, data) => {
			this.setState((this.state, {
				arguments: data
			})); 
		});
	}
	
	getData(value, ft){
		switch(value){
			case 1: this.setState((this.state, {disable1: ft})); 	break;
			case 2: this.setState((this.state, {disable2: ft}));	break;
			case 3: this.setState((this.state, {disable3: ft}));	break;
			case 4: this.setState((this.state, {disable4: ft}));	break;
			default: return;
		}
	}	
	getValue(value, ft){
		switch(value){
			case 1: this.setState((this.state, {value1: ft})); 	break;
			case 2: this.setState((this.state, {value2: ft}));	break;
			case 3: this.setState((this.state, {value3: ft}));	break;
			case 4: this.setState((this.state, {value4: ft}));	break;
			default: return;
		}
	}	


	render() {
	//console.log(this.state.arguments);
		if(!this.state.Over && !this.state.rangListLoad){
		this.setState((this.state, {rangListLoad: true, userPointsLoad: true, setUserPoints: true}));}
		
		if(this.state.Over){
		var resultArray = [];
		resultArray.push(this.state.value1, this.state.value2, this.state.value3, this.state.value4);
		resultArray.sort( function(a,b) { return b - a; } );
		var res =resultArray[0] - resultArray[3];
		var result = 0;
		if(this.state.firstGame){
			if (res > 100){result = 0;}
			else {result = 100 - res;}
		}
		if(this.props.user){
			if(this.state.arguments[1] && this.state.setUserPoints && this.state.timer < 10){
				console.log(result);
					saveResult(result.toFixed(3));
				this.setState((this.state, {setUserPoints: false}));
			}
			if(this.state.userPointsLoad && this.state.timer <9 ){
				this.props.onChecPointskState();
				this.setState((this.state, {userPointsLoad: false}));
			}
		}
		if(this.state.rangListLoad && this.state.timer <9 ){
		this.props.onRangListLoad();
		this.setState((this.state, {rangListLoad: false}));}
		}
		if(this.state.arguments[1]){
			setTimeout(() => {
				this.setState((this.state, {firstGame: true}));
			},2000);
		}
		
		
	
	const style = {
	display: "flex",
	justifyContent: "start",
	paddingTop: "20px",
	flexWrap: "wrap",
	marginBottom: "20px"
	}

		const listOne = [
			
		{ id: 1, text: <Formula tex={this.state.arguments[0] ? this.state.arguments[0].text :null}/>, value: this.state.arguments[0] ?  this.state.arguments[0].value : null}, 
			{ id: 2, text: <Formula tex={this.state.arguments[1] ? this.state.arguments[1].text :null}/>, value: this.state.arguments[1] ?  this.state.arguments[1].value : null },
			{ id: 3, text: <Formula tex={this.state.arguments[2] ? this.state.arguments[2].text :null}/>, value: this.state.arguments[2] ?  this.state.arguments[2].value : null },
			{ id: 4, text: <Formula tex={this.state.arguments[3] ? this.state.arguments[3].text :null}/>, value: this.state.arguments[3] ?  this.state.arguments[3].value : null }
		];

		const listTwo = [
			{ id: 5, text: <Formula tex={this.state.arguments[4] ? this.state.arguments[4].text :null}/>, value: this.state.arguments[4] ?  this.state.arguments[4].value : null },
			{ id: 6, text: <Formula tex={this.state.arguments[5] ? this.state.arguments[5].text :null}/>, value: this.state.arguments[5] ?  this.state.arguments[5].value : null },
			{ id: 7, text: <Formula tex={this.state.arguments[6] ? this.state.arguments[6].text :null}/>, value: this.state.arguments[6] ?  this.state.arguments[6].value : null},
			{ id: 8, text: <Formula tex={this.state.arguments[7] ? this.state.arguments[7].text :null}/>, value: this.state.arguments[7] ?  this.state.arguments[7].value : null }
		];

		const listThree = [
			{ id: 9, text: <Formula tex={this.state.arguments[8] ? this.state.arguments[8].text :null}/>, value: this.state.arguments[8] ?  this.state.arguments[8].value : null },
			{ id: 10, text: <Formula tex={this.state.arguments[9] ? this.state.arguments[9].text :null}/>, value: this.state.arguments[9] ?  this.state.arguments[9].value : null },
			{ id: 11, text: <Formula tex={this.state.arguments[10] ? this.state.arguments[10].text :null}/>, value: this.state.arguments[10] ?  this.state.arguments[10].value : null },
			{ id: 12, text: <Formula tex={this.state.arguments[11] ? this.state.arguments[11].text :null}/>, value: this.state.arguments[11] ?  this.state.arguments[11].value : null  }
		];
		const listFour = [
			{ id: 13, text: <Formula tex={this.state.arguments[12] ? this.state.arguments[12].text :null}/>, value: this.state.arguments[12] ?  this.state.arguments[12].value : null  },
			{ id: 14, text: <Formula tex={this.state.arguments[13] ? this.state.arguments[13].text :null}/>, value: this.state.arguments[13] ?  this.state.arguments[13].value : null },
			{ id: 15, text: <Formula tex={this.state.arguments[14] ? this.state.arguments[14].text :null}/>, value: this.state.arguments[14] ?  this.state.arguments[14].value : null },
			{ id: 16, text: <Formula tex={this.state.arguments[8] ? this.state.arguments[8].text :null}/>, value: this.state.arguments[8] ?  this.state.arguments[8].value : null  }
		];
		
	const renderer = ( seconds ) => {
	var divStyle = {
		color: 'black',
		backgroundImage: 'lightgreen' };
	if(seconds < 5)
	{  divStyle.color = 'red'; }
	return <h1 style={divStyle}>{seconds}</h1>;};

	const renderer2 = ( seconds ) => {
	  var divStyle = {
		color: 'green',
		backgroundImage: 'lightgreen' };
	  return <h4 style={divStyle}>Time is up!! New game for: {seconds}</h4>;};
		

		return (
			<div>
			{!this.state.Over ?  renderer(this.state.timer) : null}
			{this.state.Over ?  renderer2(this.state.timer) : null}
				
			{ this.state.arguments[5] ?
			(<div style={{...style}}>  
			<div>
			<div className={classes.operator}>+</div><Container id={1} list={listOne} Over={this.state.Over} operation={"+"} drop={this.state.disable1} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue} time={this.state.timer}/> 
			</div>
			<div>
			<div className={classes.operator}>-</div><Container id={2} list={listTwo} Over={this.state.Over} operation={"-"} drop={this.state.disable2} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue} time={this.state.timer}/>
			</div>	
			<div>
			<div className={classes.operator}>*</div><Container id={3} list={listThree} Over={this.state.Over} operation={"*"} drop={this.state.disable3} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue} time={this.state.timer}/>
			</div>
			<div>
			<div className={classes.operator}>/</div><Container id={4} list={listFour}  Over={this.state.Over} operation={"/"} drop={this.state.disable4} disable={this.getData} disabledID={this.state.disabledID} value={this.getValue} time={this.state.timer}/>
			</div>
			</div>) 
			: <Spinner />}  
			<div className={classes.zindex}>{this.state.Over && this.state.firstGame ? `you got ${result.toFixed(3)} points` : null}</div>
			</div>
			
		);
	}
}
const mapStateToProps = state => {
    return {
        user: state.game.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
		onRangListLoad: () => dispatch(actions.rangList()),
		onChecPointskState: () => dispatch(actions.ChecPointskState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(Modernizr.touchevents ? TouchBackend : HTML5Backend)(App));