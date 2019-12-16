import React, { useEffect, useState } from 'react';
import { RealEstateCard } from '../realEstateCard/RealEstateCard'

export const DashboardContainer = props => {
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    setCardData({
      id: 1,
      title: 'Título de la propiedad',
      cost: '$10,000,000',
      image: '/img/default.jpg',
      description: 'Esta es una bella casa ubicada al norte de la ciudad de México',
      address: 'Ubicada en: Montes Urales 404, Colonia Chapultepec 1ra sección CP: 55200',
      ownerData: 'Datos del propietario: Juan Ignacio Zaragoza'
    });
  }, [props]);

  return (
    <div className="dashboard-container">
      <RealEstateCard cardData={cardData} />
    </div>
  );
}