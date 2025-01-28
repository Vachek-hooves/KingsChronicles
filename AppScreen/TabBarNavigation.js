import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FilterScreen from './Tab/FilterScreen';
import RoyalScreen from './Tab/RoyalScreen';
import BattleList from './Tab/BattleList';
import Palace from './Tab/Palace';
import Game from './Tab/Game';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#C6A44E',
        tabBarInactiveTintColor: '#171717',
        tabBarItemStyle: {
          paddingTop: 15,
        },
      }}>
      <Tab.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('../assets/image/tabbar/crown.png')}
              style={[styles.tabIcon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BattleList"
        component={BattleList}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('../assets/image/tabbar/battle.png')}
              style={[styles.tabIcon, {tintColor: color}]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Palace"
        component={Palace}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('../assets/image/tabbar/palace.png')}
              style={[styles.tabIcon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('../assets/image/tabbar/games.png')}
              style={[styles.tabIcon, {tintColor: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF5E0',
    borderTopWidth: 0,
    elevation: 0,
    height: 90,
    paddingBottom: 10,
  },
  tabIcon: {
    width: 34,
    height: 34,
  },
});

export default TabBarNavigation;
