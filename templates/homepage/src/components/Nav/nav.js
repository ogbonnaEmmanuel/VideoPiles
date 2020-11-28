import React from 'react';
import './nav.css';
import Logo from "../Logo/logo";

const Nav = () => {
    return (
        <nav>
            <div id="logo">
                <Logo logo_id={'logo_img'}/>
            </div>
            <div id="pile_log">
                <div id="pile_container">
                    <div className="pile" id="first_pile"/>
                    <div className="pile" id="second_pile"/>
                    <div className="pile" id="third_pile"/>
                    <div className="pile" id="fourth_pile"/>
                    <div className="pile" id="fifth_pile"/>
                </div>
            </div>
        </nav>
    )
}
export default Nav