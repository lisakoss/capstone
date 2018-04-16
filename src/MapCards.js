import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Location from 'material-ui/svg-icons/communication/location-on';
import { redA200 } from 'material-ui/styles/colors';
import {withRouter} from "react-router-dom";

/* A single listing. */
class MapCards extends React.Component {
  constructor(props) {
    super(props);

    this.callback = this.callback.bind(this);
    this.viewPickups = this.viewPickups.bind(this);
  }

  componentWillMount() {
    this.setState({ currentLocation: this.props.location });
    this.setState({ title: this.props.title.split(',')[0] });
    this.setState({ listingCount: this.props.count });
  }

  componentDidMount() {
    var distance = 0;
    var time = '';
    var google = this.props.google;
    var origin1 = new google.maps.LatLng(this.props.location.lat, this.props.location.lng)
    console.log(this.props.title)
    console.log(this.state.title)
    var destinationA = String(this.props.title.split(",")[0]);
    console.log(destinationA)

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
      }, this.callback);
  }


  callback(response, status) {
    this.setState({ distance: response.rows[0].elements[0].distance.text });
    this.setState({ time: response.rows[0].elements[0].duration.text });
  }

  //handle Pickups button
  viewPickups() {
    this.props.pickupCallback(this.state.title);
  }

  render() {
    return (
      <div className="card-column" role="article">
        <div className="item" role="region">
          <Card>
            <Location color={redA200} style={{ width: '40px' }} /><CardTitle title={this.state.title} subtitle={this.state.distance} />
            <CardText>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.</p>

              <p>There are {this.state.listingCount} pickup(s) available.</p>
            </CardText>
            <CardActions>
              <FlatButton label="Pickups" onClick={this.viewPickups} />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}


export default MapCards;

