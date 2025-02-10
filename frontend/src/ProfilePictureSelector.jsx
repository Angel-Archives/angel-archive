import React, { useEffect, useState } from 'react';

export const ProfilePictureSelector = () => {
  const [images, setImages] = useState([]);  // Store images from the backend
  const [selectedImage, setSelectedImage] = useState(null);  // Store the selected image ID
  const [loading, setLoading] = useState(true);  // Loading state for images
  const [error, setError] = useState(null);  // Error state

  // Fetch profile pictures from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/profile-pictures');
        if (!response.ok) {
          throw new Error('Failed to fetch profile pictures');
        }
        const data = await response.json();
        setImages(data.map(img => ({
          id: img.id,
          image_url: img.image_profile_pic // Correct field
        })));
      } catch (err) {
        setError('Error fetching images: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImages();
  }, []);

  // Handle profile picture selection
  const handleProfilePictureSelection = async (imageId) => {
    setSelectedImage(imageId);  // Update selected image ID

    try {
      const response = await fetch('/api/users/update-profile-picture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Profile picture updated successfully!');
      } else {
        alert('Error updating profile picture.');
      }
    } catch (error) {
      alert('Error updating profile picture: ' + error.message);
    }
  };

  // Loading or error states
  if (loading) {
    return <p>Loading profile pictures...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Select Your Profile Picture</h2>
      <div className="image-gallery">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.image_url}
            alt={`Profile ${image.id}`}
            className="profile-picture"
            onClick={() => handleProfilePictureSelection(image.id)}
            style={{
              border: selectedImage === image.id ? '3px solid #4CAF50' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};
