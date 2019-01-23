import React, { Component } from 'react';
import update from 'immutability-helper';
import Card from './Item';
import { DropTarget } from 'react-dnd';
import classes from './Target.css';
const math = require('mathjs');

class Container extends Component {

	constructor(props) {
		super(props);		
		this.state = { cards: props.list, disable : false, trig: true, trigValue: true };
	}

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {		
		
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;		
		const dragCard = cards[dragIndex];
		
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
	}
	canDrop (ft)  {
			this.props.disable(this.props.id, ft);
	}
	returnResult (res)  {
		this.props.value(this.props.id, res);
}

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
			minHeight: "350px",
			height: "500px",
			border: '2px solid gray'
		};

		const style2 = {
				marginTop: "50px",
			  position:"relative",
			  textAlign : "center",
			  color: "#00008B",
			  fontSize: "150%",
		};
		
		
		var res = null;
		if(cards.length !== 0){
			res = math.eval(cards[0].value);
			var cardsExOne = cards.slice().splice(1,cards.length -1);
			cardsExOne.forEach(card => {		
					switch(this.props.operation){
						case "+" : return res = res + math.eval(card.value);
						case "-" : return res = res - math.eval(card.value);
						case "*" : return res = res * math.eval(card.value);
						case "/" : return res = res / math.eval(card.value);
						default: return res;
					}
				}); 
		}
		var visibility = (this.props.time < 2) ? 'hidden' : 'visible';
		var backgroundColor = isActive && (cards.length < 5)  ? 'lightgreen' : '#FFF';
		if(cards.length > 4){backgroundColor = 'red', this.state.disable = true}
		if(cards.length < 3 ){backgroundColor = 'red'}
		if( this.state.disable &&  this.state.trig){this.canDrop(false); this.setState((this.state, {trig: false}));}
		if(cards.length < 5 && !this.state.trig){this.state.disable = false; this.canDrop(true); this.setState((this.state, {trig: true}));}
		if(this.props.Over && this.state.trigValue){
			this.returnResult(res.toFixed(3));
			this.state.trigValue = false;
			this.canDrop(true);
		}
		if(!this.props.Over){this.state.trigValue = true;}

		return connectDropTarget(
			<div style={{...style, backgroundColor}}>
				{cards.map((card, i) => {
					return (
						<Card 
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}														
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)}
							drop={this.props.drop}
							cardLen={cards.length}
							over={this.props.Over}
							/>
							
					);
				})}
				<p style={{...style2, visibility}}>{this.props.Over ? res.toFixed(3) : null}</p>
			</div>
		);
  }
}

const cardTarget = {
	drop(props, monitor, component ) {
		const  {id}  = props;
		const sourceObj = monitor.getItem();	
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	},
	canDrop(props, monitor){
		const  {id}  = props;
		const sourceObj = monitor.getItem();
		if ( id === sourceObj.listId ){return true}
		else{
		if(props.drop === true){
			return true;
		}
		else{return false;}}

	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);