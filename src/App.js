import logo from './logo.svg';
import './App.css';
import { BrowserRouter,  Route,  Routes } from 'react-router-dom';
import Form from './Components/UseState/Form';

function App() {
  return (
  <BrowserRouter>
  <Routes>
<Route path='/' element={<Form/>}>
  
</Route>
  </Routes>
  
  </BrowserRouter>
  );
}

export default App;
