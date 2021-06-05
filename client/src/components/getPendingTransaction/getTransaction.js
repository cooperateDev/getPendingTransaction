import React, { Fragment } from 'react';
import { Row, Col, Container } from "react-bootstrap";

const abiDecoder = require('abi-decoder');
const testABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getController", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newController", "type": "address" }], "name": "changeController", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_unlockTime", "type": "uint256" }], "name": "changeUnlockTime", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getUnlockTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "allowPrecirculation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "isPrecirculationAllowed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "disallowPrecirculation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "controller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_unlockTime", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];

var add = "wss://main-light.eth.linkpool.io/ws"

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider(add));

class getTransaction extends React.Component {

  constructor() {
    super();

    this.state = {
      listData: [],
      symbol: '',
      from: '',
      input: '',
      contractAddress: '',
      pendingCount: 0
    }

    web3.eth.subscribe('pendingTransactions', (err, res) => {
      if (err) console.error(err);
    })
      .on("data", this.getTx);
  }

  getTx = (transaction) => {
      try {
        web3.eth.getTransaction(transaction)
          .then(res => {
            this.setState({ 'listData': res });
            this.setState({ 'from': res.from }); // from
            this.setState({ 'pendingCount': this.state.pendingCount + 1 });

            if(`${res.input}` > 5) { // if it has input

              try {

                abiDecoder.addABI(testABI);
                let decodeInputResult = abiDecoder.decodeMethod(res.input);
                console.log("decodeInputResult ================" + decodeInputResult);
                this.setState({'input': decodeInputResult});
              
              } catch (err) {
                console.log(err);
              }

              let contractAddress = res.to; // contract Address
              this.setState({'contractAddress': contractAddress});

              try {
                fetch('https://api.ethplorer.io/getTokenInfo/' + contractAddress + '?apiKey=freekey')
                .then(result => result.json())
                .then(result => {
                  this.setState({'symbol': result.symbol}); // symbol
                })
                .catch(error => {
                  console.log(error);
                })
              } catch (err) {
                console.log(err);
              }
            }
          });
      } catch (err) {
        console.error(err);
      }
  }

  render() {
    const lists = Object.entries(this.state.listData);
    const length = lists.length;

    const item = lists.map((value, index) =>
      <ul key={index}>
        <li>
          <h3>{value[0]}</h3>
          <p>{value[1]}</p>
        </li>
      </ul>
    );

    return (
      <Fragment>
        <Container fluid={false} >
          <p>Pending Transaction Count: {this.state.pendingCount}</p>
          <p>Transaction Symbol: {this.state.symbol}</p>
          <p>Sender: {this.state.from}</p>
          <p>Contract Address: {this.state.contractAddress}</p>
          <p>Input Data: {this.state.input}</p>
          
          <Row noGutters className="mt-5 justify-content-md-center">
            {length > 0 &&
              <Col className="schoolItem">
                {item}
              </Col>
            }
          </Row>
        </Container>
      </Fragment>
    );
  };
}

export default getTransaction;