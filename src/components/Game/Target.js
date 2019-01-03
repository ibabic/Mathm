import React, { Component } from 'react';
import update from 'immutability-helper';
import Card from './Item';
import { DropTarget } from 'react-dnd';
import { Z_PARTIAL_FLUSH } from 'zlib';
const math = require('mathjs');

class Container extends Component {

	constructor(props) {
		super(props);		
		this.state = { cards: props.list, disable : false, trig: true };
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
			//return this.props.id;
			
	}

	

	render() {
		
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		//var canDrop = !this.state.disable ? true : false;
		//console.log(canDrop);
		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
			minHeight: "350px",
			height: "auto",
			border: '2px solid gray'
		};
		
		
		var res = null;
		//console.log(cards);
		if(cards.length !== 0){
			res = math.eval(cards[0].value);
			var cardsExOne = cards.slice().splice(1,cards.length -1);
			//console.log(cardsExOne);
			cardsExOne.forEach(card => {
					//console.log(res);
					switch(this.props.operation){
						case "+" : return res = res + math.eval(card.value);
						case "-" : return res = res - math.eval(card.value);
						case "*" : return res = res * math.eval(card.value);
						case "/" : return res = res / math.eval(card.value);
					}
				}); 
		}

		//const rez = this.props.Over ? res : null;
		//const backgroundColor = isActive ? 'lightgreen' : '#FFF';
		var backgroundColor = isActive && (cards.length < 5)  ? 'lightgreen' : '#FFF';
		if(cards.length > 4){backgroundColor = 'red', this.state.disable = true}
		if(cards.length < 3 ){backgroundColor = 'red'}
		if( this.state.disable &&  this.state.trig){this.canDrop(false); this.setState((this.state, {trig: false}));}
		if(cards.length < 5 && !this.state.trig){this.state.disable = false; this.canDrop(true); this.setState((this.state, {trig: true}));}
		// if(this.state.disable && this.state.trig ){this.canDrop(); this.setState((this.state, {
		// 	trig: false
		// }))}
		// console.log(this.props.Over);
		// console.log(res);
		// console.log(this.props.disable);
		// console.log(this.props.disabled);
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
							/>
							
					);
				})}
				<p>{this.props.Over ? res : null}</p>
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