import React from 'react';
import Aux from '../../hoc/Auxx/Aux';
import classes from './MainPage.css';
import Game from './Game/Game';
import RangList from './RangList/RangList';
import Chat from './Chat/Chat';

const mainPage = (props) => {
    return (
        <Aux>
                <div className={classes.left}><Game /></div>
                <div className={classes.left}><Chat /></div>
                <div className={classes.right}><RangList /></div>
        </Aux>
    );
}


export default mainPage;