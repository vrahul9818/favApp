import React from 'react';
import UserList from './components/UserLists/UserList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './components/UserDetails/UserDetails';
import Favourite from './components/favourite/Favourite';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path='/users/:userId' element={<UserDetails/>}/>
        <Route path='/favourites' element={<Favourite/>}/>
      </Routes>
    </Router>
    
  );
};

export default App;
