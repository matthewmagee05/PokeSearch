import React from 'react';
import { Text, View, Image, Linking,TouchableOpacity } from 'react-native';
import { Card, CardSection, Button, } from './';
import Collapsible from 'react-native-collapsible';
import * as firebase from 'firebase';

const PokemonCollection = ({ poke }) => {


	console.log("Pokemon Collection Image URL: "+ poke.pokemonImageURL);
function removePokemon(){
	let user = firebase.auth().currentUser;
	let userPokemonCollection = "/user/" + user.uid + "/pokemon/";
	firebase.database().ref(userPokemonCollection).child(poke.pokemonName).remove();
	ReactDOM.render()
	
}
		return (
		<Card>
			<CardSection>
				<View style={styles.imageStyle}>
					<Image 
						style={styles.imageStyle}
						source={{ uri: poke.pokemonImageURL }} 
					/>
					<Text>{poke.pokemonName}</Text>

				</View>
				<CardSection>
					<Button onPress={removePokemon}>Remove Pokemon</Button>
				</CardSection>
				
			</CardSection>
		</Card>


	);
};




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
	}
};

export default PokemonCollection;

