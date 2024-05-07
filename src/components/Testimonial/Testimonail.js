import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";
import Navbar from "../Navbar/Navbar";
import "./Testimonial.css";
import { CiSearch } from "react-icons/ci";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TestimonialList = () => {
  const [testimonialData, setTestimonialData] = useState({
    testimonials: [],
    totalRatings: 0,
    averageRating: 0,
    ratingBreakdown: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const response = await axios.get("http://localhost:80/testimonial");
        setTestimonialData(response.data);
      } catch (error) {
        console.error("Error fetching testimonial data:", error);
      }
    };

    fetchTestimonialData();
  }, []);

  const { totalRatings, averageRating, ratingBreakdown } = testimonialData;

  // Prepare data for the bar chart
  const ratingData = [
    { name: "1⭐", value: ratingBreakdown[0] },
    { name: "2⭐", value: ratingBreakdown[1] },
    { name: "3⭐", value: ratingBreakdown[2] },
    { name: "4⭐", value: ratingBreakdown[3] },
    { name: "5⭐", value: ratingBreakdown[4] },
  ];

  return (
    <div>
      <Navbar />

      <section className="top-section">
        <div className="Top-Wrap">
          <div className="left">
            <h3>Empowering Education: Hear from Our Learners</h3>
            <p>
              Welcome to NPTEL's Testimonials Page! Discover how learners from
              all walks of life have transformed their knowledge and careers
              through our wide range of quality courses. Read inspiring stories
              and experiences shared by students, professionals, and enthusiasts
              who have embarked on a journey of skill enhancement and personal
              growth with NPTEL.
            </p>
          </div>
          <div className="Right">
            <img
              src="./NPTEL_stars.jpg"
              alt="nptel-stars"
              className="NPTEL-Stars"
            />
          </div>
        </div>
      </section>

      <section className="middle-section">
        <div className="middle-wrap">
          <div className="middle-section-filters">
            <div className="filter-heading">
              <h3>Filters</h3>
            </div>
            <div className="filter-options">
              <div className="filter-category">
                <h5>Brand</h5>
                <div className="filter-content-holder">
                  <div className="filter-search-bar">
                    <div className="search-icon">
                      <CiSearch />
                    </div>
                    <input type="text" placeholder="Search" />
                  </div>
                  <div className="filter-content">
                    <div className="checkbox-Item">
                      <input type="checkbox" className="checkbox-input" id="NPTEL-stars" value="NPTEL-stars"/>
                      <label htmlFor="NPTEL-stars" style={{marginLeft:"5px"}}>NPTEL</label>
                    </div>
                    <div className="checkbox-Item">
                      <input type="checkbox" className="checkbox-input" id="MarchResult"/>
                      <label htmlFor="MarchResult" style={{marginLeft:"5px"}}>March 2024 exam result</label>
                    </div>
                    <div className="checkbox-Item">
                      <input type="checkbox" className="checkbox-input" id="AprilResult"/>
                      <label htmlFor="AprilResult" style={{marginLeft:"5px"}}>April 2024 exam result</label>
                    </div>
                  </div>
                </div>

              </div>
              <div className="filter-category">
                <h5>Event</h5>
                <div className="filter-content-holder">
                  <div className="filter-search-bar">
                    <div className="search-icon">
                      <CiSearch />
                    </div>
                    <input type="text" placeholder="Search" />
                  </div>
                  <div className="filter-content">
                    <div className="checkbox-Item">
                      <input type="checkbox" className="checkbox-input" id="SPOC25June" value="SPOC25June"/>
                      <label htmlFor="SPOC25June" style={{marginLeft:"5px"}}>SPOC 25 June 2022 IIT Madras</label>
                    </div>
                    <div className="checkbox-Item">
                      <input type="checkbox" className="checkbox-input" id="SPOC17July"/>
                      <label htmlFor="SPOC17July" style={{marginLeft:"5px"}}>SPOC 17 July 2022 IIT Bombay</label>
                    </div>
                    <div className="checkbox-Item">
                      <input type="checkbox" className="checkbox-input" id="Teacher'sDay"/>
                      <label htmlFor="Teacher'sDay" style={{marginLeft:"5px"}}>Teachers' Day - 2022</label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="Testimonials-info-wrap">
              <div className="total-testimonials">
                {totalRatings}<br>
                </br> Testimonials
              </div>
              <div className="average-rating">
                {averageRating}
                <br></br>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`star ${index < averageRating ? "filled" : ""}`}
                    >
                      &#9733;
                    </span>
                  ))}
              </div>
              <BarChart
                width={400}
                height={200}
                data={ratingData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
        </div>
      </section>

      <FeedbackForm />
    </div>
  );
};

export default TestimonialList;
