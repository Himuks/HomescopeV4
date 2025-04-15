// src/components/ComparisonView.js
import React from 'react';
import './ComparisonView.css'; // Create this CSS file

// Helper to format price (same as elsewhere)
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
};

const ComparisonView = ({ propertiesToCompare }) => {
  // Define the features/rows you want to display
  const features = [
    { key: 'imageUrl', label: 'Image' },
    { key: 'price', label: 'Price', format: formatPrice },
    { key: 'address', label: 'Address' },
    { key: 'bedrooms', label: 'Bedrooms' },
    { key: 'bathrooms', label: 'Bathrooms' },
    { key: 'sqft', label: 'Sqft', format: (val) => val ? val.toLocaleString('en-US') : '-' },
    { key: 'description', label: 'Description' },
    // Add more features if needed
  ];

  if (!propertiesToCompare || propertiesToCompare.length < 2) {
    return <p className="comparison-message">Please select at least 2 properties to compare.</p>;
  }

  return (
    <div className="comparison-view">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th> {/* Header for feature names */}
            {/* Create a header cell for each property */}
            {propertiesToCompare.map(property => (
              <th key={property.id}>
                {/* Display address or a shorter identifier */}
                {property.address.split(',')[0]} {/* Show first part of address */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the defined features to create rows */}
          {features.map(feature => (
            <tr key={feature.key}>
              {/* First cell is the feature label */}
              <td>{feature.label}</td>
              {/* Subsequent cells display the data for each property */}
              {propertiesToCompare.map(property => (
                <td key={property.id}>
                  {feature.key === 'imageUrl' ? (
                    <img src={property[feature.key]} alt={property.address} className="compare-img" />
                  ) : (
                    // Use formatter if defined, otherwise display raw value or '-'
                    feature.format
                      ? feature.format(property[feature.key])
                      : property[feature.key] || '-'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonView;