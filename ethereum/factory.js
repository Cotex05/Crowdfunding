import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x321D1450FE28a553552eccB2F9Bd566A03Cd082E"
);

export default instance;
