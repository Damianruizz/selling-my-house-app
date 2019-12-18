import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { NavigateNext, NavigateBefore, ArrowBack, Error } from '@material-ui/icons';
/*import ErrorIcon from '@material-ui/icons/Error';*/
import { Card, Typography, CardContent, CardActions, IconButton, TextField, Button, Modal, Backdrop } from '@material-ui/core';
import styles from './RealEstateForm.css.js';
import * as RealEstateActions from '../../actions/RealEstateActions';

export const RealEstateForm = props => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentEdit = useSelector(state => state.RealStateReducer.currentEdit);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepDictionary, setCurrentStepDictionary] = useState([]);
  const [data, setData] = useState(currentEdit);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  useEffect(() => {
    setCurrentStepDictionary([_stepOne, _stepTwo, _stepThree]);
    if (location.pathname.includes('/edit') && !currentEdit.id) history.push('/');
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
        <TextField onChange={_editData} id="ownerData" label="Datos del dueño" style={styles.input} key={2} defaultValue={data.ownerData} />
        <TextField onChange={_editData} id="address" label="Dirección" style={styles.input} key={3} defaultValue={data.address} />
      </div>
    );
  }

  const _stepThree = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="cost" label="Precio" style={styles.input} key={4} defaultValue={parseFloat(data.cost) || 0} type="number" />
        <TextField onChange={_editData} id="image" label="Imagen" style={styles.input} key={5} defaultValue={data.image} />
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

  const _handlerBack = event => {
    dispatch(RealEstateActions.editRealEstate({}));
    history.goBack();
  }

  const _handlerSave = event => {
    console.log('data', data);
    console.log(_isValidData(data));
    if (_isValidData(data)) {
      if (currentEdit.id) console.log('Manda a hacer un UPDATE');
      else console.log('Manda a hacer un POST para CREATE');
    } else setShowErrorModal(true);
  }

  const _handlerCloseModal = event => {
    setShowErrorModal(false);
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
            <IconButton onClick={_handlerBack}>
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
        <Button variant="contained" style={styles.button} onClick={_handlerSave}>Guardar</Button>
      </div>
      <Modal
        aria-describedby="modal-description"
        aria-labelledby="modal-title"
        open={showErrorModal}
        onClose={_handlerCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={styles.modal}
      >
        <div className="modal-content" style={styles.modalContent}>
          <Error id="modal-title" style={styles.errorIcon} />
          <div className="modal-info" style={styles.modalInfo}>
            <div>Ingresar toda la informacion obligatoria:</div>
            <div>Titulo, datos del propietario, dirección y costo de la propiedad</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}