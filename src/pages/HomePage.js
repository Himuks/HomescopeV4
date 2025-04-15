// src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero/Hero';
import PropertyList from '../components/PropertyList/PropertyList';


// Receive all necessary props from App.js
const HomePage = ({
    properties,
    favorites,
    onToggleFavorite,
    comparisonList,
    onToggleComparison
}) => {
    // Filter featured properties (e.g., first 4 or based on a flag)
    const featuredProperties = properties.slice(0, 4);

    return (
        // Use Fragment or a main div if needed
        <>
            <Hero />
            <section className="featured-properties">
                <h2 className="section-title">Featured Properties</h2>
                {/* Pass all relevant props down to PropertyList */}
                <PropertyList
                    properties={featuredProperties}
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                    comparisonList={comparisonList}
                    onToggleComparison={onToggleComparison}
                />
            </section>
        </>
    );
};

export default HomePage;

// Optional: Add HomePage.css for specific styles
/* src/pages/HomePage.css */
/*
.featured-properties {
    padding: 20px 0;
    margin-top: 30px; // Add space below Hero
}

.section-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
    color: var(--text-primary);
    font-weight: 600;
}
*/