import React from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="home-container">
                <h1>Bienvenue sur Beer Sweet Beer 🍻</h1>
                <p className="text">Découvrez les meilleurs bars et bières artisanales de votre ville, commandez en ligne et suivez l'état de vos commandes en temps réel.</p>
                <p className="subText">Que vous soyez amateur de IPA, de stouts, ou simplement à la recherche de nouvelles saveurs, <strong>Beer Sweet Beer</strong> vous guide à travers une sélection unique de bars et de brasseries locales.</p>
                <p className="important">🍺 Explorez.  
                🛒 Commandez.  
                🎉 Profitez !</p>
                </div>
            </div>
  )
};

export default Home;
