import React, { Component } from 'react';
import { ScrollView, View, Alert, Text,TouchableOpacity } from 'react-native';
import { Input, CardSection, Button, Spinner, Card } from './';
import AlbumDetail from './AlbumDetail';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Database from "../../../includes/firebase/database";
import * as firebase from 'firebase';


//This component/class is the main display class for the pokemon objects.

var pokemonDataObjects ={};

class AlbumList extends Component {

	constructor(){
		super();
		this.state = {pokemonImage: [], 
					  pokemonName: [], 
					  pokeData:[],
					  pokeAbility1: '',
					  pokeAbility2: '',
					  moves1: '',
					  moves2: '',
					  moves3: '',
					  search: 'pikachu',
					  loading: false,
					  isCollapsed: true,
					  uid: '',
					  pokemonData: [],
					  test: '',
					  error: '' }
		this.savePokemon = this.savePokemon.bind(this);
	}

	//This is called when this class is first loaded. This sets the error message, 
	//then fetches from the database the search term that the user types.  After it 
	//receives the response, it sets the state, re rendering the screen.  I do this in 
	//component will mount to ensure that there's no null or undefined data coming
	//in when first loaded.
	componentWillMount(){
		this.setState({error: '', loading: true});

		console.log('onPressButtonGET Called ' + this.state.pokemonImage.front_default);
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.search}/`)
        .then((response) => response.json())
        .then((responseJson) => {
        	if(responseJson.sprites !== undefined ){
        		this.setState({
        						pokemonImage: responseJson.sprites, 
        						pokemonName: responseJson.name, 
        						pokeData: responseJson,
        						pokeAbility1: responseJson.abilities[0].ability.name,
        						pokeAbility2: '',
        						moves1: responseJson.moves[0].move.name,
        						moves2: responseJson.moves[1].move.name,
        						moves3: responseJson.moves[2].move.name
        					});
        		if(responseJson.abilities[1] !== undefined){
        			this.setState({
        							
        							pokeAbility2: responseJson.abilities[1].ability.name
        						})
        		}
        		this.setState({error: '', loading: false});
        		this.renderAlbums();
        	}
        	
        	else{
        		Alert.alert(
				  'Pokemon Not Found.  Please check your spelling.',
				  null)
        		this.setState({error: '', loading: false});
        	}
        	
        }).catch(function(error) {
			console.log('There has been a problem with your fetch operation: ' + error.message);
			 // ADD THIS THROW error
			  throw error;
			});
    
	}
	
	//This does the same as the component will mount, but only does it when the user presses
	//the button this method is attached to.
	onPressButtonGET() {
		this.setState({error: '', loading: true});

		
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.search}/`)
        .then((response) => response.json())
        .then((responseJson) => {
        	if(responseJson.sprites !== undefined ){
        		this.setState({
        						pokemonImage: responseJson.sprites, 
        						pokemonName: responseJson.name, 
        						pokeData: responseJson,
        						pokeAbility1: responseJson.abilities[0].ability.name,
        						moves1: responseJson.moves[Math.floor(Math.random() * 50) + 1  ].move.name,
        						moves2: responseJson.moves[Math.floor(Math.random() * 50) + 1  ].move.name,
        						moves3: responseJson.moves[Math.floor(Math.random() * 50) + 1  ].move.name
        					});
        		if(responseJson.abilities[1] !== undefined){
        			this.setState({
        							
        							pokeAbility2: responseJson.abilities[1].ability.name
        						})
        		}else {
        			this.setState({pokeAbility2: ' '})
        		}
        		this.setState({error: '', loading: false});
        		this.renderAlbums();
        	}
        	
        	else{
        		Alert.alert(
				  'Pokemon Not Found.  Please check your spelling.',
				  null)
        		this.setState({error: '', loading: false});
        	}
        	
        }).catch(function(error) {
			console.log('There has been a problem with your fetch operation: ' + error.message);
			  throw error;
			});
    }
    

    //Render the album details.  If the state is loading, than a spinner will display instead.
	renderAlbums() {
		if (this.state.loading){
			return (
				<CardSection>
				<Spinner size="large"/>
				</CardSection>
			)	
		}
			return ( 
				<AlbumDetail key={this.state.id} poke={this.state.pokemonImage} pokeName={this.state.pokemonName} pokeData={this.state.pokeData} />
			);
	}
	//The point of the renderHeader and renderContent are for the Accordion component.  The render header
	//is always displayed, but render content is not displayed unless clicked.
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

  
  savePokemon() {
  		//This saves the pokemon by calling the Database class and attaches it to the users ID
        let user = firebase.auth().currentUser;
         Database.setUserPokemonCollection(user.uid, this.state.pokemonImage.front_default, this.state.pokemonName.toString());
        this.setState({ error: 'Pokemon Added'});
    }



	render() {
		//SECTIONS is what is displayed in the Accordion
		const SECTIONS = [
		  {
		    title: 'Stats',
		    content: ['Weight: ' + this.state.pokeData.weight + ' lbs',
		     		  '\nHeight: ' + this.state.pokeData.height + ' ft',
		     		  '\nBase Experience: ' + this.state.pokeData.base_experience + ' xp',
		     ]
		  },
		  {
		    title: 'Abilities',
		    content: this.state.pokeAbility1 +"\n"+
		    		 this.state.pokeAbility2
		  },
		  {
		  	title: 'Moves',
		  	content: this.state.moves1 + "\n"+
		  			 this.state.moves2 + "\n" +
		  			 this.state.moves3
		  }
		  	
		];
		console.log("rendered database objects: " + this.state.objects);

		return (
			
			<View >

				<CardSection>
					<Input
						placeholder="charmander" 
						label="Search"
						value={this.state.search}
						onChangeText={search => this.setState({ search: search.toLowerCase() })}
					/>
				</CardSection>
				<CardSection>
					<Button
						onPress={this.onPressButtonGET.bind(this)}>
						Search!
					</Button>
				</CardSection>
				<ScrollView style={{height: 395}}>
				
				{this.renderAlbums()}
				<CardSection>
				<Button onPress={this.savePokemon.bind(this)}>
					Add To Collection
				</Button>
				
				</CardSection>
				<CardSection>
				
				<View style={styles.errorViewTextStyle}>
					<Text style={styles.errorTextStyle}> 
						{this.state.error}
					</Text>
				</View>
				</CardSection>
				
				<TouchableOpacity>
					<Accordion 
						sections={SECTIONS}
						renderHeader={this._renderHeader}
						renderContent={this._renderContent}
						duration={400}
					></Accordion>
				</TouchableOpacity>
				</ScrollView>
				<ScrollView></ScrollView>

				
</View>
			
		);
	}
}

const styles = {
	headerContentStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		height: 60,
		flex: 1
	},
	textStyle: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	errorViewTextStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flex: 1
	},
	errorTextStyle: {
		fontSize: 18,
		fontWeight: 'bold'
	}
};



export default AlbumList;
