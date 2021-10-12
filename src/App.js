/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { Container } from '@mui/material';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';
import Search from './Pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Container>
          <Switch>
            <Route path='/' component={Trending} exact />
            <Route path='/movies' component={Movies}/>
            <Route path='/series' component={Series}/>
            <Route path='/search' component={Search}/>
          </Switch>
        </Container>
      </div>    
        <SimpleBottomNavigation/>
    
    </BrowserRouter>
  );
}

export default App;
