import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const style = {
	position: 'relative',
	border: '2px solid gray',
	padding: '0.5rem 1rem',
	margin: '.5rem',
	background: '#2193b0',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #6dd5ed, #2193b0)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #6dd5ed, #2193b0)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	cursor: 'pointer',
	hover: 'yellow',
	color: '#fff',
	textAlign: 'center',
	height: '75px'
};


class Card extends Component {

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div  style={{ ...style, opacity }}>
				{card.text}
			</div>
		));
	}
}

const cardSource = {

	beginDrag(props) {		
		return {			
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		// console.log(dropResult.listId);
		// console.log(item.listId);
		// console.log(props.dropID);

		if ( dropResult && dropResult.listId !== item.listId ) {
		
			props.removeCard(item.index);
		}
	},
	canDrag(props){
		if(!props.over){
			if(props.cardLen < 3){
				return false;
			}else{return true;}
		}
		else {
			return false;
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;	
		
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}	
	},
	canDrop(){
	return false;
	 }	
	
};

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);