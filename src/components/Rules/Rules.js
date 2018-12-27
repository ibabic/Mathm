import React from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import classes from './rules.css';

const rules = (props) => {
    return (
        <Aux>
            <div className={classes.rules__wrapper}>
                <div>Rules</div>
            </div>     
        </Aux>
    );
}


export default rules;