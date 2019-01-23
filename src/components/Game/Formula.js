import * as React from 'react';
import MathJax from 'react-mathjax';


class Formula extends React.Component{
   
    render() {
        return (
            <MathJax.Provider>
                <div>
                    <MathJax.Node formula={this.props.tex}/>
                </div>
            </MathJax.Provider>
        );
    }
}

export default Formula;