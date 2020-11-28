import React from 'react';
import './logo.css';

class Logo extends React.Component {

    render() {
        return (
            <div className="main_logo" id={this.props.logo_id}>
                <p>VIDEOPILE</p>
                <p className="material-icons icon_play">play_circle_filled</p>
            </div>
        )
    }
}

export default Logo