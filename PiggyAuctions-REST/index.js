const settings = require("./settings");

const dotenv = require("dotenv");
const mysql = require("mysql2").createConnection(dotenv.config().parsed);
const restify = require("restify");
const cors = require("restify-cors-middleware")({});
const nbt = require("prismarine-nbt");

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.listen(settings.port, function () {
    console.log("Listening on port " + settings.port);
});

server.get("/", function (request, response, next) {
    response.contentType = "json";
    mysql.query("SELECT * FROM auctions", function (error, results) {
        activeAuctions = [];
        results.forEach(function (auction) {
            if (auction.enddate > Math.floor(new Date() / 1000)) {
                activeAuctions.push(auction);
                if (auction.item["nbt_b64"]) {
                    nbt.parse(Buffer.from(auction.item["nbt_b64"], 'base64'), true, function (error, value) {
                        auction.item.nbt = value;
                        delete auction.item["nbt_b64"];
                    });
                }
            }
        });
        response.send(activeAuctions);
    });
    return next();
});