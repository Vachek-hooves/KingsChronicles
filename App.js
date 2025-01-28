import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  IntroductionScreen,
  PromotionScreen,
  WelcomeScreen,
  LoginScreen,
} from './AppScreen/Stack';
import TabBarNavigation from './AppScreen/TabBarNavigation';
import BattleScreen from './AppScreen/Stack/BattleScreen';
import PalaceDetails from './AppScreen/Stack/PalaceDetails';
import PlayGame from './AppScreen/Stack/PlayGame';
import {GameProvider} from './store/context';
import {
  pauseBackgroundMusic,
  playBackgroundMusic,
  setupPlayer,
} from './components/Sound/SoundSetting';
import {useGame} from './store/context';
import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const {isMusicEnable, setIsMusicEnable, totalScore} = useGame();


  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic && isMusicEnable) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });

    const initMusic = async () => {
      await setupPlayer();
      if (isMusicEnable) {
        await playBackgroundMusic();
        setIsPlayMusic(true);
      }
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, [isMusicEnable]);
  return (
    <GameProvider>
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
          <Stack.Screen name="BattleScreen" component={BattleScreen} />
          <Stack.Screen name="PalaceDetails" component={PalaceDetails} />
          <Stack.Screen name="PlayGame" component={PlayGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

export default App;
