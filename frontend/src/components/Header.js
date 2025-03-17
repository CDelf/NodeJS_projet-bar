import React from 'react';
import '../styles/components/header.css';

const Header = () => {
    return (
        <div className="header">
            <img src="/assets/logo.png" alt="logo bières" />
            <div className="header-text">
                <h1 className="app-name">Beer sweet Beer</h1>
                <h3>Une petite soif? Venez découvrir nos bars et produits...</h3>
            </div>
        </div>
    );
};

export default Header;