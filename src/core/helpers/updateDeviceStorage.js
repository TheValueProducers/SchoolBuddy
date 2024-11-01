import AsyncStorage from '@react-native-async-storage/async-storage';

const setStoreData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data saved for key: ${key}`);
  } catch (e) {
    // saving error
    console.log(`saving error: ${e}`);
  }
};

const getStoreData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(`Data read for key: ${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(`reading error: ${e}`);
  }
};

const saveAgendaItems = async (data, etag) => {
  setStoreData('agendaItems', data);
  setStoreData('agendaItemsETag', etag);
};

const updateDeviceStorage = {
  setStoreData,
  getStoreData,
  saveAgendaItems,
};

export default updateDeviceStorage;
