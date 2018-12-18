import React, { Component } from 'react';
import update from 'immutability-helper';
import Card from './Item';
import { DropTarget } from 'react-dnd';
import Formula from './Formula';
import { Z_PARTIAL_FLUSH } from 'zlib';
const math = require('mathjs');

class Container extends Component {

	constructor(props) {
		super(props);		
		this.state = { cards: props.list };
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

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
			height: "404px",
			border: '1px dashed gray'
		};
		//var rez = this.props.Over ? res : null;
		
		var res = null;
		console.log(cards);
		if(cards.length !== 0){
			res = math.eval(cards[0].value);
			var cardsExOne = cards.slice().splice(1,cards.length -1);
			console.log(cardsExOne);
			cardsExOne.forEach(card => {
					console.log(res);
					switch(this.props.operation){
						case "+" : return res = res + math.eval(card.value);
						case "-" : return res = res - math.eval(card.value);
						case "*" : return res = res * math.eval(card.value);
						case "/" : return res = res / math.eval(card.value);
					}
				//	res = res + math.eval(card.value);
				}); 
		}
		// cards.forEach(card => {
		// 	res = math.eval(cards[0].value);
		// 	console.log(res);
		// 	switch(this.props.operation){
		// 		case "+" : return res = res + math.eval(card.value);
		// 		case "-" : return res = res - math.eval(card.value);
		// 		case "*" : return res = res * math.eval(card.value);
		// 		case "/" : return res = res / math.eval(card.value);
		// 	}
		// //	res = res + math.eval(card.value);
		// 	console.log(res);
		// 	console.log(Math.round( res * 10 ) / 10);
		// }); 

		
		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

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
							/>
							
					);
				})}
				<p>{res}</p>
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
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);