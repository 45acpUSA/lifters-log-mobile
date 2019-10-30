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

export default class SignUp extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Form
          ref="signUpForm"
          type={ Attributes }
        />
        <TouchableOpacity
          style={ styles.button }
          onPress={ this.handleSignIn }
          underlayColor='#99d9f4'
        >
          <Text style={ styles.buttonText }>Save</Text>
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