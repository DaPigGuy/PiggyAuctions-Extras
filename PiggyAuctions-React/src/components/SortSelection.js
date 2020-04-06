import React, {Component} from "react";

class SortSelection extends Component {
    render() {
        return (
            <>
                <label className="text-light">Sort By</label>
                <select className="form-control w-auto" onChange={this.props.onChange}>
                    <option>Highest Bid</option>
                    <option>Lowest Bid</option>
                    <option>Ending Soon</option>
                    <option>Most Bids</option>
                </select>
            </>
        );
    }
}

export default SortSelection;