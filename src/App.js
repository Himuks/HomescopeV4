// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import ComparisonView from './components/ComparisonView'; // <-- Import ComparisonView (will create)
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import MortgageCalculator from './components/MortgageCalculator/MortgageCalculator';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import FavoritesPage from './pages/FavoritesPage'; // Make sure this is imported
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// Key for local storage
const FAVORITES_STORAGE_KEY = 'homeScopeFavorites';
const MAX_COMPARE_ITEMS = 3; // Set max comparison limit

// Property Data
const properties = [
  {id: 1, bhk: 2, rent: "₹12,000", size: "900", floor: "Ground", areaType: "Super", location: "Ganj", furnished: "Yes", tenant: "Family", phone: "+919876543210"},
  {id: 2, bhk: 3, rent: "₹18,000", size: "1500", floor: "1-1 of 2", areaType: "Good", location: "Ganj", furnished: "No", tenant: "Both", phone: "+918765432109"},
  {id: 3, bhk: 1, rent: "₹8,000", size: "600", floor: "Ground", areaType: "Normal", location: "Ganj", furnished: "Yes", tenant: "Bachelor", phone: "+917654321098"},
  {id: 4, bhk: 2, rent: "₹10,000", size: "1000", floor: "1-1 of 1", areaType: "Moderate", location: "Nehru Colony", furnished: "No", tenant: "Both", phone: "+916543210987"},
  {id: 5, bhk: 3, rent: "₹15,000", size: "1400", floor: "1-1 of 3", areaType: "Normal", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+915432109876"},
  {id: 6, bhk: 1, rent: "₹7,000", size: "500", floor: "Ground", areaType: "Moderate", location: "Nehru Colony", furnished: "No", tenant: "Bachelor", phone: "+914321098765"},
  {id: 7, bhk: 2, rent: "₹9,000", size: "950", floor: "1-1 of 2", areaType: "Moderate", location: "Railway Station", furnished: "No", tenant: "Family", phone: "+913210987654"},
  {id: 8, bhk: 3, rent: "₹20,000", size: "1700", floor: "1-1 of 3", areaType: "Good", location: "Railway Station", furnished: "Yes", tenant: "Both", phone: "+912109876543"},
  {id: 9, bhk: 1, rent: "₹7,500", size: "650", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "Yes", tenant: "Bachelor", phone: "+911098765432"},
  {id: 10, bhk: 2, rent: "₹12,000", size: "1100", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+919087654321"},
  {id: 11, bhk: 1, rent: "₹8,500", size: "750", floor: "Ground", areaType: "Normal", location: "Mandi Road", furnished: "Yes", tenant: "Both", phone: "+918076543219"},
  {id: 12, bhk: 3, rent: "₹17,000", size: "1600", floor: "1-1 of 3", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+917065432198"},
  {id: 13, bhk: 2, rent: "₹14,000", size: "1300", floor: "Ground", areaType: "Super", location: "Chanakyapuri", furnished: "Yes", tenant: "Family", phone: "+916054321987"},
  {id: 14, bhk: 3, rent: "₹20,000", size: "1800", floor: "1-1 of 2", areaType: "Good", location: "Chanakyapuri", furnished: "No", tenant: "Both", phone: "+915043219876"},
  {id: 15, bhk: 1, rent: "₹9,500", size: "700", floor: "Ground", areaType: "Good", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+914032198765"},
  {id: 16, bhk: 2, rent: "₹15,000", size: "1200", floor: "1-1 of 2", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Family", phone: "+913021987654"},
  {id: 17, bhk: 3, rent: "₹22,000", size: "2000", floor: "1-1 of 3", areaType: "Good", location: "Cresent", furnished: "Yes", tenant: "Both", phone: "+912019876543"},
  {id: 18, bhk: 1, rent: "₹10,000", size: "800", floor: "Ground", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Bachelor", phone: "+911234567890"},
  {id: 19, bhk: 2, rent: "₹13,000", size: "1350", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Both", phone: "+919345678901"},
  {id: 20, bhk: 3, rent: "₹24,000", size: "2200", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "Yes", tenant: "Family", phone: "+918456789012"},
  {id: 21, bhk: 1, rent: "₹8,000", size: "550", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "Yes", tenant: "Bachelor", phone: "+917567890123"},
  {id: 22, bhk: 3, rent: "₹21,000", size: "1900", floor: "1-1 of 2", areaType: "Super", location: "Ganj", furnished: "No", tenant: "Both", phone: "+916678901234"},
  {id: 23, bhk: 2, rent: "₹11,000", size: "1150", floor: "Ground", areaType: "Normal", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+915789012345"},
  {id: 24, bhk: 1, rent: "₹9,000", size: "720", floor: "1-1 of 2", areaType: "Good", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+914890123456"},
  {id: 25, bhk: 3, rent: "₹26,000", size: "2100", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+913901234567"},
  {id: 26, bhk: 2, rent: "₹12,000", size: "900", floor: "Ground", areaType: "Super", location: "Ganj", furnished: "Yes", tenant: "Family", phone: "+912190384756"},
  {id: 27, bhk: 3, rent: "₹18,000", size: "1500", floor: "1-1 of 2", areaType: "Good", location: "Ganj", furnished: "No", tenant: "Both", phone: "+913289574610"},
  {id: 28, bhk: 1, rent: "₹8,000", size: "600", floor: "Ground", areaType: "Normal", location: "Ganj", furnished: "Yes", tenant: "Bachelor", phone: "+914378659201"},
  {id: 29, bhk: 2, rent: "₹10,000", size: "1000", floor: "1-1 of 1", areaType: "Moderate", location: "Nehru Colony", furnished: "No", tenant: "Both", phone: "+915467928130"},
  {id: 30, bhk: 3, rent: "₹15,000", size: "1400", floor: "1-1 of 3", areaType: "Normal", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+916598017423"},
  {id: 31, bhk: 1, rent: "₹7,000", size: "500", floor: "Ground", areaType: "Moderate", location: "Nehru Colony", furnished: "No", tenant: "Bachelor", phone: "+917609123548"},
  {id: 32, bhk: 2, rent: "₹9,000", size: "950", floor: "1-1 of 2", areaType: "Moderate", location: "Railway Station", furnished: "No", tenant: "Family", phone: "+918710234659"},
  {id: 33, bhk: 3, rent: "₹20,000", size: "1700", floor: "1-1 of 3", areaType: "Good", location: "Railway Station", furnished: "Yes", tenant: "Both", phone: "+919821345760"},
  {id: 34, bhk: 1, rent: "₹7,500", size: "650", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "Yes", tenant: "Bachelor", phone: "+911932456871"},
  {id: 35, bhk: 2, rent: "₹12,000", size: "1100", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+912043567982"},
  {id: 36, bhk: 1, rent: "₹8,500", size: "750", floor: "Ground", areaType: "Normal", location: "Mandi Road", furnished: "Yes", tenant: "Both", phone: "+913154678093"},
  {id: 37, bhk: 3, rent: "₹17,000", size: "1600", floor: "1-1 of 3", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+914265789104"},
  {id: 38, bhk: 2, rent: "₹14,000", size: "1300", floor: "Ground", areaType: "Super", location: "Chanakyapuri", furnished: "Yes", tenant: "Family", phone: "+915376890215"},
  {id: 39, bhk: 3, rent: "₹20,000", size: "1800", floor: "1-1 of 2", areaType: "Good", location: "Chanakyapuri", furnished: "No", tenant: "Both", phone: "+916487901326"},
  {id: 40, bhk: 1, rent: "₹9,500", size: "700", floor: "Ground", areaType: "Good", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+917598012437"},
  {id: 41, bhk: 2, rent: "₹15,000", size: "1200", floor: "1-1 of 2", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Family", phone: "+918609123548"},
  {id: 42, bhk: 3, rent: "₹22,000", size: "2000", floor: "1-1 of 3", areaType: "Good", location: "Cresent", furnished: "Yes", tenant: "Both", phone: "+919710234659"},
  {id: 43, bhk: 1, rent: "₹10,000", size: "800", floor: "Ground", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Bachelor", phone: "+911821345760"},
  {id: 44, bhk: 2, rent: "₹13,000", size: "1350", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+912932456871"},
  {id: 45, bhk: 3, rent: "₹24,000", size: "2200", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "Yes", tenant: "Family", phone: "+913043567982"},
  {id: 46, bhk: 1, rent: "₹8,000", size: "550", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "Yes", tenant: "Bachelor", phone: "+914154678093"},
  {id: 47, bhk: 3, rent: "₹21,000", size: "1900", floor: "1-1 of 2", areaType: "Super", location: "Ganj", furnished: "No", tenant: "Both", phone: "+915265789104"},
  {id: 48, bhk: 2, rent: "₹11,000", size: "1150", floor: "Ground", areaType: "Normal", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+916376890215"},
  {id: 49, bhk: 1, rent: "₹9,000", size: "720", floor: "1-1 of 2", areaType: "Good", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+917487901326"},
  {id: 50, bhk: 3, rent: "₹26,000", size: "2100", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+918598012437"},
  {id: 51, bhk: 2, rent: "₹13,000", size: "1050", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "Yes", tenant: "Family", phone: "+919609123548"},
  {id: 52, bhk: 1, rent: "₹8,500", size: "680", floor: "Ground", areaType: "Normal", location: "Nehru Colony", furnished: "No", tenant: "Bachelor", phone: "+911710234659"},
  {id: 53, bhk: 3, rent: "₹24,000", size: "1950", floor: "1-1 of 3", areaType: "Good", location: "Railway Station", furnished: "Yes", tenant: "Both", phone: "+912821345760"},
  {id: 54, bhk: 2, rent: "₹12,000", size: "920", floor: "1-1 of 2", areaType: "Moderate", location: "Ganj", furnished: "No", tenant: "Family", phone: "+913932456871"},
  {id: 55, bhk: 1, rent: "₹7,500", size: "580", floor: "Ground", areaType: "Normal", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+914043567982"},
  {id: 56, bhk: 3, rent: "₹25,000", size: "2000", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+915154678093"},
  {id: 57, bhk: 2, rent: "₹11,000", size: "1000", floor: "1-1 of 2", areaType: "Moderate", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+916265789104"},
  {id: 58, bhk: 1, rent: "₹8,000", size: "650", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "No", tenant: "Bachelor", phone: "+917376890215"},
  {id: 59, bhk: 3, rent: "₹23,000", size: "1850", floor: "1-1 of 3", areaType: "Good", location: "Ganj", furnished: "Yes", tenant: "Both", phone: "+918487901326"},
  {id: 60, bhk: 2, rent: "₹13,000", size: "1100", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+919598012437"},
  {id: 61, bhk: 1, rent: "₹9,000", size: "700", floor: "Ground", areaType: "Normal", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+911609123548"},
  {id: 62, bhk: 3, rent: "₹26,000", size: "2050", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+912710234659"},
  {id: 63, bhk: 2, rent: "₹12,500", size: "1020", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "Yes", tenant: "Family", phone: "+913821345760"},
  {id: 64, bhk: 1, rent: "₹8,500", size: "680", floor: "Ground", areaType: "Normal", location: "Nehru Colony", furnished: "No", tenant: "Bachelor", phone: "+914932456871"},
  {id: 65, bhk: 3, rent: "₹24,000", size: "1900", floor: "1-1 of 3", areaType: "Good", location: "Railway Station", furnished: "Yes", tenant: "Both", phone: "+915043567982"},
  {id: 66, bhk: 2, rent: "₹11,500", size: "950", floor: "1-1 of 2", areaType: "Moderate", location: "Ganj", furnished: "No", tenant: "Family", phone: "+916154678093"},
  {id: 67, bhk: 1, rent: "₹8,000", size: "620", floor: "Ground", areaType: "Normal", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+917265789104"},
  {id: 68, bhk: 3, rent: "₹25,000", size: "2000", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+918376890215"},
  {id: 69, bhk: 2, rent: "₹12,000", size: "1000", floor: "1-1 of 2", areaType: "Moderate", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+919487901326"},
  {id: 70, bhk: 1, rent: "₹8,500", size: "680", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "No", tenant: "Bachelor", phone: "+911598012437"},
  {id: 71, bhk: 3, rent: "₹23,000", size: "1850", floor: "1-1 of 3", areaType: "Good", location: "Ganj", furnished: "Yes", tenant: "Both", phone: "+912609123548"},
  {id: 72, bhk: 2, rent: "₹13,000", size: "1100", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+913710234659"},
  {id: 73, bhk: 1, rent: "₹9,000", size: "700", floor: "Ground", areaType: "Normal", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+914821345760"},
  {id: 74, bhk: 3, rent: "₹26,000", size: "2050", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+915932456871"},
  {id: 75, bhk: 2, rent: "₹12,500", size: "1020", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "Yes", tenant: "Family", phone: "+916043567982"},
  {id: 76, bhk: 1, rent: "₹8,500", size: "680", floor: "Ground", areaType: "Normal", location: "Nehru Colony", furnished: "No", tenant: "Bachelor", phone: "+917154678093"},
  {id: 77, bhk: 3, rent: "₹24,000", size: "1900", floor: "1-1 of 3", areaType: "Good", location: "Railway Station", furnished: "Yes", tenant: "Both", phone: "+918265789104"},
  {id: 78, bhk: 2, rent: "₹11,500", size: "950", floor: "1-1 of 2", areaType: "Moderate", location: "Ganj", furnished: "No", tenant: "Family", phone: "+919376890215"},
  {id: 79, bhk: 1, rent: "₹8,000", size: "620", floor: "Ground", areaType: "Normal", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+911487901326"},
  {id: 80, bhk: 3, rent: "₹25,000", size: "2000", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+912598012437"},
  {id: 81, bhk: 2, rent: "₹12,000", size: "1000", floor: "1-1 of 2", areaType: "Moderate", location: "Nehru Colony", furnished: "Yes", tenant: "Family", phone: "+913609123548"},
  {id: 82, bhk: 1, rent: "₹8,500", size: "680", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "No", tenant: "Bachelor", phone: "+914710234659"},
  {id: 83, bhk: 3, rent: "₹23,000", size: "1850", floor: "1-1 of 3", areaType: "Good", location: "Ganj", furnished: "Yes", tenant: "Both", phone: "+915821345760"},
  {id: 84, bhk: 2, rent: "₹13,000", size: "1100", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family", phone: "+916932456871"},
  {id: 85, bhk: 1, rent: "₹9,000", size: "700", floor: "Ground", areaType: "Normal", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor", phone: "+917043567982"},
  {id: 86, bhk: 3, rent: "₹26,000", size: "2050", floor: "1-1 of 3", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Both", phone: "+918154678093"},
].map(property => {
  // Transform properties for app use
  return {
    ...property,
    // Convert rent string to price number for sorting and filtering
    price: parseInt(property.rent.replace(/[₹,]/g, '')),
    // Create address from location
    address: `${property.floor} Floor, ${property.location}, ${property.areaType} Area`,
    // Map bhk to bedrooms for compatibility with existing code
    bedrooms: property.bhk,
    // Adding sqft as number for compatibility
    sqft: parseInt(property.size),
    // Convert furnished string to boolean for filtering
    isFurnished: property.furnished === "Yes",
    // Description generated from property details
    description: `${property.bhk} BHK property in ${property.location}. ${property.size} sq ft, ${property.areaType} area type. Located on ${property.floor} floor. ${property.furnished} furnished. Preferred tenant: ${property.tenant}.`
  };
});

function App() {
  // --- Modal States ---
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false); // <-- State for Compare Modal

  // --- Favorites State ---
  const [favorites, setFavorites] = useState(() => { /* ... load favorites ... */
      try {
          const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
          return storedFavorites ? JSON.parse(storedFavorites) : [];
      } catch { return []; }
  });
  useEffect(() => { /* ... save favorites ... */
      try {
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch {}
  }, [favorites]);
  const toggleFavorite = (propertyId) => { /* ... toggle favorite logic ... */
       setFavorites(prev => prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]);
  };

  // --- Comparison State ---
  const [comparisonList, setComparisonList] = useState([]); // Array of property IDs

  // --- Toggle Comparison Function ---
  const toggleComparison = (propertyId) => {
      setComparisonList(prevList => {
          if (prevList.includes(propertyId)) {
              // Remove from comparison
              return prevList.filter(id => id !== propertyId);
          } else {
              // Add to comparison (if limit not reached)
              if (prevList.length < MAX_COMPARE_ITEMS) {
                  return [...prevList, propertyId];
              } else {
                  // Optional: Show a message that limit is reached
                  alert(`You can only compare up to ${MAX_COMPARE_ITEMS} properties at a time.`);
                  return prevList; // Return unchanged list if limit reached
              }
          }
      });
  };

  // --- Modal Handlers (Updated) ---
  const handleOpenLogin = () => { setShowSignupModal(false); setShowCalcModal(false); setShowComparisonModal(false); setShowLoginModal(true); };
  const handleOpenSignup = () => { setShowLoginModal(false); setShowCalcModal(false); setShowComparisonModal(false); setShowSignupModal(true); };
  const handleOpenCalc = () => { setShowLoginModal(false); setShowSignupModal(false); setShowComparisonModal(false); setShowCalcModal(true); };
  const handleOpenComparison = () => { setShowLoginModal(false); setShowSignupModal(false); setShowCalcModal(false); setShowComparisonModal(true); }; // <-- Handler for Compare
  const handleCloseModals = () => { // Close all modals
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowCalcModal(false);
    setShowComparisonModal(false); // <-- Close Compare Modal
    // Optional: Clear comparison list when closing comparison modal?
    // setComparisonList([]);
  };
  // ... switch handlers remain the same ...
  const handleSwitchToLogin = () => { setShowSignupModal(false); setShowLoginModal(true); };
  const handleSwitchToSignup = () => { setShowLoginModal(false); setShowSignupModal(true); };

  // --- Prepare data for Comparison View ---
  const comparisonProperties = properties.filter(p => comparisonList.includes(p.id));

  return (
    <div className="App">
      <Navbar onLoginClick={handleOpenLogin} onSignupClick={handleOpenSignup} />

      <main className="main-content">
        <Routes>
           {/* Pass comparison state/handlers to pages */}
           <Route path="/" element={<HomePage properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} comparisonList={comparisonList} onToggleComparison={toggleComparison} />} />
           <Route path="/properties" element={<PropertiesPage properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} comparisonList={comparisonList} onToggleComparison={toggleComparison} onOpenCompare={handleOpenComparison} />} />
           <Route path="/about" element={<AboutPage />} />
           <Route path="/contact" element={<ContactPage />} />
           <Route path="/property/:propertyId" element={<PropertyDetailsPage properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} /* Comparison not needed here? */ />} />
           <Route path="/favorites" element={<FavoritesPage properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} comparisonList={comparisonList} onToggleComparison={toggleComparison} onOpenCompare={handleOpenComparison} />} />
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onCalcClick={handleOpenCalc} />

      {/* --- Modals --- */}
      {/* ... other modals ... */}
       <Modal show={showLoginModal} onClose={handleCloseModals} title="Login"> <LoginForm onSwitchToSignup={handleSwitchToSignup} /> </Modal>
       <Modal show={showSignupModal} onClose={handleCloseModals} title="Sign Up"> <SignupForm onSwitchToLogin={handleSwitchToLogin}/> </Modal>
       <Modal show={showCalcModal} onClose={handleCloseModals} title="Mortgage Calculator"> <MortgageCalculator /> </Modal>

      {/* --- Comparison Modal --- */}
      <Modal show={showComparisonModal} onClose={handleCloseModals} title="Compare Properties">
         <ComparisonView propertiesToCompare={comparisonProperties} />
      </Modal>

      <ChatbotWidget />
    </div>
  );
}

export default App;