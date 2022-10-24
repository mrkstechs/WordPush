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

const emojiCounter = (emojiArray, emojiToAdd) => {

    if(emojiArray) {
      emojiArray.count++;

      return emojiArray
    } else {
    
      let emojiObj = { type: emojiToAdd,
                      count: 1 }

      return emojiObj
}}


  module.exports= { uniqueId, getDate, emojiCounter }
