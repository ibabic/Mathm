import React from 'react';

import classes from './Footer.css';

const footer = (props) => (
    
    <footer className={classes.footer}>

    <div className={classes.left}>

        <h3>Mathmind<span>logo</span></h3>

        <p className={classes.links}>
            <a href="/">Home</a>
            -  
            <a href="/about">About</a>
            -    
            <a href="/contact">Contact</a>
        </p>

        <p className={classes.companyname}>FESB &copy; 2018</p>
    </div>

    <div className={classes.center}>

        <div>
            <i className="fa fa-map-marker"></i>
            <p><span>Split 3</span> Split, Croatia</p>
        </div>

        <div>
            <i className="fa fa-phone"></i>
            <p>0958067635</p>
        </div>

        <div>
            <i className={classes.faenvelope}></i>
            <p><a href="mailto:mathmind@gmail.com">mathmind@gmail.com</a></p>
        </div>

    </div>

    <div className={classes.right}>

        <p className={classes.companyabout}>
            <span>Report bug</span>
            You have notice a bug? Report it to mathmind@gmail.com!
        </p>

        <div className={classes.icons}>

            <a href="http://www.facebook.com"><i className="fa fa-facebook"></i></a>
            <a href="http://www.twitter.com"><i className="fa fa-twitter"></i></a>
            <a href="http://www.linkedin.com"><i className="fa fa-linkedin"></i></a>
            <a href="http://www.github.com"><i className="fa fa-github"></i></a>

        </div>

    </div>

</footer>	
);

export default footer;