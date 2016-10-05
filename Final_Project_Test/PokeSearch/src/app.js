import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import AlbumList from './components/common/AlbumList';
import { Router, Scene } from 'react-native-router-flux';
import PageOne from './PageOne';
import PageCollection from './PageCollection';

//main file for app
class App extends Component {

	 constructor(props) {
    super(props);
    this.state ={ loggedIn: null };
  }

	
  	//as soon as this component is loaded, firebase
  	//connects to the database.
	componentWillMount(){
		firebase.initializeApp({

	    apiKey: "AIzaSyAPl99mMM1Kkft3jPo7D-ynr4_TfxnxdGw",
	    authDomain: "authorization-b548f.firebaseapp.com",
	    databaseURL: "https://authorization-b548f.firebaseio.com",
	    storageBucket: "authorization-b548f.appspot.com",
	    messagingSenderId: "72433308309"
  	});
		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});

	
	}

	//switch statement that renders components
	//based on if the user is logged in or not.
	//This uses the react-native-router-flux to 
	//help with rendering different scenes in 
	//the app.
	renderContent(){
		switch(this.state.loggedIn){
			case true:
				return (

					<PageOne/>
				);
			case false:
				return <LoginForm />

			default:
				return(
					<View style={styles.spinnerViewStyle}>
				 		<Spinner size="large" />
				 	</View>
				 );
		}
		
	}

	render() {
		return (
			<View >
				
				
					{this.renderContent()}
			</View>
		)
	}
}

const styles = {
	spinnerViewStyle : {
		alignSelf: 'center',
		marginTop: 10
	},
	scrollStye : {
		flex: 1
	},
	buttonStyle: {
		marginBottom: 10
	}
}

export default App;