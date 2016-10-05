import React, { Component } from 'react';
import { Text, Image,TouchableOpacity, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from './common';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import firebase from 'firebase';

//Login form component
class LoginForm extends Component {

	//initializing state varibales
	state = { email: '', password: '', error: '', loading: false };

	//when the login button is pressed, firebase 
	//initialy tries to login the user in.  If there is 
	//no account, then firebase creates one for them. If 
	//the wrong password is entered, the error is displayed to 
	//the user.
	onButtonPress(){

		const {email, password} = this.state;

		this.setState({error: '', loading: true});

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFail.bind(this));
					
			});
	}

	onLoginSuccess(){
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: 'New Registration Created'
		});
	}

	onLoginFail(){
		this.setState({ error: 'Authentication Failed.', loading: false});
	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size="small"/>;
		}

		return (
			<Button 
				onPress={this.onButtonPress.bind(this)}>
				Log In
			</Button>
		);
	}

	_renderHeader(section) {
	 	return (
    		<View style={styles.headerContentStyle}>
        				<Text style={styles.textStyle} >{section.title}</Text>
      				</View>
    	);
	 }

  _renderContent(section) {
    return (
      <View style={styles.headerContentStyle}>
      	<Text>{section.content}</Text>
      </View>
    );
  }

	render() {
		const SECTIONS = [
		  {
		    title: 'Click here for login info.',
		    content: ['Existing Users: Login with your user name and password',
		    		  '\nNew Users: To create a new user, simply enter your email address and a password']
		     
		  }
		  	
		];
		return(
			<Image source={require('../tropical.jpg')} style={styles.backgroundStyle}>
			<View >
			<Card>
				<CardSection>
					<Input
						placeholder="example@gmail.com" 
						label="Email"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry
						placeholder="password" 
						label="Password"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
				</CardSection>
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
			<Card>
				<TouchableOpacity>
					<Accordion 
						sections={SECTIONS}
						renderHeader={this._renderHeader}
						renderContent={this._renderContent}
						duration={400}
					></Accordion>
				</TouchableOpacity>
			</Card>
			<Card>
				<CardSection>
					<Image source={require('../logo.png')} style={{height: 300}}></Image>
				</CardSection>
			</Card>
			</View>
			</Image>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	backgroundStyle: {
		height: 700,
		width: null
	},
	headerContentStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		height: 60,
		flex: 1
	},
	textStyle: {
		fontSize: 14,
		fontWeight: 'bold'
	}
}

export default LoginForm;