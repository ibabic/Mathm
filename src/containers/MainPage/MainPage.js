import React from 'react';
import classes from './MainPage.css';
import Game from './Game/Game';
import RangList from './RangList/RangList';
import Chat from './Chat/Chat';

const mainPage = (props) => {
    return (
        <div className={classes.all}>
                <div className={classes.lefttop}><Game /></div>
            <div>
                <div className={classes.right}><RangList /></div>
                <div className={classes.leftbottom}><Chat /></div>
            </div>
                
        </div>
    );
}


export default mainPage;