import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './Spinner.css.js';

export const Spinner = props => {

  return(
    <div className="spinner-container">
      {props.showSpinner ? 
        <div>
          <CircularProgress disableShrink style={styles.spinner} />
          <div className="spinner-background" style={styles.background}></div>
        </div>
      : ''}
    </div>
  );
}