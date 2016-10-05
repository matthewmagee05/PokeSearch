import React from 'react';
import { Text, View, Image, Linking,TouchableOpacity } from 'react-native';
import { Card, CardSection, Button, } from './';
import Collapsible from 'react-native-collapsible';


/*This component renders the pokemon images and names*/
const AlbumDetail = ({ poke ,pokeName, pokeData }) => {

	const { front_default } = poke;// deconstruct the poke parameter
	var pokeNameFinal = pokeName.toString();
	
	return (
		<Card>
			<CardSection>
				<View style={styles.headerContentStyle}>
					<Text style={styles.textStyle}> 
						{ pokeNameFinal.toUpperCase() }
					</Text>
				</View>
			</CardSection>
			<CardSection>
				<View style={styles.imageStyle}>
					<Image 
						style={styles.imageStyle}
						source={{ uri: front_default }} 
					/>
				</View>
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

export default AlbumDetail;

