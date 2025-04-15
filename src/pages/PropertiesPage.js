// src/pages/PropertiesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyList from '../components/PropertyList/PropertyList';
import './PropertiesPage.css'; // Ensure CSS is imported

const MAX_COMPARE_ITEMS = 3; // Use the same constant as App.js

// Receive new props: comparisonList, onToggleComparison, onOpenCompare
const PropertiesPage = ({
    properties,
    favorites,
    onToggleFavorite,
    comparisonList,
    onToggleComparison,
    onOpenCompare // Handler to open the comparison modal
}) => {
    // --- State and Effects for Search, Filter, Sort ---
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [displayedProperties, setDisplayedProperties] = useState(properties);
    const [sortOption, setSortOption] = useState('default');
    const [minBedrooms, setMinBedrooms] = useState(0);
    
    // New Filter States
    const [showFilters, setShowFilters] = useState(false);
    const [locationFilters, setLocationFilters] = useState({
        Ganj: false,
        'Nehru Colony': false,
        'Railway Station': false,
        'Mandi Road': false,
        'Chanakyapuri': false,
        'Cresent': false
    });
    const [bhkFilters, setBhkFilters] = useState({
        '1 BHK': false,
        '2 BHK': false,
        '3 BHK': false
    });
    const [furnished, setFurnished] = useState({
        'Yes': false,
        'No': false
    });
    const [tenantPreference, setTenantPreference] = useState({
        'Family': false,
        'Bachelor': false,
        'Both': false
    });
    const [priceRange, setPriceRange] = useState({
        min: '',
        max: ''
    });
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    const handleLocationChange = (location) => {
        setLocationFilters({
            ...locationFilters,
            [location]: !locationFilters[location]
        });
    };

    const handleBhkChange = (bhk) => {
        setBhkFilters({
            ...bhkFilters,
            [bhk]: !bhkFilters[bhk]
        });
    };

    const handleFurnishedChange = (option) => {
        setFurnished({
            ...furnished,
            [option]: !furnished[option]
        });
    };

    const handleTenantPreferenceChange = (preference) => {
        setTenantPreference({
            ...tenantPreference,
            [preference]: !tenantPreference[preference]
        });
    };

    const handlePriceInputChange = (field, value) => {
        setPriceRange({
            ...priceRange,
            [field]: value
        });
        setSelectedPriceRange(null);
    };

    const handlePriceRangeSelect = (range) => {
        setSelectedPriceRange(range);
        
        // Parse the price range string
        const [min, max] = range.split(' - ').map(price => {
            return parseInt(price.replace(/[₹k]/g, '')) * (price.includes('k') ? 1000 : 1);
        });
        
        setPriceRange({
            min: min / 1000, // Convert to thousands for display
            max: max / 1000
        });
    };

    const applyFilters = useCallback(() => {
        let result = [...properties]; // Start with full list

        // Apply Search Filter
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.address.toLowerCase().includes(lowerCaseQuery) ||
                (p.description && p.description.toLowerCase().includes(lowerCaseQuery))
            );
        }

        // Apply Bedroom Filter (old)
        if (minBedrooms > 0) {
            result = result.filter(p => p.bedrooms >= minBedrooms);
        }

        // Apply Location Filters
        const selectedLocations = Object.keys(locationFilters).filter(loc => locationFilters[loc]);
        if (selectedLocations.length > 0) {
            result = result.filter(p => {
                // Check if property's location matches any of the selected locations
                return selectedLocations.includes(p.location);
            });
        }

        // Apply BHK Filters
        const selectedBhks = Object.keys(bhkFilters).filter(bhk => bhkFilters[bhk]);
        if (selectedBhks.length > 0) {
            result = result.filter(p => {
                // Extract the BHK number from the filter option (e.g., "1 BHK" -> 1)
                const bhkValues = selectedBhks.map(bhk => parseInt(bhk.split(' ')[0]));
                return bhkValues.includes(p.bhk);
            });
        }

        // Apply Furnished Filters
        const selectedFurnished = Object.keys(furnished).filter(f => furnished[f]);
        if (selectedFurnished.length > 0) {
            result = result.filter(p => {
                return selectedFurnished.includes(p.furnished);
            });
        }

        // Apply Tenant Preference Filters
        const selectedPreferences = Object.keys(tenantPreference).filter(pref => tenantPreference[pref]);
        if (selectedPreferences.length > 0) {
            result = result.filter(p => {
                return selectedPreferences.includes(p.tenant);
            });
        }

        // Apply Price Range Filter
        if (priceRange.min !== '' || priceRange.max !== '') {
            result = result.filter(p => {
                const min = priceRange.min !== '' ? parseFloat(priceRange.min) * 1000 : 0;
                const max = priceRange.max !== '' ? parseFloat(priceRange.max) * 1000 : Infinity;
                return p.price >= min && p.price <= max;
            });
        }

        // Apply Sorting
        switch (sortOption) {
            case 'price-asc': result.sort((a, b) => a.price - b.price); break;
            case 'price-desc': result.sort((a, b) => b.price - a.price); break;
            case 'beds-asc': result.sort((a, b) => a.bedrooms - b.bedrooms); break;
            case 'beds-desc': result.sort((a, b) => b.bedrooms - a.bedrooms); break;
            default: result.sort((a, b) => a.id - b.id); break;
        }

        setDisplayedProperties(result); // Update the list to display
    }, [properties, sortOption, minBedrooms, searchQuery, locationFilters, bhkFilters, furnished, tenantPreference, priceRange]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]); // Now we only need applyFilters as a dependency since it includes all the other dependencies

    // --- Event Handlers for Controls ---
    const handleSortChange = (event) => setSortOption(event.target.value);
    const handleBedroomChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setMinBedrooms(isNaN(value) ? 0 : value);
    };

    // Determine if compare button should be enabled
    const canCompare = comparisonList.length >= 2 && comparisonList.length <= MAX_COMPARE_ITEMS;

    // --- Render JSX ---
    return (
        <div className="properties-page-container">
            {/* Page Headings */}
            {searchQuery && (
                <h2 className="page-subtitle">
                    Showing results for: <em>"{searchQuery}"</em>
                </h2>
            )}
            {!searchQuery && (
                <h1 className="page-title">All Properties</h1>
            )}

            {/* Filter Toggle and Filters Section */}
            <div className="filter-section">
                <button 
                    className="filter-toggle-btn"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {showFilters && (
                    <div className="filters-container">
                        <h3 className="filters-title">Filters</h3>
                        
                        {/* Location Filters */}
                        <div className="filter-group">
                            <h4>Location</h4>
                            <div className="checkbox-group">
                                {Object.keys(locationFilters).map(location => (
                                    <label key={location} className="checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            checked={locationFilters[location]} 
                                            onChange={() => handleLocationChange(location)}
                                        />
                                        {location}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* BHK Filters */}
                        <div className="filter-group">
                            <h4>BHK</h4>
                            <div className="checkbox-group">
                                {Object.keys(bhkFilters).map(bhk => (
                                    <label key={bhk} className="checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            checked={bhkFilters[bhk]} 
                                            onChange={() => handleBhkChange(bhk)}
                                        />
                                        {bhk}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Furnished Filters */}
                        <div className="filter-group">
                            <h4>Furnished</h4>
                            <div className="checkbox-group">
                                {Object.keys(furnished).map(option => (
                                    <label key={option} className="checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            checked={furnished[option]} 
                                            onChange={() => handleFurnishedChange(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tenant Preference Filters */}
                        <div className="filter-group">
                            <h4>Tenant Preference</h4>
                            <div className="checkbox-group">
                                {Object.keys(tenantPreference).map(preference => (
                                    <label key={preference} className="checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            checked={tenantPreference[preference]} 
                                            onChange={() => handleTenantPreferenceChange(preference)}
                                        />
                                        {preference}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filters */}
                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <div className="price-range-inputs">
                                <div className="price-input-group">
                                    <input 
                                        type="number" 
                                        placeholder="Min (₹)" 
                                        value={priceRange.min} 
                                        onChange={(e) => handlePriceInputChange('min', e.target.value)}
                                    />
                                    <span>to</span>
                                    <input 
                                        type="number" 
                                        placeholder="Max (₹)" 
                                        value={priceRange.max} 
                                        onChange={(e) => handlePriceInputChange('max', e.target.value)}
                                    />
                                </div>
                                
                                <button 
                                    className="apply-btn"
                                    onClick={applyFilters}
                                >
                                    Apply
                                </button>
                            </div>
                            
                            <div className="price-range-presets">
                                <button 
                                    className={`preset-btn ${selectedPriceRange === '₹7k - ₹12k' ? 'active' : ''}`}
                                    onClick={() => handlePriceRangeSelect('₹7k - ₹12k')}
                                >
                                    ₹7k - ₹12k
                                </button>
                                <button 
                                    className={`preset-btn ${selectedPriceRange === '₹12k - ₹17k' ? 'active' : ''}`}
                                    onClick={() => handlePriceRangeSelect('₹12k - ₹17k')}
                                >
                                    ₹12k - ₹17k
                                </button>
                                <button 
                                    className={`preset-btn ${selectedPriceRange === '₹17k - ₹22k' ? 'active' : ''}`}
                                    onClick={() => handlePriceRangeSelect('₹17k - ₹22k')}
                                >
                                    ₹17k - ₹22k
                                </button>
                                <button 
                                    className={`preset-btn ${selectedPriceRange === '₹22k - ₹26k' ? 'active' : ''}`}
                                    onClick={() => handlePriceRangeSelect('₹22k - ₹26k')}
                                >
                                    ₹22k - ₹26k
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Filter, Sort, and Compare Controls */}
            <div className="properties-controls">
                {/* Bedroom Filter */}
                <div className="control-group">
                    <label htmlFor="bedrooms">Min Bedrooms:</label>
                    <select id="bedrooms" value={minBedrooms} onChange={handleBedroomChange}>
                        <option value="0">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                    </select>
                </div>

                {/* Sort Filter */}
                <div className="control-group">
                    <label htmlFor="sort">Sort By:</label>
                    <select id="sort" value={sortOption} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="beds-asc">Bedrooms (Low to High)</option>
                        <option value="beds-desc">Bedrooms (High to Low)</option>
                    </select>
                </div>

                {/* Compare Button */}
                <div className="control-group compare-button-group">
                    <button
                        className="btn btn-secondary" // Or a distinct style
                        onClick={onOpenCompare}
                        disabled={!canCompare}
                        title={!canCompare ? `Select ${MAX_COMPARE_ITEMS === 3 ? '2 or 3' : `2 to ${MAX_COMPARE_ITEMS}`} properties to compare` : 'Compare selected properties'}
                    >
                        Compare ({comparisonList.length})
                    </button>
                </div>
            </div>

            {/* Property List */}
            <PropertyList
                properties={displayedProperties}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                comparisonList={comparisonList} // Pass down comparison list
                onToggleComparison={onToggleComparison} // Pass down toggle function
            />
        </div>
    );
};

export default PropertiesPage;