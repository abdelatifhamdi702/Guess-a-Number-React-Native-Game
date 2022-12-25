import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={500} // animation time
          // source={{uri: 'https...'}} for images comming from the web
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </Text>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans',
  },
  image: {
    width: '100%', // you have to set a width and hight in images comming from the web
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  resultText: {
    fontFamily: 'open-sans',
    textAlign: 'center',
    fontSize: 20,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
})

export default GameOverScreen
