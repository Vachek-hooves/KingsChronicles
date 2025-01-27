import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FilterScreen from './Tab/FilterScreen';
import RoyalScreen from './Tab/RoyalScreen';
import BattleList from './Tab/BattleList';
import Palace from './Tab/Palace';
const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="FilterScreen" component={FilterScreen} />
      <Tab.Screen name="BattleList" component={BattleList} />
      <Tab.Screen name="Palace" component={Palace} />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;

const styles = StyleSheet.create({});
