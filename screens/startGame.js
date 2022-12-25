import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native'
import Card from '../components/Card'
import colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'
const StartGame = (props) => {
  const [enteredValue, SetEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  const numberInputHandler = (inputText) => {
    SetEnteredValue(inputText.replace(/[^0-9]/g, ' ')) // validation for avoid typing anything accept numbers (in android)
  }

  const resetInputHandler = () => {
    SetEnteredValue('')
    setConfirmed(false)
  }
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    SetEnteredValue('')
  }
  let confirmedOutput
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={styles.text}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber)
          }}
        >
          START GAME
        </MainButton>
      </Card>
    )
  }
  // We use touchable component to close the keyboard when we touch the screen for iOS
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.text}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={colors.accent}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 40,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: Dimensions.get('window').height > 600 ? 30 : 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  btn: {
    width: Dimensions.get('window').width / 3.7,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans',
  },
})

export default StartGame
