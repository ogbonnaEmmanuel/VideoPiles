import React from 'react';
import './middle_bar.css';
import UploadBar from "./upload_bar";

class MiddleBar extends React.Component {
    render() {
        return (
            <div id="middle_bar">
                <div id="upload_area">
                    <div className="rule_container">
                        <p className="rule_box"/>
                        <p className="rule_text">max division (5) </p>
                    </div>
                    <div className="rule_container">
                        <p className="rule_box"/>
                        <p className="rule_text">max file size 5mb</p>
                    </div>
                    <div className="rule_container">
                        <p className="rule_box"/>
                        <p className="rule_text">file type (mp4,mpeg-4)</p>
                    </div>
                    <UploadBar/>
                </div>
            </div>
        )
    }
}

export default MiddleBar