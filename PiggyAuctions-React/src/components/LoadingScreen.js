import React, {Component} from "react";
import {Image, Spinner} from "react-bootstrap";

class LoadingScreen extends Component {
    render() {
        return (
            <div id="loadingScreen" className="d-flex justify-content-center align-items-center">
                <Image className="w-25" src="https://i.ya-webdesign.com/images/kawaii-animal-png-3.png"/>
                <Spinner animation="border" size="lg"/>
                <h4 className="ml-3 d-inline-block">Fetching auctions...</h4>
            </div>
        );
    }
}

export default LoadingScreen;