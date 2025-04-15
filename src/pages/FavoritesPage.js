// src/pages/FavoritesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropertyList from '../components/PropertyList/PropertyList';


const MAX_COMPARE_ITEMS = 3; // Consistency

// Receive props including comparison props and onOpenCompare
const FavoritesPage = ({
    properties,
    favorites,
    onToggleFavorite,
    comparisonList,
    onToggleComparison,
    onOpenCompare // Handler to open comparison modal
}) => {

    // Filter the main properties list to get only the favorited items
    const favoriteProperties = properties.filter(property =>
        favorites.includes(property.id)
    );

    // Determine if compare button should be enabled
    const canCompare = comparisonList.length >= 2 && comparisonList.length <= MAX_COMPARE_ITEMS;

    return (
        <div className="favorites-page-container page-container"> {/* Added generic page-container class */}
            <h1 className="page-title">Your Saved Properties</h1>

            {/* Add compare button only if there are favorites */}
            {favoriteProperties.length > 0 && (
                 <div className="page-controls"> {/* Container for controls */}
                    <div className="control-group compare-button-group">
                        <button
                            className="btn btn-secondary"
                            onClick={onOpenCompare}
                            disabled={!canCompare}
                            title={!canCompare ? `Select ${MAX_COMPARE_ITEMS === 3 ? '2 or 3' : `2 to ${MAX_COMPARE_ITEMS}`} properties to compare` : 'Compare selected properties'}
                        >
                            Compare ({comparisonList.length})
                        </button>
                    </div>
                 </div>
            )}


            {/* Check if there are any favorite properties */}
            {favoriteProperties.length > 0 ? (
                // If yes, render the PropertyList
                <PropertyList
                    properties={favoriteProperties}
                    favorites={favorites} // Pass favorites down for correct heart status
                    onToggleFavorite={onToggleFavorite} // Pass toggle function down
                    comparisonList={comparisonList} // Pass comparison list
                    onToggleComparison={onToggleComparison} // Pass comparison toggle
                />
            ) : (
                // If no favorites, display a message
                <div className="empty-state-message">
                    <p>You haven't saved any properties yet.</p>
                    <Link to="/properties" className="btn btn-primary">
                        Browse Properties
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;

// Optional: Add FavoritesPage.css or use generic page styles
/* src/pages/FavoritesPage.css or shared page CSS */
/*
.page-container {
    padding: 20px 0; // Consistent vertical padding
}
.page-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.2rem;
    color: var(--text-primary);
    font-weight: 600;
}
.page-subtitle { // Used on PropertiesPage
    text-align: center;
    margin-bottom: 20px;
    font-weight: normal;
    color: var(--text-secondary);
    font-size: 1.2rem;
}
.page-subtitle em {
    color: var(--text-accent);
    font-style: normal;
}
.page-controls {
    display: flex;
    justify-content: flex-end; // Align compare button to the right
    margin-bottom: 20px;
    padding: 0 10px; // Add slight padding
}
.empty-state-message {
    text-align: center;
    margin-top: 50px;
    color: var(--text-secondary);
    background-color: var(--background-secondary);
    padding: 30px;
    border-radius: 8px;
    border: 1px solid var(--border-primary);
}
.empty-state-message p {
    margin-bottom: 20px;
    font-size: 1.1rem;
}
*/