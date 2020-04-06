import React, {Component} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import McText from "mctext-react/lib/McText";
import NumericLabel from "react-pretty-numbers";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Timer from "./Timer";
import ItemUtils from "../utils/item-utils";
import TimeUtils from "../utils/time-utils";

class AuctionDetails extends Component {
    render() {
        return (
            <Modal show={this.props.toggled} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{(this.props.auction.item.count || 1) + "x " + ItemUtils.getItemName(this.props.auction.item)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="text-center">
                        <Row>
                            <Col className="auctionDetails mb-4 d-flex justify-content-center align-items-center"
                                 sm={12} md={4} lg={4} xl={4}>
                                <h4 ref={(username) => this.username = username}>{this.props.auction.auctioneer}</h4>
                                <CopyToClipboard text={this.props.auction.auctioneer}>
                                    <Button variant="outline-dark" size="lg" onClick={this.copyUsername}>Copy</Button>
                                </CopyToClipboard>
                                <br/>
                                <Timer endDate={this.props.auction.enddate}
                                       durationStringFunction={TimeUtils.createMultilineDurationString}/>
                                <br/>
                                <Row>
                                    <Col>
                                        <span>S.B<br/><NumericLabel params={{
                                            shortFormat: true,
                                            justification: "C"
                                        }}>{this.props.auction.starting_bid}</NumericLabel></span>
                                    </Col>
                                    <Col>
                                        <span>T.B<br/><NumericLabel params={{
                                            shortFormat: true,
                                            justification: "C"
                                        }}>{this.props.auction.bids.length > 0 ? Math.max(...(this.props.auction.bids.map(bid => bid.bidamount))) : 0}</NumericLabel></span>
                                    </Col>
                                </Row>
                                <br/>
                                <span className="font-12">
                                    <span>Top bid by <span className="text-primary">{
                                        this.props.auction.bids.length > 0 ? this.props.auction.bids.find(bid => bid.bidamount === Math.max(...(this.props.auction.bids.map(bid => bid.bidamount)))).bidder : "No Bids!"
                                    }</span></span>
                                    <br/>
                                    <span>This item has <span
                                        className="text-primary">{this.props.auction.bids.length || "No"}</span> Bid{this.props.auction.bids.length === 1 ? "" : "s"}</span>
                                </span>
                            </Col>
                            <Col className="lore">
                                {
                                    ItemUtils.getItemLore(this.props.auction.item).map((lore, index) => {
                                        return <span key={index} className="font-15"><McText>{lore}</McText><br/></span>
                                    })
                                }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AuctionDetails;