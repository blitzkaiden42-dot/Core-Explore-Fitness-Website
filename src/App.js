  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import './App.css';

 
  import Home from './Pages/Home';
  import AboutUs from './Pages/AboutUs';
  import Programs from './Pages/Programs';
  import Blogs from './Pages/Blogs';
  import Login from './Pages/Login';
  import Signup from './Pages/SignUp';
  import Contacts from './Pages/Contacts';


  function App() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App;
