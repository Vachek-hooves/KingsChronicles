import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';

const Game = ({navigation}) => {
  return (
    <MainLayout>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {/* Header Icons */}
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../../assets/image/game/sound.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../../assets/image/icons/shop.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View> */}

        {/* King Character */}
        <View style={styles.kingContainer}>
          <Image 
            source={require('../../assets/image/game/king.png')}
            style={styles.kingImage}
            resizeMode="contain"
          />
        </View>

        {/* Game Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Take part in the legendary King's Tournament, where precision and 
            strategy reign supreme. Step into the boots of a fearless knight and 
            test your skills by hurling spears at challenging targets. From steady 
            aims at static goals to quick thinking for moving ones, every throw 
            brings you closer to glory. Will you earn enough coins to unlock the 
            next challenge and prove yourself as the kingdom's ultimate champion? 
            The throne awaits those with unmatched accuracy and unwavering 
            determination!
          </Text>
        </View>

        {/* Play Button */}
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => navigation.navigate('PlayGame')}
        >
          <Text style={styles.playButtonText}>Begin Your Glory</Text>
        </TouchableOpacity>

        {/* Bottom Navigation Icons */}
        {/* <View style={styles.bottomNav}>
          <Image source={require('../../assets/image/icons/games.png')} style={styles.navIcon} />
          <Image source={require('../../assets/image/icons/pets.png')} style={styles.navIcon} />
          <Image source={require('../../assets/image/icons/crown.png')} style={styles.navIcon} />
          <Image source={require('../../assets/image/icons/scroll.png')} style={styles.navIcon} />
          <Image source={require('../../assets/image/icons/castle.png')} style={styles.navIcon} />
        </View> */}
      </SafeAreaView>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    backgroundColor: '#C6A44E',
    padding: 12,
    borderRadius: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#171717',
  },
  kingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  kingImage: {
    width: 150,
    height: 150,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#171717',
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#C6A44E',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#171717',
  },
});

export default Game;