import axios from 'axios';

const deleteUser = async (userId) => {
  try {
    await axios.delete('http://localhost:5000/deleteUser', { data: { userId } });
  } catch (err) {
    console.error('Error delete user tgBot:', err.message);
  }
};

export default deleteUser;
