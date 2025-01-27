import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {PALACE_DATA} from '../../data/PalaceData';
import MainLayout from '../../components/Layout/MainLayout';

const Palace = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPalace = PALACE_DATA[currentIndex];

  const handleNext = () => {
    if (currentIndex < PALACE_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePalaceAction = () => {
    if (!currentPalace.isLocked) {
      // Navigate to palace details
      navigation.navigate('PalaceDetails', {palace: currentPalace});
    } else {
      // Handle unlock palace with coins
      console.log('Unlock palace with coins');
    }
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Navigation Arrows */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              style={[
                styles.navArrow,
                currentIndex === 0 && styles.arrowDisabled,
              ]}>
              <Image
                source={require('../../assets/image/icons/left.png')}
                style={[styles.arrowIcon, {tintColor: '#C6A44E'}]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              disabled={currentIndex === PALACE_DATA.length - 1}
              style={[
                styles.navArrow,
                currentIndex === PALACE_DATA.length - 1 && styles.arrowDisabled,
              ]}>
              <Image
                source={require('../../assets/image/icons/right.png')}
                style={[styles.arrowIcon, {tintColor: '#C6A44E'}]}
              />
            </TouchableOpacity>
          </View>

          {/* Palace Image */}
          <View style={styles.imageContainer}>
            <Image
              source={currentPalace.image}
              style={styles.palaceImage}
              resizeMode="cover"
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              currentPalace.isLocked ? styles.lockedButton : styles.learnButton,
            ]}
            onPress={handlePalaceAction}>
            {currentPalace.isLocked ? (
              <View style={styles.coinContainer}>
                <Text style={styles.coinText}>1000</Text>
                <Image
                  source={require('../../assets/image/icons/coin.png')}
                  style={styles.coinIcon}
                />
              </View>
            ) : (
              <Text style={styles.buttonText}>Learn More</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    // marginTop: 20,
  },
  navArrow: {
    padding: 10,
  },
  arrowDisabled: {
    opacity: 0.5,
  },
  arrowIcon: {
    width: 54,
    height: 36,
  },
  imageContainer: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height * 0.6,
    marginVertical: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  palaceImage: {
    width: '100%',
    height: '100%',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  lockedButton: {
    backgroundColor: '#171717',
  },
  learnButton: {
    backgroundColor: '#C6A44E',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coinText: {
    color: '#C6A44E',
    fontSize: 16,
    fontWeight: '600',
  },
  coinIcon: {
    width: 20,
    height: 20,
  },
});

export default Palace;
