import "./Navbar.css"
import { useNavigate } from "react-router-dom"
function Navbar(){
    const navigate = useNavigate();
    return(
        <>
            <div className="navbar">
                <div className="nav-logo">
                    <img src="./nptel-logo.png" alt="nptel-logo" style={{height:"30px", width:"124px"}}/>
                </div>
                <div className="nav-links">
                    <div className="dropdown">
                            <button className="dropbtn">
                                initiatives
                            </button>
                            <div className="dropdown-content">
                                <a href="/">Home</a>
                                <a href="#">About</a>
                            </div>
                    </div>
                    <div className="dropdown">
                            <button className="dropbtn">
                                Programs
                            </button>
                            <div className="dropdown-content">
                                <a href="/courses">courses</a>
                                <a href="#">About</a>
                            </div>
                    </div>
                    <div>
                        <button className="btn">NPTEL Stars</button>
                    </div>
                    <div>
                        <button className="btn" onClick={(e)=>{navigate("/testimonial")}}>Testimonials</button>
                    </div>
                    <div className="dropdown">
                            <button className="dropbtn">
                                More
                            </button>
                            <div className="dropdown-content">
                                <a href="/">Home</a>
                                <a href="#">About</a>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar