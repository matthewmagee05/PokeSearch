import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './components/common/';
import  AlbumList  from './components/common/AlbumList';
import PageOne from './PageOne';
//Search page component
export default class PageSearch extends Component {
	state = {
		routing: null
	}

	back(){
		this.setState({
			routing: 'Back'
		})
	}
  render() {
  	switch(this.state.routing){
  	case 'Back':
	  	return(
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
				<AlbumList />
		    </View>
	    )
  }
}
}