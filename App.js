import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  IntroductionScreen,
  PromotionScreen,
  WelcomeScreen,
  LoginScreen,
} from './AppScreen/Stack';

import TabBarNavigation from './AppScreen/TabBarNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="TabBarNavigation" component={TabBarNavigation} />
        <Stack.Screen
          name="IntroductionScreen"
          component={IntroductionScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
