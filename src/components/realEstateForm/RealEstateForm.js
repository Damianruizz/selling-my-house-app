import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { NavigateNext, NavigateBefore, ArrowBack } from '@material-ui/icons';
import { Card, Typography, CardContent, CardActions, IconButton, TextField } from '@material-ui/core';
import styles from './RealEstateForm.css.js';

export const RealEstateForm = props => {
  let history = useHistory();
  const currentEdit = useSelector(state => state.RealStateReducer.currentEdit);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepDictionary, setCurrentStepDictionary] = useState([]);
  const [data, setData] = useState(currentEdit);

  useEffect(() => {
    setCurrentStepDictionary([_stepOne, _stepTwo, _stepThree]);
    if (!currentEdit.id) history.push('/');
  }, [currentEdit]);

  const _stepOne = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="title" label="Título" style={styles.input} value={data.title} />
        <TextField onChange={_editData} id="description" label="Descripción" style={styles.input} value={data.description} />
      </div>
    );
  }

  const _stepTwo = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="ownerData" label="Datos del dueño" style={styles.input} value={data.ownerData} />
        <TextField onChange={_editData} id="address" label="Dirección" style={styles.input} value={data.address} />
      </div>
    );
  }

  const _stepThree = data => {
    return(
      <div style={styles.cardContent}>
        <TextField onChange={_editData} id="cost" label="Precio" style={styles.input} value={data.cost} />
        <TextField onChange={_editData} id="image" label="Imagen" style={styles.input} value={data.image} />
      </div>
    );
  }

  const _getCurrentStep = (currentStep, data) => {
    return currentStepDictionary[currentStep] ? currentStepDictionary[currentStep](data) : '';    
  }

  const _handlerPrevious = e => {
    if (currentStep > 0) setCurrentStep(currentStep => currentStep - 1);
  }

  const _handlerNext = e => {
    if (currentStep < currentStepDictionary.length-1) setCurrentStep(currentStep => currentStep + 1);
  }

  const _editData = e => {
    const param = e.currentTarget.id;
    const value = e.currentTarget.value;
    setData(data => Object.assign({}, data, { [param]: value }));
  }

  return (
    <Card style={styles.cardContainer}>
      <CardContent>
        <div style={styles.cardHeader}>
          <IconButton onClick={e => history.goBack()}>
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
  );
}