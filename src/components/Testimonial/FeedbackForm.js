import React, { useState } from 'react';
import axios from 'axios';
import ReactStarRating from 'react-rating-stars-component';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({});

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setErrors((prevErrors) => ({ ...prevErrors, rating: '' }));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, feedback: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(2);

    const validationErrors = {};

    if (rating === 0) {
      validationErrors.rating = 'Please select a rating';
    }

    if (feedback.trim() === '') {
      validationErrors.feedback = 'Please enter your feedback';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const newTestimonial = { text: feedback, rating };
        await axios.post('http://localhost:80/testimonial', newTestimonial);
        setRating(0);
        setFeedback('');
        alert('Thank you for your feedback!');
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback. Please try again later.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <ReactStarRating
          count={5}
          value={rating}
          onChange={handleRatingChange}
          size={30}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
          rows="4"
        ></textarea>
        {errors.feedback && <div className="invalid-feedback">{errors.feedback}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default FeedbackForm;