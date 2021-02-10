/* Core */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

/* Material */
import { NavigateNext, NavigateBefore, ArrowBack } from '@material-ui/icons';
import { Card, Typography, CardContent, CardActions, IconButton, TextField, Button } from '@material-ui/core';

/* Components */
import styles from './RealEstateForm.css.js';
import { Spinner } from '../spinner/Spinner';
import { SnackbarWrapped } from '../snackbarWrapped/SnackbarWrapped';

/* Actions */
import * as RealEstateActions from '../../actions/RealEstateActions';

/* Request */
import { createRealEstate, updateRealEstate } from '../../requests/requests';

export const RealEstateForm = props => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentEdit = useSelector(state => state.RealStateReducer.currentEdit);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepDictionary, setCurrentStepDictionary] = useState([]);
  const [data, setData] = useState(currentEdit);
  const [showSpinner, setShowSpinner] = useState(false);
  const [snackbarData, setSnackbarData] = useState({});

  useEffect(() => {
    setCurrentStepDictionary([_stepOne, _stepTwo, _stepThree]);
    if (location.pathname.includes('/edit') && !currentEdit.idRealEstate) history.push('/');
  }, [currentEdit]);

  /**
  * @desc devuelve la estructura del paso uno para editar/crear una propiedad
  * @params {Object}
  */
  const _stepOne = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="title" label="Título" style={styles.input} key={0} defaultValue={data.title} />
        <TextField onChange={_editData} id="description" label="Descripción" style={styles.input} key={1} defaultValue={data.description} />
      </div>
    );
  }

  /**
  * @desc devuelve la estructura del paso dos para editar/crear una propiedad
  * @params {Object}
  */
  const _stepTwo = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="ownerData" label="Datos del propietario" style={styles.input} key={2} defaultValue={data.ownerData} />
        <TextField onChange={_editData} id="address" label="Dirección" style={styles.input} key={3} defaultValue={data.address} />
      </div>
    );
  }

  /**
  * @desc devuelve la estructura del paso tres para editar/crear una propiedad
  * @params {Object}
  */
  const _stepThree = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="cost" label="Precio" style={styles.input} key={4} defaultValue={parseFloat(data.cost) || 0} type="number" />
      </div>
    );
  }

  /**
  * @desc devuelve devuelve el paso actual
  * @params {Number} {Object}
  */
  const _getCurrentStep = (currentStep, data) => {
    return currentStepDictionary[currentStep] ? currentStepDictionary[currentStep](data) : '';    
  }

  /**
  * @desc maneja la accion para ir al paso anterior
  * @params {Event}
  */
  const _handlerPrevious = event => {
    if (currentStep > 0) setCurrentStep(currentStep => currentStep - 1);
  }

  /**
  * @desc maneja la accion para ir al paso siguiente
  * @params {Event}
  */
  const _handlerNext = event => {
    if (currentStep < currentStepDictionary.length-1) setCurrentStep(currentStep => currentStep + 1);
  }

  /**
  * @desc actualiza la propiedad 'data' de acuerdo a lo modificado
  * @params {Event}
  */
  const _editData = event => {
    const target = event.currentTarget;
    setData(data => Object.assign({}, data, { [target.id]: target.value }));
  }

  /**
  * @desc maneja el evento para volver a la pagina anterior
  * @params {Event}
  */
  const handlerBack = event => {
    dispatch(RealEstateActions.editRealEstate({}));
    history.goBack();
  }

  /**
  * @desc funcion principal para la accion de editar/crear
  * @params {Event}
  */
  const handlerSave = event => {
    if (_isValidData(data)) {
      setShowSpinner(true);
      if (currentEdit.idRealEstate) _updateElement(data);
      else _createElement(data);
    } else setSnackbarData({ message: 'Ingresar toda la informacion obligatoria (Titulo, Datos del propietario, Dirección, Costo)', type: 'error', open: true });
  }

  /**
  * @desc llama al API para crear una nueva propiedad
  * @params {Object}
  */
  const _createElement = payload => {
    createRealEstate(payload).then(response => {
      setShowSpinner(false);
      if (response.success) {
        window.analytics.track('Propiedad Creada', { userId: 'damiansin12345' });
        setSnackbarData({ message: 'Propiedad creada exitosamente', type: 'success', open: true });
        history.push('/');
      } else _showGenericErrorMessage();
    });
  }

  /**
  * @desc llama al API para editar una propiedad
  * @params {Object}
  */
  const _updateElement = payload => {
    updateRealEstate(payload).then(response => {
      setShowSpinner(false);
      if (response.success) {
        window.analytics.track('Propiedad Actualizada', { userId: 'damiansin12345' });
        setSnackbarData({ message: 'Propiedad actualizada exitosamente', type: 'success', open: true });
        history.push('/');
      } else _showGenericErrorMessage();
    });
  }

  /**
  * @desc muestra un mensaje generico de error
  */
  const _showGenericErrorMessage = () => {
    setSnackbarData({ message: 'Ocurrio un error', type: 'error', open: true });
  }

  /**
  * @desc maneja el evento de cerrar el toast
  * @params {Event}
  */
  const closeSnackbar = event => {
    setSnackbarData({ open: false });
  }

  /**
  * @desc valida que los datos obligatorios hayan sido insertados
  * @params {Object}
  */
  const _isValidData = data => {
    if (data.title && data.title.length > 0 && data.ownerData && data.ownerData.length > 0 && data.address && data.address.length > 0 && data.cost && parseFloat(data.cost) && parseFloat(data.cost) > 0) {
      return true;
    }
    return false;
  }

  return (
    <div className="real-estate-form-container" style={styles.estateContainer}>
      <Card style={styles.cardContainer}>
        <CardContent>
          <div style={styles.cardHeader}>
            <IconButton onClick={handlerBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" style={styles.cardTitle}>
              {data.title}
            </Typography>
          </div>
          {_getCurrentStep(currentStep, data)}
        </CardContent>
        <CardActions style={styles.cardActions}>
          <IconButton onClick={_handlerPrevious}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={_handlerNext}>
            <NavigateNext />
          </IconButton>
        </CardActions>
      </Card>
      <div className="actions" style={styles.actions}>
        <Button variant="contained" style={styles.button} onClick={handlerSave}>Guardar</Button>
      </div>
      <SnackbarWrapped open={snackbarData.open || false} onClose={closeSnackbar} message={snackbarData.message} type={snackbarData.type || 'default'} />
      <Spinner showSpinner={showSpinner} />
    </div>
  );
}