import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './components/common/';
import  AlbumList  from './components/common/AlbumList';

//Simple component for the page search using
//the album list component.
export default class PageSearch extends Component {
	
  render() {
  	
    return (
    	<View>
			<AlbumList />
		</View>
    )
  }
}