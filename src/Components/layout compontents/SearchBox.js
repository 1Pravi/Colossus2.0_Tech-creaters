import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import '../../styles/layout styles/SearchBox.css';

const suggestionsList = [
  "Restaurant Insights",
  "",
];

const AdvancedSearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = suggestionsList.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      selectSuggestion(suggestions[activeIndex]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setActiveIndex(-1);

    if (suggestion === "Top-Rated Restaurants") {
      navigate("/top-rated-restaurants");
    } else if (suggestion === "Popular Cuisines") {
      navigate("/popular-cuisines");  // Navigate to the Popular Cuisines page
    } else if (suggestion === "Famous Foods") {
      navigate("/famous-foods");  // Navigate to the Famous Foods page
    }

    // Add more conditions for other suggestions if needed
  };
  const clearInput = () => {
    setQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const openAiWindow = () => {
    navigate("/ai-insights");
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search insights..."
        className="search-input"
      />

      {location.pathname === "/overview" && (
       <button className='ai-window-open-button' onClick={openAiWindow}>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/>
         <circle cx="8" cy="9" r="1"/>
         <circle cx="16" cy="9" r="1"/>
         <path d="M12 16c-1.5 0-2.8-.8-3.5-2h7c-.7 1.2-2 2-3.5 2z"/>
         <path d="M12 16v2"/>
         <path d="M12 13v1"/>
         <path d="M7 13h10"/>
       </svg>
        </button>
      )}

      {/* Clear icon */}
      {query && (
        <span className="clear-icon" onClick={clearInput}>
          ✖
        </span>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdvancedSearchBox;
