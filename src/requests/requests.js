const getAllrealEstates = () => {
  return fetch('http://localhost:3000/mocks/allRealEstates.json',
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

export {
  getAllrealEstates
};