import React from 'react'
import {
  AsyncStorage,
  AlertIOS,
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import t from 'tcomb-form-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { BASE } from '../api/credentials'

const Form = t.form.Form

const Location = t.enums({
  YorbaLinda: 'Yorba Linda',
  West: 'West',
  LongBeach: 'Long Beach',
})

const Attributes = t.struct({
  email: t.String,
  password: t.String,
  first_name: t.String,
  last_name: t.String,
  affiliate: t.String,
  location: Location,
})

let STORAGE_KEY = 'authentication_token'

export default class SignUp extends React.Component {

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignUp = () => {
    let value = this.refs.signUpForm.getValue()
    if (value) {
      fetch(BASE.users, {
        method: "POST",
        headers: BASE.headers,
        body: JSON.stringify({
          email: value.email,
          password: value.password,
          first_name: value.first_name,
          last_name: value.last_name,
          affiliate: value.affiliate,
          location: value.location,
        })
      })
      .then(resp => resp.json())
      .then(data => {
        this._onValueChange(STORAGE_KEY, data.authentication_token),
        AlertIOS.alert(
          "Signup Success!"
        )
      })
      .done()
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <KeyboardAwareScrollView>
          <Form
            ref="signUpForm"
            type={ Attributes }
          />
          <TouchableOpacity
            style={ styles.button }
            onPress={ this._userSignUp }
            underlayColor='#99d9f4'
          >
            <Text style={ styles.buttonText }>Save</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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