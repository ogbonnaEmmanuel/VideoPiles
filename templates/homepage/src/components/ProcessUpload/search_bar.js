import React from 'react';
import './search_bar.css';
import {connect} from 'react-redux';

class SearchBar extends React.Component {
    handleVideoPileInput = (e) => {
        let value = e.target.value;
        this.props.update_pile_input(value);
    }

    render() {
        return (
            <div id="search_bar">
                <form id="search_form">
                    <input type="number" id="search_area" onKeyUp={this.handleVideoPileInput}
                           placeholder="INPUT THE NUMBER OF PILES"/>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        update_pile_input: (pile_input) => dispatch({
            type: 'pile_input',
            pile_input
        })
    }
}
export default connect(null, mapDispatchToProps)(SearchBar)