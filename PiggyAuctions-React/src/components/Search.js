import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";

class Search extends Component {
    componentDidMount() {
        this.setState({value: ""});
    }

    render() {
        return (
            <>
                <Form inline>
                    <Form.Control className="mr-3" onChange={(event) => {
                        this.setState({value: event.target.value});
                    }}/>
                    <Button variant="primary" onClick={() => {
                        this.props.onSearch(this.state.value);
                    }}>Search</Button>
                </Form>
            </>
        );
    }
}

export default Search;