import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxx/Auxx';
import NavBar from '../../components/Navigation/navigationBar';
import Footer from '../../components/Footer/footer';
import * as actions from '../../store/actions/index';


class Layout extends Component {
    
    render () {
        return (
            <Aux>
                <NavBar isAuth={this.props.isAuthenticated}/>
                <main onClick={ this.props.open ? this.props.onToggle : null}>
                    {this.props.children}
                </main>
                <Footer/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        open: state.game.isOpen
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onToggle: () => dispatch(actions.toggle())
    }
  };

export default connect(mapStateToProps,mapDispatchToProps)(Layout);