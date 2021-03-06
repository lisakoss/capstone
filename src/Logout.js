import React from 'react';
import firebase from 'firebase';
import './index.css';

import RaisedButton from 'material-ui/RaisedButton';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import { white } from 'material-ui/styles/colors';

//A component that will sign the user out of the website
class Logout extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	//Lifecycle callback executed when the component appears on the screen.
	componentDidMount() {
		// Add a listener and callback for authentication events 
		this.unregister = firebase.auth().onAuthStateChanged(user => {
			if(user) {
				this.setState({userId:user.uid}); //grabs user id
			} else { //redirects to home page once logged out
				this.setState({userId: null}); //null out the saved state
			}
		});
  }

	//when component will be removed
  componentWillUnmount() {
    if(this.unregister){ //if have a function to unregister with
      this.unregister(); //call that function!
    }
  }
  
  //A callback function for logging out the current user
  signOut(){
    // Sign out the user
    firebase.auth().signOut();
  }

  render() {
  	return(
      <div>
				{this.state.userId &&  /*inline conditional rendering*/
          <div className="container-drawer">
            <RaisedButton id="submit-button" label="sign out" overlayStyle={{backgroundColor: '#244B65'}} icon={<Exit color={white} style={{width:'20px'}}/>} primary={true} onClick={(event) => this.signOut()}/>
          </div>
        }
			</div>
    );
  }
}

export default Logout;