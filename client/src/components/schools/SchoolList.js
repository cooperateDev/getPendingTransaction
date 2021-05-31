import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SchoolItem from './SchoolItem'
import schoolImg from '../../img/school1.png';
import { Grid, Row, Col,Container } from "react-bootstrap";
import { getList } from '../../actions/post';
import styles from '../../style.css';

  
class SchoolList extends React.Component {
    state = {
      listData: []
    }
  
    componentDidMount() {
      fetch('https://api.airtable.com/v0/appjvmJqlLc4cm9CM/Table%201?api_key=keycGySWvM9Wh654X')
        .then(res => res.json())
        .then(res => {
          
          this.setState({ listData: res.records });
        })
        .catch(error => {})
    }
  render() {
  return (
    
    <Fragment>
      <Container fluid={false} >
        <Row xs="3" md ="5"  noGutters className="mt-5 justify-content-md-center">
        {
          this.state.listData.map((item) => (
            <Col className="schoolItem">
              <SchoolItem key={item._id} item={item}/>
            </Col>
          ))
        }
        
      </Row>
      </Container>
    </Fragment>
  );
};

}

export default SchoolList;

