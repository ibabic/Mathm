import * as React from 'react';
import ReactDOM from 'react-dom';
import MathJax from 'react-mathjax';
import { Fraction, toTex, Expression, Equation } from 'algebra.js';

const tex = `\\ln e^2 * 6`;

class Formula extends React.Component{
    render() {
        return (
            <MathJax.Provider>
                <div>
                    
                    <MathJax.Node inline formula={'a = b'} />
                   
                    <MathJax.Node formula={tex} />
                </div>
            </MathJax.Provider>
        );
    }
}

export default Formula;