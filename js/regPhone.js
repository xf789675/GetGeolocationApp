import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';

export default class RegPhone extends Components {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      seconds: 60,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phone}
          <TextInput
            style={{height: 40}}
            placeholder="请输入手机号"
          />
          <Button
           disabled={this.state.disabled}
           title={this.state.disabled ? `(#{this.state.seconds})杪` : '获取验证码'}
           onPress={this.getCheckCode}
          />
        </View>
        <TextInput
          style={{height: 40}}
          placeholder="请输入验证码"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});