// src/components/PropertyCard/PropertyCard.js
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Favorite icons
import { getRoomImageByIndex } from '../../utils/imageUtils'; // Import our image utility
import './PropertyCard.css'; // Ensure CSS is imported

// Helper to format currency (ensure consistency, maybe move to utils later)
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

// Accept all necessary props from PropertyList
const PropertyCard = ({
    property,
    isFavorite,
    onToggleFavorite,
    isSelectedForCompare,
    onToggleComparison
}) => {
    // Destructure property details for easier use
    const { 
        id, 
        imageUrl, 
        price, 
        address, 
        bedrooms, 
        sqft, 
        bhk, 
        rent, 
        size, 
        floor, 
        areaType, 
        location, 
        furnished, 
        tenant
    } = property;

    // Use a deterministic room image based on property ID if no imageUrl is provided
    const displayImageUrl = useMemo(() => {
        if (imageUrl) return imageUrl;
        return getRoomImageByIndex(id || 0); // Use ID to get consistent image for same property
    }, [imageUrl, id]);

    // Handler for the favorite button click
    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop click from bubbling up to the Link
        onToggleFavorite(id); // Call the toggle function passed from App.js
    };

    // Handler for the comparison checkbox change
    const handleCompareChange = (e) => {
        e.stopPropagation(); // Stop click from bubbling up to the Link
        onToggleComparison(id); // Call the toggle function passed from App.js
    };

    // Handler to prevent clicks on the checkbox container from navigating
    const handleCheckboxContainerClick = (e) => {
        e.stopPropagation();
    }

    return (
        // Card is wrapped in a Link for navigation
        <Link to={`/property/${id}`} className="property-card-link">
            <div className="property-card">

                {/* --- Comparison Checkbox --- */}
                {/* Wrap input and label in a div to handle click stopping */}
                <div className="compare-checkbox-container" onClick={handleCheckboxContainerClick}>
                    <input
                        type="checkbox"
                        id={`compare-${id}`} // Unique ID for the label association
                        className="compare-checkbox"
                        checked={isSelectedForCompare}
                        onChange={handleCompareChange}
                        aria-label="Select property for comparison" // Accessibility label
                    />
                    {/* Label visually represents the checkbox */}
                    <label
                        htmlFor={`compare-${id}`}
                        className="compare-checkbox-label"
                        title={isSelectedForCompare ? 'Remove from comparison' : 'Add to comparison'}
                    >
                        {/* Visual checkmark is handled by CSS */}
                    </label>
                </div>

                {/* --- Favorite Button --- */}
                <button
                    className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />} {/* Conditional Icon */}
                </button>

                {/* Property Image */}
                <img 
                    src={displayImageUrl} 
                    alt={`Property at ${address}`} 
                    className="property-card-image" 
                    onError={(e) => {
                        // Fallback if the image URL fails to load
                        e.target.src = getRoomImageByIndex(id || 0);
                    }}
                />

                {/* Property Content */}
                <div className="property-card-content">
                    <h3 className="property-card-price">{rent || formatPrice(price)}</h3>
                    <p className="property-card-address">{address}</p>
                    <div className="property-card-details">
                        <span>{bhk} BHK</span>
                        <span> • </span>
                        <span>{size} sqft</span>
                    </div>
                    <div className="property-card-extra-details">
                        <span className="location-badge">{location}</span>
                        <span className={`furnished-badge ${furnished === 'Yes' ? 'furnished' : 'unfurnished'}`}>
                            {furnished}
                        </span>
                        <span className="tenant-badge">{tenant}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;