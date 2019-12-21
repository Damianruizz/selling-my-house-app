import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { NavigateNext, NavigateBefore, ArrowBack } from '@material-ui/icons';
import { Card, Typography, CardContent, CardActions, IconButton, TextField, Button } from '@material-ui/core';
import styles from './RealEstateForm.css.js';
import * as RealEstateActions from '../../actions/RealEstateActions';
import { createRealEstate, updateRealEstate } from '../../requests/requests';
import { Spinner } from '../spinner/Spinner';
import { SnackbarWrapped } from '../snackbarWrapped/SnackbarWrapped';

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

  const _stepOne = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="title" label="Título" style={styles.input} key={0} defaultValue={data.title} />
        <TextField onChange={_editData} id="description" label="Descripción" style={styles.input} key={1} defaultValue={data.description} />
      </div>
    );
  }

  const _stepTwo = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="ownerData" label="Datos del propietario" style={styles.input} key={2} defaultValue={data.ownerData} />
        <TextField onChange={_editData} id="address" label="Dirección" style={styles.input} key={3} defaultValue={data.address} />
      </div>
    );
  }

  const _stepThree = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="cost" label="Precio" style={styles.input} key={4} defaultValue={parseFloat(data.cost) || 0} type="number" />
      </div>
    );
  }

  const _getCurrentStep = (currentStep, data) => {
    return currentStepDictionary[currentStep] ? currentStepDictionary[currentStep](data) : '';    
  }

  const _handlerPrevious = event => {
    if (currentStep > 0) setCurrentStep(currentStep => currentStep - 1);
  }

  const _handlerNext = event => {
    if (currentStep < currentStepDictionary.length-1) setCurrentStep(currentStep => currentStep + 1);
  }

  const _editData = event => {
    const target = event.currentTarget;
    setData(data => Object.assign({}, data, { [target.id]: target.value }));
  }

  const handlerBack = event => {
    dispatch(RealEstateActions.editRealEstate({}));
    history.goBack();
  }

  const handlerSave = event => {
    if (_isValidData(data)) {
      setShowSpinner(true);
      if (currentEdit.idRealEstate) _updateElement(data);
      else _createElement(data);
    } else setSnackbarData({ message: 'Ingresar toda la informacion obligatoria (Titulo, Datos del propietario, Dirección, Costo)', type: 'error', open: true });
  }

  const _createElement = payload => {
    createRealEstate(payload).then(response => {
      setShowSpinner(false);
      if (response.success) {
        setSnackbarData({ message: 'Propiedad creada exitosamente', type: 'success', open: true });
        history.push('/');
      } else _showGenericErrorMessage();
    });
  }

  const _updateElement = payload => {
    updateRealEstate(payload).then(response => {
      setShowSpinner(false);
      if (response.success) {
        setSnackbarData({ message: 'Propiedad actualizada exitosamente', type: 'success', open: true });
        history.push('/');
      } else _showGenericErrorMessage();
    });
  }

  const _showGenericErrorMessage = () => {
    setSnackbarData({ message: 'Ocurrio un error', type: 'error', open: true });
  }

  const closeSnackbar = event => {
    setSnackbarData({ open: false });
  }

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