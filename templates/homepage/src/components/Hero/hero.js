import React from 'react';
import './hero.css';
import Logo from "../Logo/logo";


const Hero = () => {
    return (
        <div id="hero">
            <div id="hero_container">
                <div id="logo_aligner">
                    <Logo logo_id={"hero_logo"}/>
                </div>
                <p id="hero_text">CUT YOUR LONG VIDEOS INTO PILES</p>
                <div id="bar_guide"/>
            </div>
        </div>
    )
}
export default Hero