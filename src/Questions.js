import React, { useState } from 'react';

function Questions() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const questionBank = {
    Gratitude: [
      'What are you thankful for today?',
      'Who made a positive impact on you recently?',
      'What’s one small win you had today?'
    ],
    'Self Awareness': [
      'What emotion are you feeling most today?',
      'How do you handle stressful situations?',
      'What thought keeps coming back to you lately?'
    ],
    'Self Love': [
      'What’s something you love about yourself?',
      'How have you shown yourself kindness today?',
      'What would you say to your younger self?'
    ],
    'Present Moment': [
      'What do you hear around you right now?',
      'What sensations do you feel in your body?',
      'What are 3 things you can see right now?'
    ],
    Meditation: [
      'Have you taken a moment of stillness today?',
      'What does peace feel like to you?',
      'When do you feel most calm?'
    ]
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedQuestionIndex(null);
    setAnswer('');
    setSubmitted(false);
  };

  const handleQuestionSelect = (e) => {
    setSelectedQuestionIndex(parseInt(e.target.value));
    setAnswer('');
    setSubmitted(false);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Submitted Answer:', answer);
    // You could send the answer to a backend here
  };

  const selectedQuestion =
    selectedCategory && selectedQuestionIndex !== null
      ? questionBank[selectedCategory][selectedQuestionIndex]
      : '';

  return (
    <div className="row g-2">
      <form onSubmit={handleSubmit}>
        {/* Category Select */}
        <div className="col-md">
          <label htmlFor="category">Question Category</label>
          <div className="form-floating">
            <select
              className="form-select"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Open this select menu
              </option>
              {Object.keys(questionBank).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="category">Question Category</label>
          </div>
        </div>

        {/* Question Number Select */}
        {selectedCategory && (
          <div className="col-md mt-3">
            <label htmlFor="questionSelect">Select Question</label>
            <div className="form-floating">
              <select
                className="form-select"
                id="questionSelect"
                onChange={handleQuestionSelect}
                required
              >
                <option value="" disabled selected>
                  Select a question number
                </option>
                {questionBank[selectedCategory].map((_, index) => (
                  <option key={index} value={index}>
                    Question {index + 1}
                  </option>
                ))}
              </select>
              <label htmlFor="questionSelect">Questions</label>
            </div>
          </div>
        )}

        {/* Question Display + Answer Input */}
        {selectedQuestion && (
          <div className="mt-4">
            <h4>{selectedQuestion}</h4>
            <textarea
              className="form-control mt-2"
              placeholder="Type your answer here..."
              value={answer}
              onChange={handleAnswerChange}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>

            {submitted && (
  <div className="mt-3">
    <div className="alert alert-success">
      Your answer has been submitted!
    </div>
    <button
      type="button"
      className="btn btn-secondary mt-2"
      onClick={() => {
        setSelectedQuestionIndex(null);
        setAnswer('');
        setSubmitted(false);
      }}
    >
      Next Question
    </button>
  </div>
)}
          </div>
        )}
      </form>
    </div>
  );
}

export default Questions;
