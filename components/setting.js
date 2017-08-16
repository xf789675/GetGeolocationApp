import React, { Component } from 'react';
import { FormLabel, FormInput } from 'react-native-elements'

export default class Setting extends Component {
  render() {
    <FormLabel>上报间隔时间</FormLabel>
    <FormInput onChangeText={someFunction}/>
    <FormValidationMessage>Error message</FormValidationMessage>
  }
}