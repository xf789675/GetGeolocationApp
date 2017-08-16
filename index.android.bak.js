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
import { Tabs, Tab, Icon } from 'react-native-elements';
import BaseInfo from './components/baseinfo';

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simInfo: '',
      phoneNumber: '',
      iccid: '',
      imei: '',
      carrierName: '',
      selectedTab: 'profile',
    };
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
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
      desiredAccuracy: 100,
      stationaryRadius: 0,
      distanceFilter: 0,
      locationTimeout: 30,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
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
      location.imei = imei;
      location.phone = phoneNumber;
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
      console.log('[DEBUG] BackgroundGeolocation stationary location', location);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');
    });
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <Tabs>
        <Tab
          titleStyle={{fontWeight: 'bold', fontSize: 10}}
          selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
          selected={selectedTab === 'feed'}
          title={selectedTab === 'feed' ? 'FEED' : null}
          renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='whatshot' size={33} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='whatshot' size={30} />}
          onPress={() => this.changeTab('feed')}>
          <BaseInfo />
        </Tab>
        <Tab
          titleStyle={{fontWeight: 'bold', fontSize: 10}}
          selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
          selected={selectedTab === 'profile'}
          title={selectedTab === 'profile' ? 'PROFILE' : null}
          renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person' size={33} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='person' size={30} />}
          onPress={() => this.changeTab('profile')}>
          <Profile />
        </Tab>
        
      </Tabs>
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
