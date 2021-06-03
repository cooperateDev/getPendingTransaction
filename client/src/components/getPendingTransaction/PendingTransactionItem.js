import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import formatDate from '../../utils/formatDate';
// import { connect } from 'react-redux';
import { Row, Col, Container } from "react-bootstrap";
import schoolImg from '../../img/school1.png';

class PendingTransactionItem extends React.Component {

	attach_url = "";
	constructor() {
		super();
	}
	render() {

		// var subStr = this.props.item.fields.About;
		// if (subStr.length > 150)
		// 	subStr = subStr.substr(1, 100) + "...";
		const item = this.props.item.map((value) =>
			<ul>
				<li key={value[0]}>
					<h3>{value[0]}</h3>
					<p>{value[1]}</p>
				</li>
			</ul>
		);

		return (
			
			<Container>
				<Row noGutters class="schoolItemDown">
					<Col>
						{ item }
					</Col>
				</Row>
			</Container>
		);
	}
}

export default PendingTransactionItem;