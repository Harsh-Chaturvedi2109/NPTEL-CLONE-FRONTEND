import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Courses.css";
import { Link } from "react-router-dom";
function Courses() {
    const[allCourses,setAllCourses] = useState([]);
    const [searchParams, setSearchParams] = useState({
        instructor: '',
        title: '',
        discipline: '',
        institute: '',
    });

    function handleChange(e){
        setSearchParams({...searchParams,[e.target.name]:e.target.value});
    }

    const filteredCourses = allCourses.filter((course) => {
        const instructorMatch = course.instructor.toLowerCase().includes(searchParams.instructor.toLowerCase());
        const nameMatch = course.title.toLowerCase().includes(searchParams.title.toLowerCase());
        const disciplineMatch = course.discipline.toLowerCase().includes(searchParams.discipline.toLowerCase());
        const instituteMatch = course.institute.toLowerCase().includes(searchParams.institute.toLowerCase());
        return instructorMatch && nameMatch && disciplineMatch && instituteMatch;
      });


    useEffect(()=>{
        async function getAllCourses(){
            try{
                const res = await fetch("http://localhost:80/course/getAllCourses",{
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
    
                const data = await res.json();
                setAllCourses(data);
            }
            catch(err){
                console.log(err);
            }
        }
        getAllCourses();
    },[])
    return (
        <div>
            <Navbar />
            <div className="filters">
                <input type="text" placeholder="Search For Courses" name="title" value={searchParams.title} onChange={handleChange}/>
                <input type="text" placeholder="Search By Instructor" name="instructor" value={searchParams.instructor} onChange={handleChange}/>
                <input type="Discipline" placeholder="Search By Discipline" name="discipline" value={searchParams.discipline} onChange={handleChange}/>
                <input type="Institute" placeholder="Search By Institute" name="institute" value={searchParams.institute} onChange={handleChange} />
            </div>
            <div className="course-list">
                {filteredCourses.map((course)=>(
                    <div className="course" key={course._id}>

                        <Link to={`/courses/${course._id}`}>
                            <h3>{course.title}</h3>
                            <h4>{course.discipline}</h4>
                            <p>{course.instructor}</p>
                            <p>{course.institute}</p>
                        </Link>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default Courses;