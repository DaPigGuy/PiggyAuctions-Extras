export default {
    fetchAuctions(callback) {
        fetch(process.env.REACT_APP_API_URL).then(response => response.json()).then(callback);
    },
    sortAuctions(auctions, sortBy) {
        auctions.sort((a, b) => {
            let highestBidA = a.bids.length > 0 ? Math.max(...(a.bids.map(bid => bid.bidamount))) : a["starting_bid"];
            let highestBidB = b.bids.length > 0 ? Math.max(...(b.bids.map(bid => bid.bidamount))) : b["starting_bid"];
            switch (sortBy) {
                default:
                case "Highest Bid":
                    return highestBidB - highestBidA;
                case "Lowest Bid":
                    return highestBidA - highestBidB;
                case "Ending Soon":
                    return a.enddate - b.enddate;
                case "Most Bids":
                    return b.bids.length - a.bids.length;
            }
        });
        return auctions;
    }
}