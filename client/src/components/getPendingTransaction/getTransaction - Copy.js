import React, { Fragment } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import PendingTransactionItem from './PendingTransactionItem'
import schoolImg from '../../img/school1.png';
import { Row, Col, Container } from "react-bootstrap";
// import { getList } from '../../actions/post';
// import styles from '../../style.css';
// import { SET_TRANSACTION } from '../../actions/types';

var add = "wss://main-light.eth.linkpool.io/ws"

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider(add));

// const account = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'.toLowerCase();

class getTransaction extends React.Component {

  constructor(props) {
    super();

    this.state = {
      listData: []
    }

    web3.eth.subscribe('pendingTransactions', (err, res) => {
      if (err) console.error(err);
    })
      .on("data", this.getTx);
  }

  getTx = (transaction) => {
    let tx = web3.eth.getTransaction(transaction);

    this.setState({ listData: tx });

    // let result = fetch(this.state.listData)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({'listData' : data});
    //   });

    //     this.setState({'listData' : result});
    // const listData = async () => {
    //   this.setState('listData', this.state.listData.map());
    // };

    // Promise.all(this.state.listData).then(function(values) {
    //   console.log(values);
    // });

    // setTimeout(async () => {
    //   try {
    //     let tx = await web3.eth.getTransaction(transaction);
    //     if (tx && tx.to) {
    //       // if (tx.to.toLowerCase() === account) {

    //       console.log('TX hash: ', transaction);
    //       console.log('TX confirmation: ', tx.transactionIndex);
    //       console.log('TX nonce: ', tx.nonce);
    //       console.log('TX block hash: ', tx.blockHash);
    //       console.log('TX block number: ', tx.blockNumber);
    //       console.log('TX sender address: ', tx.from);
    //       console.log('TX amount(in Ether): ', web3.utils.fromWei(tx.value, 'ether'));
    //       console.log('TX date: ', new Date());
    //       console.log('TX gas price: ', tx.gasPrice);
    //       console.log('TX gas: ', tx.gas);
    //       console.log('TX input: ', tx.input);
    //       console.log('=====================================');
    // });
  }

  render() {
    
    console.log(this.state.listData);
    return (
      <Fragment>
        <Container fluid={false} >
          <Row xs="3" md="5" noGutters className="mt-5 justify-content-md-center">
            {/* {
              Object.entries(this.state.listData).map((item) => (
                <Col className="schoolItem">
                  <PendingTransactionItem key={item.transactionIndex} item={item}/>
                </Col>
              ))
            } */}
          </Row>
        </Container>
      </Fragment>
    );
  };
}

export default getTransaction;
