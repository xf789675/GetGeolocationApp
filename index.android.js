/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import SimInfo from 'react-native-sim';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simInfo: '',
      phoneNumber: '',
      iccid: '',
      imei: '',
      carrierName: '',
    };
  }
  componentWillMount() {
    const simInfo = SimInfo.getSimInfo();
    const phoneNumber = simInfo.phoneNumber0;
    const iccid = simInfo.simSerialNumber0;
    const imei = simInfo.deviceId0;
    const carrierName = simInfo.carrierName0;

    this.setState({
      simInfo: simInfo,
      phoneNumber: phoneNumber,
      iccid: iccid,
      imei: imei,
      carrierName: carrierName,
    });

    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 5,
      locationTimeout: 30,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
      interval: 60000 * 5,
      fastestInterval: 60000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      // url: 'http://67.209.181.134:3000/position',
      // httpHeaders: {
      //   'X-FOO': 'bar'
      // },
      syncTreshold: 1
    });

    BackgroundGeolocation.on('location', (location) => {
      //handle your locations here
      //Actions.sendLocation(location);
      console.log('get the location!');
      console.log(location);
      location.iccid = iccid;
      fetch('http://67.209.181.134:3000/position', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location)
      })
      .catch((error) => {
        console.error(error);
      });

    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      //handle stationary locations here
      // Actions.sendLocation(stationaryLocation);
      console.log('[DEBUG] BackgroundGeolocation location', location);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Phone Number: {this.state.phoneNumber}
        </Text>
        <Text style={styles.instructions}>
          Device ID: {this.state.imei}
        </Text>
        <Text style={styles.instructions}>
          ICCID: {this.state.iccid}
        </Text>
        <Text style={styles.instructions}>
          Carrier Name: {this.state.carrierName}
        </Text>
      </View>
    );
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
