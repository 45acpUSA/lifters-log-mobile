import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import t from 'tcomb-form-native'

import { BASE } from '../api/credentials'

const Form = t.form.Form

const Attributes = t.struct({
  email: t.String,
  password: t.String,
  rememberMe: t.Boolean,
})

const options = {
  fields: {
    email: {
      label: 'Email',
      textContentType: 'emailAddress',
      keyboardType: 'email-address',
    },
    password: {
      label: 'Password',
      textContentType: 'password',
      secureTextEntry: true,
    },
    rememberMe: {
      label: 'Remember Me',
    }
  }
}

let STORAGE_KEY = 'authentication_token'

export default class UserSession extends React.Component {

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue)
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message)
    }
  }

  handleSignIn = () => {
    const value = this.refs.signInForm.getValue()
    if (value) {
      fetch(BASE.login, {
        method: "POST",
        headers: BASE.headers,
        body: JSON.stringify({
          email: value.email,
          password: value.password
        })
      })
      .then(resp => resp.json())
      .then(data => {
        this._onValueChange(STORAGE_KEY, data.authentication_token),
        AlertIOS.alert(
          "Signup Success!",
          "Click the button to get a Chuck Norris quote!"
        )
      })
      .done()
    }
  }

  // handleSignIn = () => {
  //   const values = this.refs.signInForm.getValue()
  //   this.handleNewSession(values.user_name, values.password)
  // }

  handleNewSession = (email, password) => {
    let credentials = { 'email': email, 'password': password }
    fetch(`${BASE.login}.json`, {
      method: "POST",
      headers: Object.assign(BASE.headers, credentials),
    })
    .then(resp => this.validateToken(resp))
    .then(error => console.log("ERROR DURING newSession (LoginForm.js)", error))
  }

  validateToken = (response) => {
    let accessToken = {
      "access-token": response.headers["access-token"],
      "client": response.headers.client,
      "uid": response.headers.uid
    }
    fetch(BASE.validateToken, {
      headers: Object.assign(BASE.headers, accessToken)
    })
    .then(resp => {
      // this.authSuccess()
      this.props.navigation.navigate('Home')
    })
  }

  // authSuccess = (data, accessToken) => {
  //   return {
  //     type: 'user_login_successful',
  //     payload: {data: data, accessToken: accessToken, status: 200},
  //   }
  // }

  render() {
    return (
      <View style={ styles.container }>
        <Form
          ref="signInForm"
          type={ Attributes }
          options={ options }
        />
        <TouchableOpacity
          style={ styles.button }
          onPress={ this.handleSignIn }
          underlayColor='#99d9f4'
        >
          <Text style={ styles.buttonText }>Sign In</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})