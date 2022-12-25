import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native'
import colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons' // check documention for more details
const guess = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min) + min)
  if (rndNum === exclude) {
    // for not guessing the same number again
    return guess(min, max, exclude)
  } else {
    return rndNum
  }
}
const listItem = (value, length) => (
  <View key={value} style={styles.listItem}>
    <Text style={styles.text}>#{length}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
)
const GameScreen = (props) => {
  const initGuess = guess(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initGuess)
  const [pastGuesses, setPastGuesses] = useState([initGuess])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)
  const { userChoice, onGameOver } = props
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = guess(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    setPastGuesses((latest) => [nextNumber, ...latest])
  }

  return (
    <View style={styles.GameScreen}>
      <Text style={styles.GameScreenTitle}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <View style={styles.btn}>
          <MainButton
            onPress={nextGuessHandler.bind(this, 'lower')}
            color={colors.accent}
          >
            LOWER <FontAwesome5 name="less-than" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.btn}>
          <MainButton
            onPress={nextGuessHandler.bind(this, 'greater')}
            color={colors.primary}
          >
            <FontAwesome5 name="greater-than" size={24} color="white" /> GREATER
          </MainButton>
        </View>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((value, index) =>
            listItem(value, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  GameScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  GameScreenTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  btn: {
    width: 'auto',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 30 : 10,
    width: 400,
    maxWidth: '95%',
  },
  text: {
    fontFamily: 'open-sans',
  },
  list: {
    width: Dimensions.get('window').height > 350 ? '60%' : '80%',
    flex: 1, // for scrolling in android
  },
  listItem: {
    borderColor: '#ccc',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
})

export default GameScreen
