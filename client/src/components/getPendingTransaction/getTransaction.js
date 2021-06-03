import React, { Fragment } from 'react';
import PendingTransactionItem from './PendingTransactionItem'
import { Row, Col, Container } from "react-bootstrap";

var add = "wss://main-light.eth.linkpool.io/ws"

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider(add));

// const account = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'.toLowerCase();

class getTransaction extends React.Component {

  constructor() {
    super();

    this.state = {
      listData: [],
      count: 0
    }

    web3.eth.subscribe('pendingTransactions', (err, res) => {
      if (err) console.error(err);
    })
      .on("data", this.getTx);
  }

  getTx = (transaction) => {
    setTimeout(async () => {
      try {
        let tx = await web3.eth.getTransaction(transaction)
        .then(res => {
          this.setState({'listData': res});
          this.setState({count : this.state.count + 1});
        });
        
        // if (tx && tx.to) {
        //   if (tx.to.toLowerCase() === account) {

        //     console.log('TX hash: ', transaction);
        //     console.log('TX confirmation: ', tx.transactionIndex);
        //     console.log('TX nonce: ', tx.nonce);
        //     console.log('TX block hash: ', tx.blockHash);
        //     console.log('TX block number: ', tx.blockNumber);
        //     console.log('TX sender address: ', tx.from);
        //     console.log('TX amount(in Ether): ', web3.utils.fromWei(tx.value, 'ether'));
        //     console.log('TX date: ', new Date());
        //     console.log('TX gas price: ', tx.gasPrice);
        //     console.log('TX gas: ', tx.gas);
        //     console.log('TX input: ', tx.input);
        //     console.log('TX hash: ', transaction);
        //     console.log('=====================================');

        //   }
        // }
      } catch (err) {
        console.error(err);
      }
    });
  }
  render() {
    const lists = Object.entries(this.state.listData);
    const length = lists.length;

    return (
      <Fragment>
        <Container fluid={false} ><p>Transaction Count: {this.state.count}</p>
          <Row noGutters className="mt-5 justify-content-md-center">            
            { length > 0 &&
              <Col className="schoolItem"> 
                <PendingTransactionItem item={lists}/>
              </Col>
            }
          </Row>
        </Container>
      </Fragment>
    );
  };
}

export default getTransaction;