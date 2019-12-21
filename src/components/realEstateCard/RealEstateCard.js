import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Card, Typography, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton } from '@material-ui/core';
import styles from './RealEstateCard.css.js';

const defaultImage = '/img/default.jpg';

export const RealEstateCard = props => {
  const { onEdit, onDelete } = props;

  const _getAvatarTitle = title => {
    return title ? title.substring(0, 1) : '';
  }

  return (
    <Card style={styles.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={styles.avatar}>
            {_getAvatarTitle(props.cardData.title)}
          </Avatar>
        }
        title={props.cardData.title}
        subheader={props.cardData.cost}
      />
      <CardMedia
        style={styles.media}
        image={props.cardData.image || defaultImage}
      />
      <CardContent style={styles.cardContent}>
        <div style={styles.infoContainer}>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.cardData.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ubicada en: {props.cardData.address}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Datos del propietario: {props.cardData.ownerData}
          </Typography>
        </div>
        <div>
          <IconButton onClick={onDelete} value={JSON.stringify(props.cardData)} id="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onEdit} value={JSON.stringify(props.cardData)} id="edit">
            <EditIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
