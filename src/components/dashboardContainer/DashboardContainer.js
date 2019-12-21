import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RealEstateCard } from '../realEstateCard/RealEstateCard';
import { Spinner } from '../spinner/Spinner';
import { getAllrealEstates, deleteRealEstate } from '../../requests/requests';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './DashboardContainer.css.js';
import { SnackbarWrapped } from '../snackbarWrapped/SnackbarWrapped';
import * as RealEstateActions from '../../actions/RealEstateActions';

export const DashboardContainer = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [realEstates, setRealEstates] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [snackbarData, setSnackbarData] = useState({});

  useEffect(() => {
    _getAllRealStates();  
  }, [props]);

  const _addNew = event => {
    history.push('/create');
  }

  const _getAllRealStates = () => {
    setShowSpinner(true);
    getAllrealEstates().then(response => {
      if (response.success) {
        setRealEstates(response.realEstates);
      } else _showGenericErrorMessage();
      setShowSpinner(false);
    });
  }

  const _showGenericErrorMessage = () => {
    setSnackbarData({ message: 'Ocurrio un error', type: 'error', open: true });
  }

  const closeSnackbar = event => {
    setSnackbarData({ open: false });
  }

  const edit = event => {
    const element = JSON.parse(event.currentTarget.value);
    dispatch(RealEstateActions.editRealEstate(element));
    history.push(`/edit/${element.idRealEstate}`);
  }

  const _delete = event => {
    const element = JSON.parse(event.currentTarget.value);
    deleteRealEstate({idRealEstate: element.idRealEstate}).then(response => {
      if (response.success) {
        setSnackbarData({ message: `La propiedad '${element.title}' ha sido eliminada`, type: 'success', open: true });
        _getAllRealStates();
      }
    });
  }

  return (
    <div className="dashboard-container">
      <div className="real-estates">
        {realEstates && realEstates.map(realEstate => (
          <RealEstateCard cardData={realEstate} key={realEstate.idRealEstate} onEdit={edit} onDelete={_delete} />
        ))}
      </div>
      <Fab color="primary" aria-label="add" style={styles.buttonAdd} onClick={_addNew}>
        <AddIcon />
      </Fab>
      <Spinner showSpinner={showSpinner} />
      <SnackbarWrapped open={snackbarData.open || false} onClose={closeSnackbar} message={snackbarData.message} type={snackbarData.type || 'default'} />
    </div>
  );
}