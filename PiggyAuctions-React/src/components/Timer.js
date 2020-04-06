import React, {Component} from "react";

class Timer extends Component {
    componentDidMount() {
        let interval = setInterval(() => {
            this.setState({durationString: this.props.durationStringFunction(this.props.endDate - Math.floor(new Date() / 1000))});
        }, 1000);
        this.setState({
            interval: interval,
            durationString: this.props.durationStringFunction(this.props.endDate - Math.floor(new Date() / 1000))
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        if (!this.state) return null;
        return <span className="text-center">Ending in <br/>{this.state.durationString}</span>;
    }
}

export default Timer;