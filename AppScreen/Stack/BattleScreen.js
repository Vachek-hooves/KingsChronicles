import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {BATTLE_DATA} from '../../data/BattleData';

const BattleScreen = ({route}) => {
  const {battle} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the battle details from BATTLE_DATA using the battle id
  const battleDetails = BATTLE_DATA.find(item => item.id === battle.id);

  const handleNext = () => {
    if (currentIndex < battleDetails.description.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!battleDetails) return null;

  const currentDescription = battleDetails.description[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Timeline */}
      <View style={styles.timelineContainer}>
        <View style={styles.timeline}>
          <View style={styles.timelineLine} />
          <View style={[styles.timelineDot, {left: '25%'}]} />
          <Image
            source={require('../../assets/image/ui/hourglass.png')}
            style={styles.hourglassIcon}
          />
          <View style={[styles.timelineDot, {right: '25%'}]} />
        </View>
      </View>

      {/* Battle Image */}
      <View style={styles.imageContainer}>
        <Image
          source={currentDescription.image}
          style={styles.battleImage}
          resizeMode="cover"
        />
        
        {/* Navigation Arrows */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            style={[
              styles.navButton,
              currentIndex === 0 && styles.navButtonDisabled,
            ]}>
            <Image
              source={require('../../assets/image/icons/arrowLeft.png')}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentIndex === battleDetails.description.length - 1}
            style={[
              styles.navButton,
              currentIndex === battleDetails.description.length - 1 &&
                styles.navButtonDisabled,
            ]}>
            <Image
              source={require('../../assets/image/icons/arrowLeft.png')}
              style={[styles.navIcon,{transform:[{rotate:'180deg'}]}]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Battle Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{currentDescription.text}</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {battleDetails.description.map((_, index) => (
          <View
            key={index}
            style={[
              styles.navDot,
              currentIndex === index && styles.navDotActive,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  timelineContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  timeline: {
    height: 2,
    backgroundColor: '#E5E5E5',
    position: 'relative',
  },
  timelineLine: {
    height: '100%',
    backgroundColor: '#171717',
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C6A44E',
    position: 'absolute',
    top: -3,
  },
  hourglassIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: -11,
    left: '50%',
    marginLeft: -12,
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    marginTop: 20,
    position: 'relative',
  },
  battleImage: {
    width: '100%',
    height: '100%',
  },
  navigationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    top: '50%',
    transform: [{translateY: -20}],
  },
  navButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  descriptionContainer: {
    padding: 20,
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#171717',
    textTransform: 'uppercase',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 8,
  },
  navDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  navDotActive: {
    backgroundColor: '#C6A44E',
  },
});

export default BattleScreen;