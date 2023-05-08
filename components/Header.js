import React, { useEffect, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      console.log("Disconnection can be done manually...");
      alert(
        'Please disconnect your MetaMask account manually by clicking on the MetaMask extension icon and selecting "Disconnect" from the dropdown menu.'
      );
    } else {
      console.log("Connection establishing...");
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    isConnected();
  };

  const isConnected = () => {
    const status = window.ethereum.selectedAddress != null;
    setConnected(status);
    // console.log(connected, status);
  };

  useEffect(() => {
    isConnected();
  }, []);

  return (
    <Menu style={{ marginTop: "10px", backgroundColor: "dodgerblue" }}>
      <Link route="/">
        <a
          className="item"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "30px",
            fontFamily: "cursive",
            letterSpacing: 2,
          }}
        >
          Crowdfunding
        </a>
      </Link>
      <Menu.Menu position="right">
        <Button
          className="item"
          onClick={handleConnect}
          style={{
            color: connected ? "#fff" : "red",
            fontWeight: "bold",
            fontSize: "25px",
            fontFamily: "monospace",
          }}
        >
          {connected ? "Connected" : "Connect Now"}
        </Button>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
