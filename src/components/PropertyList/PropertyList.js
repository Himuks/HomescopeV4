// src/components/PropertyList/PropertyList.js
import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyList.css';

// Accept all necessary props from parent pages
const PropertyList = ({
    properties,
    favorites,
    onToggleFavorite,
    comparisonList,
    onToggleComparison
}) => {
    // Handle case where no properties match filters/search
    if (!properties || properties.length === 0) {
        return <p className="property-list-empty">No properties found matching your criteria.</p>;
    }

    // Render the list using PropertyCard for each item
    return (
        <div className="property-list-container">
            {properties.map((property) => {
                // Determine favorite status for the heart icon
                const isFavorite = favorites.includes(property.id);
                // Determine comparison status for the checkbox
                const isSelectedForCompare = comparisonList.includes(property.id);

                return (
                    // Pass all relevant props down to each card
                    <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                        isSelectedForCompare={isSelectedForCompare}
                        onToggleComparison={onToggleComparison}
                    />
                );
            })}
        </div>
    );
};

export default PropertyList;