import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class BaseInfo extends component {
	render() {
		const { phoneNumber, imei, iccid, carrierName } = this.props;
		<View style={styles.container}>
	    <Text style={styles.instructions}>
	      Phone Number: {phoneNumber}
	    </Text>
	    <Text style={styles.instructions}>
	      Device ID: {imei}
	    </Text>
	    <Text style={styles.instructions}>
	      ICCID: {iccid}
	    </Text>
	    <Text style={styles.instructions}>
	      Carrier Name: {carrierName}
	    </Text>
	  </View>
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});