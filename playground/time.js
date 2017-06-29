//Time in JS is based on Jan 1st 1970 00:00:00
//Use MOMENT for Date formatting

const moment = require('moment');

// var month = new Date().getMonth();
// console.log(month);

// var date = moment();
// date.add(1, 'years').subtract(1, 'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35am
// 6:01 am
//padded hh (01:--) vs unpadded h (1:--)
// var createdAt = 1234;
// var date = moment(createdAt);
// var time = date.format('h:ss a');
// console.log(time);

var someTimestamp = moment.valueOf();
console.log(someTimestamp);