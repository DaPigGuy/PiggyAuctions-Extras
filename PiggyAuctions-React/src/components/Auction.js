import React, {Component} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import AuctionDetails from "./AuctionDetails";
import Timer from "./Timer";
import ItemUtils from "../utils/item-utils";
import TimeUtils from "../utils/time-utils";
import NumericLabel from "react-pretty-numbers";

class Auction extends Component {
    componentDidMount() {
        this.setState({details: false});
    }

    toggleDetails = () => {
        this.setState({details: !this.state.details});
    };

    render() {
        if (!this.state) return null;
        let auction = this.props.auction;
        return (
            <Col className="py-2" md={6} lg={4} xl={4}>
                <Card className="text-center border-5" border="dark">
                    <Card.Body>
                        <Card.Title>{(auction.item.count || 1) + "x " + ItemUtils.getItemName(auction.item)}</Card.Title>
                        <Timer endDate={auction.enddate} durationStringFunction={TimeUtils.createSimpleDurationString}/>
                        <Row className="mt-3">
                            <Col>
                                <Button variant="outline-dark" size="lg" onClick={this.toggleDetails}>Details</Button>
                            </Col>
                            <Col className="px-1">
                                <span>Start Bid<br/><NumericLabel params={{
                                    shortFormat: true,
                                    justification: "C"
                                }}>{auction.starting_bid}</NumericLabel></span>
                            </Col>
                            <Col className="px-1">
                                <span>Top Bid<br/><NumericLabel params={{
                                    shortFormat: true,
                                    justification: "C"
                                }}>{auction.bids.length > 0 ? Math.max(...(auction.bids.map(bid => bid.bidamount))) : 0}</NumericLabel></span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <AuctionDetails auction={this.props.auction} toggled={this.state.details} onClose={() => {
                    this.setState({details: false});
                }}/>
            </Col>
        );
    }
}

export default Auction;