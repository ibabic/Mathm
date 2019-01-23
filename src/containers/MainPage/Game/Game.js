import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../../../components/Game/DnD';
import classes from './Game.css';

class Game extends Component {
    render(){
        var arr = [];
        for (var key in this.props.user) {
             arr.push(this.props.user[key]);
        }
        //console.log(arr);
        let usr = null;
        if ( arr ) {
            usr = 
                <form >
                <p className={classes.points__label}>Total points: {arr[2]}</p>
                </form>
            }
        return(
            <div>
                {usr}
                <App/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.game.user,
    };
}

export default connect(mapStateToProps, null)(Game);