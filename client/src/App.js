import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home';
import CreateDog from '../src/components/CreateDog/CreateDog';
import DogDetail from '../src/components/DogDetail/DogDetail';

function App() {
  return (
    <div className="App">
      <Route exact path='/'  component={LandingPage}/>
      <Route exact path='/Home' component={Home}/>
      <Route exact path='/CreateDog' component={CreateDog}/>
      <Route exact path='/DogDetail/:id' component={DogDetail}/>
    </div>
  );
}

export default App;
