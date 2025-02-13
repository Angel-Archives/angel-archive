import { useState } from "react";
import { Counter } from "./Counter";
import "../src/App.css"

export function SonnyAngelCard({ id, name, imageUrl, onBookmarkAdd, userId, initialCount }) {
  const [showBookmarkOptions, setShowBookmarkOptions] = useState(false);

  const handleBookmarkClick = (type) => {
      onBookmarkAdd(type, id, name); 
  };

  return (
      <div
          className="sonny-angel-card"
          onMouseEnter={() => setShowBookmarkOptions(true)}
          onMouseLeave={() => setShowBookmarkOptions(false)}
      >
          <p className="name">{name}</p>

          <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              className="image"
          />

          {showBookmarkOptions && (
              <div className="bookmark-options">
                  <button className="bookmark-btn" onClick={() => handleBookmarkClick('FAV')}>FAV</button>
                  <button className="bookmark-btn" onClick={() => handleBookmarkClick('ISO')}>ISO</button>
                  <button className="bookmark-btn" onClick={() => handleBookmarkClick('WTT')}>WTT</button>
              </div>
          )}

          <Counter userId={userId} angelId={id} angelName={name} initialCount={initialCount} />
      </div>
  );
}
