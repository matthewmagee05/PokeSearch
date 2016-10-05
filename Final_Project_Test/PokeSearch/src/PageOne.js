import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Card, CardSection } from './components/common/';
import  AlbumList  from './components/common/AlbumList';
import PageSearch from './PageSearch';
import PageCollection from './PageCollection';
import { Router, Scene, Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

var routing = null
//Menu scene component
export default class PageOne extends Component {

    state = {
        routing: null
    }

search(){
    this.setState({routing: 'PageSearch'});
    
}

collection(){
    this.setState({routing: 'PageCollection'})
}
  render() {
    switch(this.state.routing){
        case 'PageSearch':
            return (
                <PageSearch/>
            );
        case 'PageCollection':
            return (
                <PageCollection/>
            );
        default:
            return (
            	<Image source={require('./tropical.jpg')} style={styles.backgroundStyle}>
                    <Card>
                    	<CardSection  style={{marginTop: 200}}>
                    		<Button onPress={this.search.bind(this)} >Search For A Pokemon</Button>
                    	</CardSection>
                    </Card>
                <Card>
                	<CardSection>
                		<Button onPress={this.collection.bind(this)} >View Pokemon Collection</Button>
                	</CardSection>
                </Card>
             	<Card>
                	<CardSection>
                		<Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
                	</CardSection>
                </Card>
                <Card>
                	<CardSection>
                		<Image source={require('./logo.png')} style={{height: 300}}></Image>
                	</CardSection>
                </Card>
              </Image>
	  
    )
  }
}
}

const styles = {
	backgroundStyle: {
		height: 700,
		width: null
	},
	buttonStyle: {
		marginBottom: 10
	},
	imageStyle: {
		height: 700,
		width: null
	}
}

