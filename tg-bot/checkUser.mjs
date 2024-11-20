import axios from 'axios';

const checkUser = async (userId) => {
  try {
    await axios.post('http://localhost:5000/addUser', { userId });
  } catch (err) {
    console.error('Error tgBot checkUser:', err.message);
  }
};

export default checkUser;
