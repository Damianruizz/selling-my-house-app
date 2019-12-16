import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { NavigateNext, NavigateBefore, ArrowBack } from '@material-ui/icons';
import { Card, Typography, CardContent, CardActions, IconButton, TextField } from '@material-ui/core';
import styles from './RealEstateForm.css.js';

export const RealEstateForm = props => {
  const currentEdit = useSelector(state => state.RealStateReducer.currentEdit);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepDictionary, setCurrentStepDictionary] = useState([]);
  let history = useHistory();

  useEffect(() => {
    setCurrentStepDictionary([_stepOne, _stepTwo, _stepThree]);
  }, [currentEdit]);

  const _stepOne = () => {
    return(
      <div style={styles.cardContent}>
        <TextField label="Título" style={styles.input} defaultValue={currentEdit.title}  />
        <TextField label="Descripción" style={styles.input} defaultValue={currentEdit.description} />
      </div>
    );
  }

  const _stepTwo = () => {
    return(
      <div style={styles.cardContent}>
        <TextField label="Datos del dueño" style={styles.input} defaultValue={currentEdit.ownerData} />
        <TextField label="Dirección" style={styles.input} defaultValue={currentEdit.address} />
      </div>
    );
  }

  const _stepThree = () => {
    return(
      <div style={styles.cardContent}>
        <TextField label="Precio" style={styles.input} defaultValue={currentEdit.cost} />
        <TextField label="Imagen" style={styles.input} defaultValue={currentEdit.image} />
      </div>
    );
  }

  const _getCurrentStep = currentStep => {
    return currentStepDictionary[currentStep] ? currentStepDictionary[currentStep]() : '';    
  }

  const _handlerPrevious = e => {
    if (currentStep > 0) setCurrentStep(currentStep-1);
  }

  const _handlerNext = e => {
    if (currentStep < currentStepDictionary.length-1) setCurrentStep(currentStep+1);
  }

  return (
    <Card style={styles.cardContainer}>
      <CardContent>
        <div style={styles.cardHeader}>
          <IconButton onClick={e => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" style={styles.cardTitle}>
            {currentEdit.title}
          </Typography>
        </div>
        {_getCurrentStep(currentStep)}
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