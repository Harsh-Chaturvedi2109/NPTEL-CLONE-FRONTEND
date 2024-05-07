import { useState } from "react";
import "./login.css";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="login-logo-container">
        <h3>
          <img
            src="./nptel-logo.png"
            alt="logo"
            style={{ height: "100px", width: "510px" }}
          />
          <br></br>
          NPTEL Online Course Certification Exams
        </h3>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div className="Note">
          <b>Note:</b>
          <br></br>
          Please make sure that you login using the same email id you had used
          while enrolling (joining) to the course.
        </div>
      </div>
      <div className="loginContainer">
        <div className="temp-login-container">
          <div className="socialMediaContainer">
            <button className="socialButton"> Microsoft</button>
            <button className="socialButton">Google</button>
          </div>
          <div className="Divider"></div>
          <div className="entry">
            <label htmlFor="email">Email:</label>
            <br></br>
            <input
              type="email"
              value={formData.email}
              name="email"
              id="email"
              onChange={handleChange}
            ></input>
            <br></br>
            <label htmlFor="password">Password:</label>
            <br></br>
            <input
              type="password"
              value={formData.password}
              name="password"
              id="password"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
