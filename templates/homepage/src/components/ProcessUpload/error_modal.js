import React from "react";
import './error_modal.css';
import {connect} from 'react-redux';


class ErrorModal extends React.Component {
    CloseErrorModal = ()=>{
        this.props.close_error_modal(false,'');
    }
    componentDidMount() {
        let counter_id = document.getElementById('error_counter');
        let counter = 0;
        let count_interval = setInterval(()=>{
            counter += 1;
            counter_id.textContent = counter
            if(counter === 5){
                clearInterval(count_interval);
                window.location.reload(false);
            }
        },1000)
    }

    render() {
        return (
            <div id="myModal" className="error_modal">
                <div className="error_container">
                    <div className="error_content">
                        <p className="material-icons center_element error_icon">
                            warning
                        </p>
                        <p className="center_element" id="snap_text">
                            oh snap!
                        </p>
                        <p className="center_element" id="error_text">
                            {this.props.error_msg}
                        </p>
                        <div className="dismiss_counter_container">
                            <div className="dismiss_counter">
                                <p id="error_counter">1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        error_msg: state.error_state.message
    }
}
const mapDispatchToProps = (dispatch =>{
   return {
    close_error_modal:(error_state,error_msg)=>{dispatch({
        type:'error_state',
        error_state,
        error_msg
    })}
   }
})
export default connect(mapStateToProps,mapDispatchToProps)(ErrorModal)