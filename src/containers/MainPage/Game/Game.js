import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../../../components/Game/DnD';

class Game extends Component {
    render(){
        var arr = [];
        for (var key in this.props.user) {
             arr.push(this.props.user[key]);
        }
        let usr = null;
        if ( arr ) {
            usr = arr.map( user => (
                <form key={user.email}>
                <p>Total points: {user.points}</p>
                </form>
            ) )}
        return(
            <div>
                {usr}
                <p>Game</p>
                <App/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.game.user
    };
}

export default connect(mapStateToProps, null)(Game);