"use client";

import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import axiosInstance from "@/config/axios";

const AutoSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestions = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`search?q=${searchTerm}`);
      const data = await response.data;
      const names = data.map((item: { name: string }) => item.name);
      setSuggestions(names);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 600);

  useEffect(() => {
    if (query) {
      debouncedFetchSuggestions(query);
    } else {
      setSuggestions([]);
    }

    // Cleanup function để hủy bỏ debounce khi component unmount
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", position: "relative" }}>
      <input
        className="text-black"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Google or type a URL"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "24px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      />
      {loading && (
        <div style={{ textAlign: "center", padding: "10px" }}>Loading...</div>
      )}
      {suggestions.length > 0 && !loading && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "#fff",
            zIndex: 1000,
            position: "absolute",
            width: "100%",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-black"
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSearch;
