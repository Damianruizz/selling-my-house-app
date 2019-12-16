import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Card, Typography, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton } from '@material-ui/core';

import styles from './RealEstateCard.css.js';
import * as RealEstateActions from '../../actions/RealEstateActions';

const defaultImage = '/img/default.jpg';

export const RealEstateCard = props => {
  const dispatch = useDispatch();
  let history = useHistory();

  const _getAvatarTitle = title => {
    return title ? title.substring(0, 1) : '';
  }

  const _edit = e => {
    const element = JSON.parse(e.currentTarget.value);
    dispatch(RealEstateActions.editRealEstate(element));
    history.push(`/edit/${element.id}`);
  }

  const _delete = e => {
    console.log('deleteAction');
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
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.cardData.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.cardData.address}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.cardData.ownerData}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={_delete} value={JSON.stringify(props.cardData)} id="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={_edit} value={JSON.stringify(props.cardData)} id="edit">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
