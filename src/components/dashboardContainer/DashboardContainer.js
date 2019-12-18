import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RealEstateCard } from '../realEstateCard/RealEstateCard';
import { Spinner } from '../spinner/Spinner';
import { getAllrealEstates } from '../../requests/requests';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './DashboardContainer.css.js';

export const DashboardContainer = props => {
  const history = useHistory();
  const [realEstates, setRealEstates] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    getAllrealEstates().then(response => {
      setRealEstates(response);
      setShowSpinner(false);
    });
  }, [props]);

  const _addNew = event => {
    history.push('/create');
  }

  return (
    <div className="dashboard-container">
      <div className="real-estates">
        {realEstates && realEstates.map(realEstate => (
          <RealEstateCard cardData={realEstate} key={realEstate.id} />
        ))}
      </div>
      <Fab color="primary" aria-label="add" style={styles.buttonAdd} onClick={_addNew}>
        <AddIcon />
      </Fab>
      <Spinner showSpinner={showSpinner} />
    </div>
  );
}