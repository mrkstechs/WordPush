const moment = require('moment');

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};

const getDate = () => {
  const date = moment();
  const currentDate = date.format('D/MM/YYYY');
  console.log(currentDate);

  return currentDate;
};



  module.exports= { uniqueId, getDate }
