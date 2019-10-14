const objectToArray = obj => {
  let output = [];

  for (let key of Object.keys(obj)) {
    output.push(obj[key]);
  }

  return output;
};

export { objectToArray };
