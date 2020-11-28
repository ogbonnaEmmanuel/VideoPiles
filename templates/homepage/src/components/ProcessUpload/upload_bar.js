import React from 'react';
import {css} from "@emotion/core";
import {HashLoader} from "react-spinners";
import './upload_bar.css';
import {VALIDATE_VIDEO} from "./utils";
import {connect} from 'react-redux';
import ErrorModal from "./error_modal";


const override = css`
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
`;

class UploadBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(props);
        this.processAnimation = this.processAnimation.bind(props);
        this.state = {
            loading: false,
            zip_file_path: "",
            upload_feedback: 'UPLOAD YOUR VIDEO'
        }
    }

    processAnimation = (process_type) => {
        let upload_icon = document.getElementById('file_label');
        let download_icon = document.getElementById('download_icon');
        if (process_type === true) {
            upload_icon.style.display = 'none';
            this.setState({loading: true})
        } else {
            upload_icon.style.display = 'none';
            this.setState({loading: false});
            download_icon.style.display = 'block';
        }
    }
    handleFile = () => {
        const userFile = document.querySelector('input[type="file"]');
        let video_file = userFile.files[0];
        let user_video_type = video_file.type
        let user_video_size = video_file.size;
        let pile_input = this.props.pile_input;
        let video_validate_status = VALIDATE_VIDEO(user_video_type, user_video_size, pile_input);
        this.processAnimation(true);
        if (video_validate_status) {
            this.props.open_error_modal(true, video_validate_status);
        } else {
            this.setState({upload_feedback: 'processing video...'})
            const formData = new FormData();
            formData.append('max_division', pile_input);
            formData.append('video_file', video_file);
            fetch('/process_video/', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    this.processAnimation(false);
                    this.setState(
                        {
                            zip_file_path: result['file_path'],
                            upload_feedback: 'download your video',
                        });
                    console.log(result);
                })
                .catch(error => {
                    this.processAnimation(false);
                    let msg = 'Unable to edit video';
                    this.props.open_error_modal(true, msg);
                });
        }
    }

    DownloadVideo = () => {
        let zip_file_path = this.state.zip_file_path;
        const formData = new FormData();
        this.setState({upload_feedback: 'Processing request...'})
        formData.append('zip_file_path', zip_file_path);
        fetch('/download/', {
            method: 'POST',
            body: formData
        }).then(response => {
            response.blob().then(blob => {
                const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'user_video.zip');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.location.reload(false);
            })
        })
    }

    render() {
        return (
            <div>
                <div id="upload_border">
                    <div id="upload_process">
                        <p id="upload_feedback" className="center_element">
                            {this.state.upload_feedback}
                        </p>
                        <label htmlFor="file" id="file_label">
                            <span className="material-icons center_element process_icon"
                                  id="folder_icon">
                                            folder_open
                            </span>
                        </label>
                        <p className="material-icons center_element process_icon"
                           id="download_icon" onClick={this.DownloadVideo}>
                            cloud_download
                        </p>
                        <form id="video_form">
                            <input type="file" id="file" accept=".mp4"
                                   onChange={this.handleFile}/>
                        </form>
                        <div className="center_element">
                            <HashLoader
                                css={override}
                                size={90}
                                color={"#fff"}
                                loading={this.state.loading}/>
                        </div>
                    </div>
                </div>
                {this.props.error_state ? <ErrorModal/> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error_state: state.error_state.open,
        pile_input: state.pile_input,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        open_error_modal: (error_state, error_msg) => dispatch({
            type: 'error_state',
            error_state,
            error_msg
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBar)