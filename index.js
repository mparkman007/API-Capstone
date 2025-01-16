import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

const API_URL = "https://financialmodelingprep.com/api/v3/profile/";
const API_KEY = "kr62Z7tF4K6OQmSm2lquP5XH7N9wiKF5";

const testAPI = [{"symbol":"AAPL","price":238.04,"beta":1.24,"volAvg":44812350,"mktCap":3579621716000,"lastDiv":0.99,"range":"164.08-260.1","changes":4.76,"companyName":"Apple Inc.","currency":"USD","cik":"0000320193","isin":"US0378331005","cusip":"037833100","exchange":"NASDAQ Global Select","exchangeShortName":"NASDAQ","industry":"Consumer Electronics","website":"https://www.apple.com","description":"Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts, as well as advertising services include third-party licensing arrangements and its own advertising platforms. In addition, the company offers various subscription-based services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1976 and is headquartered in Cupertino, California.","ceo":"Mr. Timothy D. Cook","sector":"Technology","country":"US","fullTimeEmployees":"164000","phone":"(408) 996-1010","address":"One Apple Park Way","city":"Cupertino","state":"CA","zip":"95014","dcfDiff":92.00171,"dcf":141.27828829871027,"image":"https://images.financialmodelingprep.com/symbol/AAPL.png","ipoDate":"1980-12-12","defaultImage":false,"isEtf":false,"isActivelyTrading":true,"isAdr":false,"isFund":false}]
const symbols = [
    { name: "JP Morgan", symbol: "JPM|1d"}
  ];





app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.use(express.static("public"));

  app.get("/", async (req, res) => {
    res.render("index.ejs");

  });

  app.post("/submit", async (req,res) =>{
    let reqSymbol = req.body.symbolRequest;
    const result = await axios.get(API_URL + reqSymbol + "?" + "apikey=" + API_KEY);
    let reqExchange = result.data[0].exchangeShortName;
    console.log(req.body.symbolRequest);
    console.log(result.data[0].exchangeShortName);

    res.render("profile.ejs", {content: JSON.stringify(result.data), newUrl: "/?tvwidgetsymbol="+ reqExchange + ":" + reqSymbol.toUpperCase()});

  });


 
  