const getAllrealEstates = () => {
  return fetch('https://selling-my-house-api.herokuapp.com/api/realEstates',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }  
    }
  ).then((response) => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

const createRealEstate = payload => {
  return fetch('https://selling-my-house-api.herokuapp.com/api/realEstates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then((response) => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

const updateRealEstate = payload => {
  return fetch('https://selling-my-house-api.herokuapp.com/api/realEstates', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then((response) => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

const deleteRealEstate = payload => {
  return fetch('https://selling-my-house-api.herokuapp.com/api/realEstates', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then((response) => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export {
  getAllrealEstates,
  createRealEstate,
  updateRealEstate,
  deleteRealEstate
};