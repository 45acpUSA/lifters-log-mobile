import React from 'react'
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native'
import TouchableOpacity from 'react-native-platform-touchable'
import { Header, Divider } from 'react-native-elements'

export default function ProfileScreen(props) {
  const { navigate } = props.navigation
  return (
    <ScrollView style={ styles.container }>

      <View>
        <TouchableOpacity
          style={ styles.options }
          onPress={() => navigate('Session')}
          >
          <View style={ styles.optionTextContainer }>
            <Text style={ styles.optionText }>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Divider style={ styles.divider } />

      <View>
        <TouchableOpacity
          style={ styles.options }
          onPress={() => navigate('Settings')}
        >
          <View style={ styles.optionTextContainer }>
            <Text style={ styles.optionText }>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  options: {
    backgroundColor: '#06259e',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionTextContainer: {
    
  },
  optionText: {
    fontSize: 50,
    marginTop: 1,
    textAlign: 'center',
    color: '#fff'
  },
  optionDescriptionContainer: {
    padding: 10
  },
  optionDescription: {
    fontSize: 20,
  },
  divider: {
    backgroundColor: 'white',
    padding: 5,
    margin: 30
  },
})