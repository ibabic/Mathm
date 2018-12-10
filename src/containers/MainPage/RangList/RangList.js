import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxx/Aux';
import { Table } from 'reactstrap';
import classes from './RangList.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class RangList extends Component {
    componentWillMount () {
        this.props.onRangListLoad();
    }
    
    render(){
        console.log(this.props.players);
        var arr = [];
        for (var key in this.props.players) {
             arr.push(this.props.players[key]);
        }
        console.log(arr);
        arr.sort((a,b) => b.points - a.points);
        console.log(arr[0]);
        let play = null;
        if ( arr ) {
            play = arr.map( player => (
                <tr key={player.email}>
                <th scope="row">{arr.indexOf(player)+1}</th>
                <td>{player.username}</td>
                <td >{player.points}</td>
                </tr>
            ) )
        } 

        let showPlayers = null;
        this.props.players ? showPlayers = play : showPlayers = <Spinner />
        
        return(
            <Aux>
            <Table className={classes.id} striped dark  hover>
                  <thead>
                      <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Points</th>
                      </tr>
                  </thead>
                  </Table>
                  <div className={classes.div}> 
                  <Table  striped dark  hover>
                  <tbody>
                    {showPlayers}
                  </tbody>
                  </Table>
                  </div>
                  </Aux>);
            }
    }

const mapStateToProps = state => {
    return {
        players: state.rang.players,
        error: state.rang.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onRangListLoad: () => dispatch(actions.rangList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RangList);