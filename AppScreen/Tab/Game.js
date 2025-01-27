import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import MainLayout from '../../components/Layout/MainLayout'

const Game = ({navigation}) => {
  return (
    <MainLayout>
      <TouchableOpacity onPress={() => navigation.navigate('PlayGame')}>
        <Text>Game</Text>
      </TouchableOpacity>
    </MainLayout>
  )
}

export default Game

const styles = StyleSheet.create({})