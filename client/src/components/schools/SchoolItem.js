import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { Grid, Row, Col, Container } from "react-bootstrap";
import schoolImg from '../../img/school1.png';

class SchoolItem extends React.Component {
  
  attach_url = "";
  constructor(){
    super();
  }
  render() {
    
    var subStr = this.props.item.fields.About;
    if (subStr.length >  150)
      subStr = subStr.substr(1,100) + "...";
    return (
              <Container>
              <Row className="schoolImage justify-content-md-center">
                  <img className="schoolItemImg" style={{width:'100px',height:'100px'}} src= {this.props.item.fields.Attachments[0].thumbnails.small.url} />
              </Row>
              <Row noGutters class="schoolItemDown">
                <Col>
                    <p className="schoolItemTitle">{this.props.item.fields.Name}</p>
                    <div className="schoolItemDesc">
                      <p className="">{subStr}</p>
                    </div>
                    <p className="schoolItemCategory">Sports</p>
                    <div style={{display :'flex',marginBottom:'20px'}}>
                    {
                        this.props.item.fields.Sports.map((sport) => (
                          <div className="schoolItemCategoryDesc">
                            <p className="schoolItemCategoryDescP">
                              {sport}
                            </p>
                          </div>           
                          ))                 
                    }
                    </div>

                </Col>
              </Row>
              </Container>
);

    }
  }
export default SchoolItem;
