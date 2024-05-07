import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Courses from './components/Courses/Courses.js';
import Home from './components/Home/Home.js';
import Coursepage from './components/Coursepage/Coursepage.js';
import AddCourse from './components/AddCourses/AddCourses.js';
import TestimonialList  from './components/Testimonial/Testimonail.js';
import Login from './components/login/login.js';
function App() {
  return (
    <Router>  
      <Routes>
        <Route path='/' element={<Home />} />  
        <Route path='/login' element={<Login/>} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:courseId' element={<Coursepage />} />
        <Route path='/AddCourse' element={<AddCourse />} />
        <Route path='/Testimonial' element={<TestimonialList />} />
      </Routes>
    </Router>
  );
}

export default App;
