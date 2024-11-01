import updateDeviceStorage from '../../../helpers/updateDeviceStorage';
import {agendaItems} from '../../../dopebase/core/components/advanced/Calendar/mocks/agendaItems';

const agendaAPI = 'https://reactnative.dev/movies.json'; //phần này sẽ được sửa khi có data

export const fetchAgendaItems = async () => {
  try {
    const storedETag = await updateDeviceStorage.getStoreData(
      'agendaItemsETag',
    );
    const response = await fetch(agendaAPI, {
      headers: {
        'If-None-Match': storedETag || '',
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      // const etag = response.headers.get('ETag');
      const etag = new Date().toISOString().split('T')[0];
      await updateDeviceStorage.saveAgendaItems(agendaItems, etag); //phần này sẽ được sửa khi có data
    } else if (response.status === 304) {
      console.log('Data not modified');
    } else {
      console.error('Failed to fetch agenda items:', response.status);
    }
  } catch (error) {
    console.error('Error fetching agenda items:', error);
  }
};
