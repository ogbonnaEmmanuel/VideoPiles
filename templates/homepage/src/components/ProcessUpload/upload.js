import React from 'react';
import './upload.css';
import SearchBar from "./search_bar";
import MiddleBar from "./middle_bar";

class Upload extends React.Component{
    render() {
        return(
            <section id="upload_section">
                <div id="upload_border">
                    <SearchBar/>
                    <MiddleBar/>
                </div>
            </section>
        )
    }

}
export default Upload