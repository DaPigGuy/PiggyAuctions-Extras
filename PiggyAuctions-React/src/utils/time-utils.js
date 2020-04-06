import React from "react";
import {Col, Row} from "react-bootstrap";

export default {
    createSimpleDurationString(duration) {
        let durationIntervals = {
            "d": Math.floor(duration / 86400),
            "h": Math.floor(duration / 3600 % 24),
            "m": Math.floor(duration / 60 % 60),
            "s": Math.floor(duration % 60)
        };
        let durationString = "";
        Object.keys(durationIntervals).forEach(interval => {
            let intervalAmount = durationIntervals[interval];
            if (intervalAmount > 0) durationString += intervalAmount + interval;
        });
        return durationString;
    },
    createMultilineDurationString(duration) {
        let durationIntervals = {
            "Day": Math.floor(duration / 86400),
            "Hour": Math.floor(duration / 3600 % 24),
            "Minute": Math.floor(duration / 60 % 60),
            "Second": Math.floor(duration % 60)
        };
        let digits = Math.max(...Object.values(durationIntervals)).toString().length;
        return (
            <Row className="text-left font-weight-bold">
                <Col>
                    {
                        Object.values(durationIntervals).map((amount, index) => {
                            amount = amount.toString().length < digits ? amount.toString().padStart(digits, "0") : amount;
                            return <span key={index}><span>{amount}</span><br/></span>;
                        })
                    }
                </Col>
                <Col>
                    {
                        Object.keys(durationIntervals).map((interval, index) => {
                            return <span
                                key={index}><span>{interval + (durationIntervals[interval] !== 1 ? "s" : "")}</span><br/></span>;
                        })
                    }
                </Col>
            </Row>
        )
    }
};