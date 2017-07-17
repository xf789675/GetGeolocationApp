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
  componentWillMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      locationTimeout: 30,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://67.209.181.134:3000/position',
      httpHeaders: {
        'X-FOO': 'bar'
      },
      syncTreshold: 1
    });

    BackgroundGeolocation.on('location', (location) => {
      //handle your locations here
      //Actions.sendLocation(location);
      console.log(location);
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
    const simInfo = SimInfo.getSimInfo();
    const phoneNumber = simInfo.phoneNumber0;
    const iccid = simInfo.simSerialNumber0;
    const imei = simInfo.deviceId0;
    const carrierName = simInfo.carrierName0;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.instructions}>
          Phone Number: {phoneNumber}{'\n'}
          Device ID: {imei}{'\n'}
          ICCID: {iccid}{'\n'}
          Carrier Name: {carrierName}
        </Text>
        <Button
          onPress={() => {
            BackgroundGeolocation.getLocations((locations) => {
              console.log(`Get Locations success: ${locations}`);
              //Actions.sendLocation(locations);
            }, () => {
              console.log('Get Locations failed!');
            })
          }}
          title="Get Locations"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
