
import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './pages/about.js';
import Home from './pages/Home.js';
import Articlelist from './pages/Articlelistpage.js';
import NavBar from './NavBar.js';
import Articlepage from './pages/Articlepage.js';
import NotFoundPage from './pages/404page.js';
import Login from './pages/Loginpage.js';
import Createaccount from './pages/Createaccountpage.js';
import Createaccountpage from './pages/Createaccountpage.js';
import Loginpage from './pages/Loginpage.js';

function App() {
  return (
  <>
    <BrowserRouter>
        <div className='App'>
            <NavBar/>
              <hr></hr>
                  <div className='page-body'>
                      <Routes>
                        <Route path='/' element= {<Home />}/>
                        <Route path='/About' element= {<About/>}/> 
                        <Route path='/Articles' element= {<Articlelist/>}/>
                        <Route path='/Articles/:articleID'element={<Articlepage/>}/>
                        <Route path = '/login' element = {<Loginpage/>}/>
                        <Route path = '/create-account' element = {<Createaccountpage/>}/>
                        <Route path='*' element={<NotFoundPage/>}></Route>
                      </Routes>
            
      </div>
    </div>
  </BrowserRouter>
 
 

  </>

  );
}

export default App;
