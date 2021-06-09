import React, { Fragment } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import PaginationTableComponent from './PaginationTableComponent';

const readline = require("readline");
const ethTx = require("ethereumjs-tx").Transaction;
const Tx = require("ethereumjs-tx").Transaction;
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


let tokenAddress = "0x2A65D41dbC6E8925bD9253abfAdaFab98eA53E34";
let toAddress = "0x8Df70546681657D6FFE227aB51662e5b6e831B7A";
let fromAddress = "0x821e28109872cad442da8d8335be37d317d4f1e7";


// Use BigNumber
let decimals = web3.utils.toBN(18);
let amount = web3.utils.toBN(100);
let minABI = [
	// transfer
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
		"type": "function"
	}
];

class createSmartContract extends React.Component {

  constructor() {
    super();

    this.state = {
      no: 0,
      transactions: [],
      txHash: ''
    }

    // var subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
    //   if (err) console.error(err);
    // })
    //   .on("data", this.getTx);
    
    // // unsubscribes the subscription
    // subscription.unsubscribe(function(error, success){
    //   if(success)
    //       console.log('Successfully unsubscribed!');
    // });
  
  }

	
	// Get ERC20 Token contract instance
	let contract = new web3.eth.Contract(minABI, tokenAddress);
	// calculate ERC20 token amount
	let value = amount.mul(web3.utils.toBN(10).pow(decimals));
	// call transfer function
	contract.methods.transfer(toAddress, value).send({from: fromAddress})
	.on('transactionHash', function(hash){
		console.log(hash);
	});

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
          <p>pending Count: {this.state.no}</p>
          <p>txHash: {this.state.txHash}</p>
          {/* <PaginationTableComponent data={this.state.transactions}/> */}
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

export default createSmartContract;