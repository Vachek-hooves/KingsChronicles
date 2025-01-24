import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '../../components/Layout/MainLayout';

const FilterScreen = () => {
  const [activeFilter, setActiveFilter] = useState('dynasty'); // dynasty, region, era

  const filters = {
    dynasty: [
      {name: 'Tudors', rulers: ['Henry VIII', 'Elizabeth I']},
      {name: 'Bourbons', rulers: ['Louis XIV']},
      {name: 'Romanovs', rulers: ['Catherine II', 'Peter the Great']},
      {name: 'Carolingians', rulers: ['Charlemagne', 'Clovis I']},
      {name: 'Habsburgs', rulers: ['Philip II', 'Maria Theresa']},
      {name: 'Bonapartes', rulers: ['Napoleon Bonaparte']},
    ],
    region: [
      {
        name: 'England',
        rulers: ['Henry VIII', 'Elizabeth I', 'Victoria', 'Alfred the Great'],
      },
      {
        name: 'France',
        rulers: ['Louis XIV', 'Napoleon Bonaparte', 'Charlemagne'],
      },
      {
        name: 'Russia',
        rulers: ['Catherine II', 'Peter the Great', 'Ivan the Terrible'],
      },
      {name: 'Ottoman Empire', rulers: ['Suleiman the Magnificent']},
      {name: 'Holy Roman Empire', rulers: ['Charlemagne', 'Maria Theresa']},
      {name: 'Ancient Macedonia', rulers: ['Alexander the Great']},
    ],
    era: [
      {
        name: 'Middle Ages',
        rulers: [
          'Alfred the Great',
          'Clovis I',
          'Charlemagne',
          'Ivan the Terrible',
        ],
      },
      {
        name: 'Renaissance',
        rulers: [
          'Henry VIII',
          'Elizabeth I',
          'Philip II',
          'Suleiman the Magnificent',
        ],
      },
      {
        name: 'Enlightenment',
        rulers: [
          'Catherine II',
          'Peter the Great',
          'Frederick II',
          'Maria Theresa',
        ],
      },
      {name: 'Napoleonic Era', rulers: ['Napoleon Bonaparte']},
      {name: 'Victorian Era', rulers: ['Queen Victoria']},
      {name: 'Antiquity', rulers: ['Alexander the Great']},
    ],
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Timeline Design */}
        <View style={styles.timelineContainer}>
          <Image
            source={require('../../assets/image/ui/hourglass.png')}
            style={styles.hourglassIcon}
          />
        </View>
        <Image
          source={require('../../assets/image/icons/filter.png')}
          style={styles.filterIcon}
        />

        {/* Filter Categories */}
        <View style={styles.filterCategories}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeFilter === 'dynasty' && styles.activeCategory,
            ]}
            onPress={() => setActiveFilter('dynasty')}>
            <Text
              style={[
                styles.categoryText,
                activeFilter === 'dynasty' && styles.activeCategoryText,
              ]}>
              Dynasty
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeFilter === 'region' && styles.activeCategory,
            ]}
            onPress={() => setActiveFilter('region')}>
            <Text
              style={[
                styles.categoryText,
                activeFilter === 'region' && styles.activeCategoryText,
              ]}>
              Region
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeFilter === 'era' && styles.activeCategory,
            ]}
            onPress={() => setActiveFilter('era')}>
            <Text
              style={[
                styles.categoryText,
                activeFilter === 'era' && styles.activeCategoryText,
              ]}>
              Era
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Items */}
        <ScrollView style={styles.filterList}>
          {filters[activeFilter].map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.filterItem}
              onPress={() => {
                // Handle filter selection
              }}>
              <Text style={styles.filterName}>{filter.name}</Text>
              <Text style={styles.filterCount}>
                {filter.rulers.length}{' '}
                {filter.rulers.length === 1 ? 'ruler' : 'rulers'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Step into History</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  timelineContainer: {
    marginVertical: 50,
    alignContent: 'center',
    alignItems: 'center',
  },
  timeline: {
    height: 2,
    backgroundColor: '#000',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C5A572',
    position: 'absolute',
    top: -4,
  },
  hourglassIcon: {
    position: 'absolute',
    alignItems: 'center',
  },
  filterIcon: {
    width: 34,
    height: 34,
    // position: 'absolute',
    right: 0,
    // top: -11,
    margin: 20,
    alignSelf: 'flex-end',
  },
  filterCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C5A572',
  },
  activeCategory: {
    backgroundColor: '#C5A572',
  },
  categoryText: {
    color: '#C5A572',
    fontSize: 16,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFF',
  },
  filterList: {
    flex: 1,
  },
  filterItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filterName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  filterCount: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#C5A572',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
