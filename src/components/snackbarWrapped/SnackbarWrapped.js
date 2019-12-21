/* Core */
import React from 'react';

/* Material */
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Error, Close, CheckCircle } from '@material-ui/icons';

/* Components */
import styles from './SnackbarWrapped.css.js';

const icons = {
  error: Error,
  success: CheckCircle,
  default: CheckCircle
};

export const SnackbarWrapped = props => {
  const { open, onClose, message, type } = props;
  const Icon = icons[type];
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={3000}
      open={open}
      onClose={onClose}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        style={styles.icon[type]}
        message={
          <span id="client-snackbar" style={styles.span} >
            <Icon style={styles.icon} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
