import React, { Component } from 'react';
import { View, Text,Alert, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection,Header } from './components/common/';
import  AlbumList  from './components/common/AlbumList';
import PageOne from './PageOne';
import Database from "../includes/firebase/database";
import * as firebase from 'firebase';

var newArray=[]
var count = 0;
//class that displays the users collections
export default class PageCollection extends Component {

	constructor(){
		super();
		this.state = {pokemonData: [],
		test: '',
		error:'',
		routing: null }
		
	}

	//when this component loads, the database fetches all the 
	//pokemon in the users collection and displays it.  If there 
	//are no pokemon, then it displays an error message.
	componentWillMount(){
		this.setState({error: 'There are no pokemon in your collection'})
		let user = firebase.auth().currentUser;
		let userPokemonCollection = "/user/" + user.uid + "/pokemon/";

		firebase.database().ref(userPokemonCollection).once("value", (snapshot) =>{
			snapshot.forEach((childSnapshot)=> {
		    	var pokemonDataObjects = childSnapshot.val();
		   		newArray = this.state.pokemonData.slice();    
    			newArray.push(pokemonDataObjects);
    			this.setState({'pokemonData': newArray });
    			count = newArray.length;
    				if(count <=0){
    					this.setState({error: 'There are no pokemon in your collection'})
    				}else if(count >0){
    					this.setState({error: ''})
    				}
		  });
		});

		}

	//removes the pokemon from the users collection, displays an alert
	//and goes back to the title screen.
	removePokemon(name){
		this.setState({routing: 'Remove'})
		let user = firebase.auth().currentUser;
		let userPokemonCollection = "/user/" + user.uid + "/pokemon/";
		firebase.database().ref(userPokemonCollection).child(name).remove();
		this.setState({test: Math.random()});
		count--;
		
		Alert.alert(
					  name + ' removed',
					  null)
}
	back(){
		this.setState({routing: 'Remove'})
	}
		
	renderCollection(){

		if(count <= 0){
			return(
				<Image source={require('./tropical.jpg')} style={styles.backgroundStyle}>
					<Card >
						<CardSection>
							<Text style={styles.textStyle}>{this.state.error}</Text>	
						</CardSection>
						<CardSection>
							<Button onPress={this.back.bind(this)}>Back</Button>	
						</CardSection>
					</Card>
				</Image>
		);
		
	}else{
		return this.state.pokemonData.map(poke => 
			
				<View style={{marginTop: 55}}key={poke.pokemonName}>
				<Card >
				<CardSection>
					<Image 
						style={styles.imageStyle}
						source={{ uri: poke.pokemonImageURL }} 
					/>
				</CardSection>
				<View style={styles.headerContentStyle}>
					<Text style={styles.textStyle}> 
						{ poke.pokemonName }
					</Text>
				</View>
			</Card>
			<Card>
				<CardSection>
					<Button onPress={()=>this.removePokemon(poke.pokemonName)}>Remove Pokemon</Button>
				</CardSection>
			</Card>
			</View>
    	);
		}
	}
	
  render() {
  	switch(this.state.routing){
  		case 'Remove':
  			return (
				<PageOne/>
			);
	  	default:
		  	return (
		  		
					<View>
					<Card>
						<CardSection>
							<Button onPress={this.back.bind(this)}>Back</Button>
						</CardSection>
					</Card>
					<ScrollView style={{height: 500}}>
						{this.renderCollection()}
						</ScrollView>
						<ScrollView>
						</ScrollView>
					</View>
				
			);
  
  
  }
}
}

const styles = {
	headerContentStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flex: 1
	},
	textStyle: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null
	},
	backgroundStyle: {
		height: 700,
		width: null
	}
};