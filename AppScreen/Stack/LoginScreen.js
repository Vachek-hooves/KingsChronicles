import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../components/Layout/MainLayout';

const LoginScreen = () => {
  const [userData, setUserData] = useState({
    nickname: '',
    // age: '',
    profileImage: null,
    id: new Date().getTime().toString(),
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data');
      if (jsonValue != null) {
        setUserData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      if (!userData.nickname ) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  const deleteAccount = async () => {
    try {
      await AsyncStorage.removeItem('@user_data');
      setUserData({
        nickname: '',
        age: '',
        profileImage: null,
      });
      Alert.alert('Success', 'Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting user data:', error);
      Alert.alert('Error', 'Failed to delete account');
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        setUserData(prev => ({
          ...prev,
          profileImage: response.assets[0].uri,
        }));
      }
    });
  };

  return (
    <MainLayout>
      <ScrollView    style={styles.container}>
        <TouchableOpacity onPress={deleteAccount} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          {userData.profileImage ? (
            <Image
              source={{uri: userData.profileImage}}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.defaultImage}>
              <Image
                source={require('../../assets/image/loginScreen/defaultAvatar.png')}
                style={styles.profileImage}
              />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nickname</Text>
          <TextInput
            style={styles.input}
            value={userData.nickname}
            onChangeText={text =>
              setUserData(prev => ({...prev, nickname: text}))
            }
            placeholder="Enter nickname"
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={userData.age}
            onChangeText={text => setUserData(prev => ({...prev, age: text}))}
            placeholder="Enter age"
            keyboardType="numeric"
          />
        </View> */}

        <TouchableOpacity style={styles.createButton} onPress={saveUserData}>
          <Text style={styles.createButtonText}>Create account</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  deleteText: {
    color: '#000',
    fontSize: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 50,
  },
  defaultImage: {
    width: 160,
    height: 160,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#C5A572',
    fontSize: 16,
    paddingVertical: 8,
  },
  createButton: {
    backgroundColor: '#C5A572',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});