import { useState } from "react";
import { Counter } from "../src/Counter";

export function SonnyAngelCard({ id, name, imageUrl, onBookmarkAdd, favList, isoList, wttList }) {
  // State to track the visibility of the bookmark options
  const [showBookmarkOptions, setShowBookmarkOptions] = useState(false);

  // Function to handle the addition/removal of a bookmark to the respective list
  const handleBookmarkClick = (type) => {
    onBookmarkAdd(type, id, name);  // Toggle the bookmark in the parent component's list
  };

  return (
    <div
      style={{ backgroundColor: "pink", position: "relative" }} 
      className="sonny-angel"
      onMouseEnter={() => setShowBookmarkOptions(true)}
      onMouseLeave={() => setShowBookmarkOptions(false)}
    >
      <p className="name">{name}</p>
      
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
      />

      {/* Bookmark Options */}
      {showBookmarkOptions && (
        <div
          style={{
            position: "absolute", 
            top: "10px", 
            right: "10px", 
            backgroundColor: "white", 
            border: "1px solid #ccc", 
            borderRadius: "8px", 
            padding: "8px", 
            display: "flex",
            flexDirection: "column", 
            gap: "4px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
          }}
        >
          <button onClick={() => handleBookmarkClick('FAV')}>
            FAV
          </button>
          <button onClick={() => handleBookmarkClick('ISO')}>
            ISO
          </button>
          <button onClick={() => handleBookmarkClick('WTT')}>
            WTT
          </button>
        </div>
      )}

      <Counter />
    </div>
  );
}
