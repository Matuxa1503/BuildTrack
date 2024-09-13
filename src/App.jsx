import axios from 'axios';
import './App.css';

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:5000');
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={getData}>Получить данные</button>
    </div>
  );
};

export default App;
