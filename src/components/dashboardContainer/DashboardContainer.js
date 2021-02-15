/* Core */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/* Components */
import { RealEstateCard } from '../realEstateCard/RealEstateCard';
import styles from './DashboardContainer.css.js';
import { Spinner } from '../spinner/Spinner';
import { SnackbarWrapped } from '../snackbarWrapped/SnackbarWrapped';

/* Request */
import { getAllrealEstates, deleteRealEstate } from '../../requests/requests';

/*  Material */
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

/* Actions */
import * as RealEstateActions from '../../actions/RealEstateActions';

export const DashboardContainer = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [realEstates, setRealEstates] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [snackbarData, setSnackbarData] = useState({});

  useEffect(() => {
    _getAllRealStates();
    // window.analytics.identify('damiansin12345', {
    //   name: 'Damian Ruiz',
    //   email: 'damian.ruiz@outlook.es'
    // });
  }, [props]);

  /**
  * @desc maneja la accion para crear una nueva propiedad
  * @params {Event}
  */
  const _addNew = event => {
    // window.analytics.track('Crear Propiedad', { userId: 'damiansin12345' });
    window.mixpanel.track("Crear Propiedad", {"genre": "hip-hop", "duration in seconds": 42});
    history.push('/create');
  }

  /**
  * @desc realiza la petcion al API para obtener todas las propiedades
  */
  const _getAllRealStates = () => {
    setShowSpinner(true);
    getAllrealEstates().then(response => {
      if (response.success) {
        setRealEstates(response.realEstates);
      } else _showGenericErrorMessage();
      setShowSpinner(false);
    });
  }

  /**
  * @desc muestra un mensaje de error generico
  */
  const _showGenericErrorMessage = () => {
    setSnackbarData({ message: 'Ocurrio un error', type: 'error', open: true });
  }

  /**
  * @desc maneja la accion para cerrar el toast
  * @params {Event}
  */
  const closeSnackbar = event => {
    setSnackbarData({ open: false });
  }

  /**
  * @desc maneja la accion para editar una propiedad
  * @params {Event}
  */
  const edit = event => {
    const element = JSON.parse(event.currentTarget.value);
    dispatch(RealEstateActions.editRealEstate(element));
    // window.analytics.track('Editar Propiedad', { userId: 'damiansin12345' });
    window.mixpanel.track("Editar Propiedad", {"genre": "hip-hop", "duration in seconds": 42});
    history.push(`/edit/${element.idRealEstate}`);
  }

  /**
  * @desc maneja la accion para eliminar una propiedad
  * @params {Event}
  */
  const _delete = event => {
    const element = JSON.parse(event.currentTarget.value);
    deleteRealEstate({idRealEstate: element.idRealEstate}).then(response => {
      if (response.success) {
        // window.analytics.track('Eliminar Propiedad', { userId: 'damiansin12345' });
        window.mixpanel.track("Eliminar Propiedad", {"genre": "hip-hop", "duration in seconds": 42});
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