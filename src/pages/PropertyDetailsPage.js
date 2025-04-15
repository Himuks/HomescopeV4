// src/pages/PropertyDetailsPage.js
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
// --- Import Icons ---
import { FaBed, FaBath } from 'react-icons/fa'; // Font Awesome icons
import { MdSquareFoot } from 'react-icons/md'; // Material Design icons
// --- End Icon Import ---
import { getRoomImageByIndex } from '../utils/imageUtils'; // Import our image utility
import './PropertyDetailsPage.css';

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
};

const PropertyDetailsPage = ({ properties }) => {
    const { propertyId } = useParams();
    const property = properties.find(p => p.id === parseInt(propertyId));

    // Move useMemo outside of the conditional branches
    const displayImageUrl = useMemo(() => {
        if (!property) return '';
        
        const { id, imageUrl } = property;
        if (imageUrl) return imageUrl;
        return getRoomImageByIndex(id || 0); // Use ID to get consistent image for same property
    }, [property]);

    if (!property) {
        // ... (keep not found section) ...
        return (
          <div className="property-details-not-found">
            <h2>Property Not Found</h2>
            <p>Sorry, we couldn't find the property you're looking for.</p>
            <Link to="/properties">Back to Properties</Link>
          </div>
        );
    }

    const { id, imageUrl, price, address, bedrooms, bathrooms, sqft, description } = property;

    return (
        <div className="property-details-container">
            {/* Image Section (Consider making it a gallery later) */}
            <div className="property-details-image-section">
                <img 
                    src={displayImageUrl} 
                    alt={`View of ${address}`} 
                    className="details-main-image"
                    onError={(e) => {
                        // Fallback if the image URL fails to load
                        e.target.src = getRoomImageByIndex(id || 0);
                    }}
                />
                {/* Placeholder for more images/gallery controls */}
            </div>

            {/* Info Section */}
            <div className="property-details-info-section">
                <h1 className="details-address">{address}</h1>
                <p className="details-price">{formatPrice(price)}</p>

                {/* Specs Section with Icons */}
                <div className="details-specs">
                    <div className="spec-item">
                        <FaBed className="spec-icon" />
                        <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="spec-item">
                        <FaBath className="spec-icon" />
                        <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                    {sqft && (
                        <div className="spec-item">
                           <MdSquareFoot className="spec-icon" />
                           <span>{sqft.toLocaleString('en-US')} sqft</span>
                        </div>
                    )}
                </div>

                {/* Description Section */}
                <div className="details-description">
                    <h3>Description</h3>
                    <p>{description || 'No description available.'}</p>
                </div>

                 {/* Features Section (Placeholder) */}
                 {/* <div className="details-features">
                     <h3>Features</h3>
                     <ul>
                         <li>Feature 1</li>
                         <li>Feature 2</li>
                     </ul>
                 </div> */}

                 {/* Map Section (Placeholder) */}
                 {/* <div className="details-map">
                    <h3>Location</h3>
                    {/* Map component will go here */}
                 {/* </div> */}

                <Link to="/properties" className="back-link">← Back to Properties</Link>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;