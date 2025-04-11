import React from 'react';
import '../styles/AiInsightsPage.css'; // Assuming you have a CSS file for styling

const AiInsightsPage = () => {
  return (
    <div className="ai-page-container">
      <h1 className="ai-page-title">AI-Powered Restaurant Insights</h1>
      <p className="ai-page-description">Ask any question about your data and get intelligent summaries, predictions, or suggestions powered by AI.</p>

      <div className="ai-chat-box">
        <textarea
          placeholder="Ask AI anything about restaurant data..."
          className="ai-textarea"
        />
        <div className="ai-buttons-wrapper">
          <button className="ai-submit-btn">Generate Insight</button>
          <button className="ai-voice-btn" aria-label="Activate voice assistant">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 8a7 7 0 0 0 7-7h2a9 9 0 0 1-18 0h2a7 7 0 0 0 7 7zm-1-7h2v5h-2z"/>
            </svg>
          </button>
        </div>

      </div>

      {/* You can dynamically show AI-generated output here */}
      <div className="ai-output-box">
        <h3>AI Response:</h3>
        <p>Top-rated restaurants in Bangalore are mainly South Indian and located in Indiranagar.</p>
      </div>
    </div>
  );
};

export default AiInsightsPage;