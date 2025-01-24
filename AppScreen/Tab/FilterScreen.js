import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import {RoyalData} from '../../data/RoyalData';

const FilterScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('dynasty'); // dynasty, region, era
  const [selectedFilters, setSelectedFilters] = useState({
    dynasty: null,
    region: null,
    era: null,
  });

  // Create filters object from RoyalData
  const filters = {
    dynasty: Array.from(new Set(RoyalData.map(ruler => ruler.dynasty))).map(
      dynastyName => ({
        name: dynastyName,
        rulers: RoyalData.filter(ruler => ruler.dynasty === dynastyName).map(
          ruler => ruler.name,
        ),
      }),
    ),
    region: Array.from(new Set(RoyalData.map(ruler => ruler.region))).map(
      regionName => ({
        name: regionName,
        rulers: RoyalData.filter(ruler => ruler.region === regionName).map(
          ruler => ruler.name,
        ),
      }),
    ),
    era: Array.from(new Set(RoyalData.map(ruler => ruler.era))).map(eraName => ({
      name: eraName,
      rulers: RoyalData.filter(ruler => ruler.era === eraName).map(
        ruler => ruler.name,
      ),
    })),
  };

  const handleFilterSelect = filterName => {
    setSelectedFilters(prev => ({
      ...prev,
      [activeFilter]: prev[activeFilter] === filterName ? null : filterName,
    }));
  };

  const handleStepIntoHistory = () => {
    // Filter RoyalData based on selected filters
    const filteredRulers = RoyalData.filter(ruler => {
      const dynastyMatch =
        !selectedFilters.dynasty || ruler.dynasty === selectedFilters.dynasty;
      const regionMatch =
        !selectedFilters.region || ruler.region === selectedFilters.region;
      const eraMatch = !selectedFilters.era || ruler.era === selectedFilters.era;

      return dynastyMatch && regionMatch && eraMatch;
    });

    console.log('Selected filters:', selectedFilters);
    console.log('Filtered rulers:', filteredRulers);
    // Later we can navigate with the filtered data:
    // navigation.navigate('HistoryScreen', { filteredRulers });
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

        {/* Filter Icon */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.filterIconContainer}>
          <Image
            source={require('../../assets/image/icons/filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>

        {/* Filter Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filters</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Filter Categories */}
              <View style={styles.filterCategories}>
                {['dynasty', 'region', 'era'].map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      activeFilter === category && styles.activeCategory,
                    ]}
                    onPress={() => setActiveFilter(category)}>
                    <Text
                      style={[
                        styles.categoryText,
                        activeFilter === category && styles.activeCategoryText,
                      ]}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Filter Items with Toggle Functionality */}
              <ScrollView style={styles.filterList}>
                {filters[activeFilter].map((filter, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterItem,
                      selectedFilters[activeFilter] === filter.name &&
                        styles.selectedFilterItem,
                    ]}
                    onPress={() => handleFilterSelect(filter.name)}>
                    <Text
                      style={[
                        styles.filterName,
                        selectedFilters[activeFilter] === filter.name &&
                          styles.selectedFilterText,
                      ]}>
                      {filter.name}
                    </Text>
                    <Text
                      style={[
                        styles.filterCount,
                        selectedFilters[activeFilter] === filter.name &&
                          styles.selectedFilterText,
                      ]}>
                      {filter.rulers.length}{' '}
                      {filter.rulers.length === 1 ? 'ruler' : 'rulers'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Selected Filters Display */}
        <View style={styles.selectedFiltersContainer}>
          {Object.entries(selectedFilters).map(
            ([category, value]) =>
              value && (
                <View key={category} style={styles.selectedFilterTag}>
                  <Text style={styles.selectedFilterText}>{value}</Text>
                </View>
              ),
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStepIntoHistory}>
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
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  selectedFilterItem: {
    backgroundColor: '#C5A572',
    borderRadius: 10,
  },
  selectedFilterText: {
    color: '#FFF',
  },
  selectedFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  selectedFilterTag: {
    backgroundColor: '#C5A572',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterIconContainer: {
    // position: 'absolute',
    // right: 20,
    // top: 40,
    zIndex: 1,
  },
});
