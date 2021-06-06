import React, { Fragment } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import PaginationTableComponent from './PaginationTableComponent';

const InputDataDecoder = require('ethereum-input-data-decoder');

// const abiDecoder = require('abi-decoder');
const testABI = [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  }
];

const decoder = new InputDataDecoder(testABI);

var add = "wss://main-light.eth.linkpool.io/ws"

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider(add));

class getTransaction extends React.Component {

  constructor() {
    super();

    this.state = {
      no: 0,
      transactions: [],
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
          // this.setState({ 'listData': res });
          // this.setState({ 'from': res.from }); // from
          this.setState({ 'pendingCount': this.state.pendingCount + 1 });

          if (`${res.input}` > 5) { // if it has input

            try {
              setTimeout(async () => {
                // await abiDecoder.addABI(testABI);
                // let decodeInputResult = await abiDecoder.decodeMethod(res.input);

                let decodeInputResult = await decoder.decodeData(res.input);

                if (decodeInputResult != null) {

                  // this.setState({'inputData': 'There are input data!'});

                  // console.log("======== method =========" + decodeInputResult.method);

                  if(decodeInputResult.method == 'transfer') {

                    // console.log("==== inputs =======" + Object.entries(decodeInputResult).inputs);
                    let receiver = decodeInputResult.inputs[0];
                    let amountHex = decodeInputResult.inputs[1];
                    let amount = web3.utils.toBN(amountHex).toString();

                    // this.setState({'receiver': receiver});
                    // this.setState({'amount': amount});

                    let contractAddress = res.to; // contract Address
                    // this.setState({ 'contractAddress': contractAddress });

                    try {
                      fetch('https://api.ethplorer.io/getTokenInfo/' + contractAddress + '?apiKey=freekey')
                        .then(result => result.json())
                        .then(result => {
                          // this.setState({ 'symbol': result.symbol }); // symbol

                          let oneTransaction = {
                            no: 0,
                            sender: '',
                            receiver: '',
                            contractAddress: '',
                            symbol: '',
                            amount: ''
                          }

                          // one transaction
                          this.setState({no: this.state.no + 1});
                          oneTransaction.no = this.state.no;
                          oneTransaction.sender = res.from;
                          oneTransaction.receiver = '0x' + receiver;
                          oneTransaction.contractAddress = contractAddress;
                          oneTransaction.symbol = result.symbol;
                          oneTransaction.amount = amount;

                          let transactions = [...this.state.transactions];
                          transactions.push(oneTransaction);
                          this.setState({transactions});

                          // console.log(JSON.stringify(this.state.transactions));
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    } catch (err) {
                      console.log(err);
                    }
                  } else {
                    console.log("Input data is not transfer method!");
                  }
                } else {
                  console.log("null ======= decodeInput =======" + decodeInputResult);
                  // this.setState({'inputData': 'There are not input data!'});
                }
              }, 1);
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
    // const lists = Object.entries(this.state.listData);
    // const length = lists.length;

    // const item = lists.map((value, index) =>
    //   <ul key={index}>
    //     <li>
    //       <h3>{value[0]}</h3>
    //       <p>{value[1]}</p>
    //     </li>
    //   </ul>
    // );

    return (
      <Fragment>
        <Container fluid={false} >
          <p>Pending Transaction Count: {this.state.pendingCount}</p>
          {/* <p>Transaction Symbol: {this.state.symbol}</p>
          <p>Sender: {this.state.from}</p>
          <p>Contract Address: {this.state.contractAddress}</p>
          <p>Receiver: {this.state.receiver}</p>
          <p>Amount: {this.state.amount}</p> */}

          <PaginationTableComponent data={this.state.transactions}/>
          {/* <Row noGutters className="mt-5 justify-content-md-center">
            {length > 0 &&
              <Col className="schoolItem">
                {item}
              </Col>
            }
          </Row> */}
        </Container>
      </Fragment>
    );
  };
}

export default getTransaction;