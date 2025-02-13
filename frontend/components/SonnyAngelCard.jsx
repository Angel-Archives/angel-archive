import { useState } from "react";
import { Counter } from "./Counter";

export function SonnyAngelCard({ id, name, imageUrl, onBookmarkAdd, userId }) {
  const [showBookmarkOptions, setShowBookmarkOptions] = useState(false);

  const handleBookmarkClick = (type) => {
      onBookmarkAdd(type, id, name); 
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
              style={{
                  width: '100%',          
                  height: 'auto',         
                  objectFit: 'cover',     
                  borderRadius: '8px',    
              }}
          />

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
                  <button onClick={() => handleBookmarkClick('FAV')}>FAV</button>
                  <button onClick={() => handleBookmarkClick('ISO')}>ISO</button>
                  <button onClick={() => handleBookmarkClick('WTT')}>WTT</button>
              </div>
          )}

          <Counter userId={userId} angelId={id} angelName={name} />
      </div>
  );
}
