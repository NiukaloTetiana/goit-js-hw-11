import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPhotos = async (q, page, per_page) => {
  const params = {
    q,
    page,
    per_page,
    key: '41206768-0b7101544fa101d976339127c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const { data } = await axios.get('', { params });
  return data;
};
