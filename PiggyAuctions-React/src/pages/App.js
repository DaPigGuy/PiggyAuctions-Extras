import React, {Component} from "react";
import {Container, Row} from 'react-bootstrap';
import Auction from "../components/Auction"
import LoadingScreen from "../components/LoadingScreen";
import Search from "../components/Search";
import SortSelection from "../components/SortSelection";
import ItemUtils, {ItemMap} from "../utils/item-utils";
import AuctionUtils from "../utils/auction-utils";

class App extends Component {
    componentDidMount() {
        this.setState({search: ""});
        this.setState({sortBy: "Highest Bid"});

        ItemUtils.fetchItemIdMap(() => this.forceUpdate());
        AuctionUtils.fetchAuctions((auctions) => this.setState({auctions: auctions}));
        setInterval(() => {
            AuctionUtils.fetchAuctions((auctions) => this.setState({auctions: auctions}));
        }, 1000 * 60 * 5);
    }

    render() {
        if (!this.state || !this.state.auctions || Object.keys(ItemMap.ids).length === 0) {
            return <LoadingScreen/>;
        }

        let auctions = AuctionUtils.sortAuctions(this.state.auctions, this.state.sortBy).filter((auction) => {
            return this.state.search.length === 0 || !this.state.search.trim() ? true : ItemUtils.getItemName(auction.item).includes(this.state.search);
        }).map(function (auction) {
            return <Auction key={auction.id} auction={auction}/>
        });

        return (
            <Container>
                <div className="userFilters mt-3 d-flex justify-content-center align-items-center">
                    <div className="mb-3">
                        <Search onSearch={(searchInput) => {
                            this.setState({search: searchInput});
                        }}/>
                    </div>
                    <SortSelection onChange={(event) => {
                        this.setState({sortBy: event.target.value});
                    }}/>
                </div>
                <Row className="mt-5">{auctions}</Row>
            </Container>
        );
    }
}

export default App;