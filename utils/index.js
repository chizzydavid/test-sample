module.exports.getOldestTimeInRange = () => {
  const date = new Date();
  return Math.floor(date.setMonth(date.getMonth() - 3) / 1000);    
}

module.exports.filterMsg = (msg, userId) => {
  return msg.user !== userId 
      && msg.subtype === undefined 
      && msg.thread_ts === undefined 
      && (msg.reply_count === undefined || msg.reply_count < 1)
}
