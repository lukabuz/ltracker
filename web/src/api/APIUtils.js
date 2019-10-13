const getLighterData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT_TWO}/lighters.json`);
      if (!response.ok) reject(new Error(`${response.status} ${response.statusText}`));

      const body = await response.json();
      resolve(body);
    } catch (error) {
      reject(error);
    }
  });

const getUserData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT_TWO}/users.json`);
      if (!response.ok) reject(new Error(`${response.status} ${response.statusText}`));

      const body = await response.json();
      resolve(body);
    } catch (error) {
      reject(error);
    }
  });

const claimLighter = cb => {
  cb();
};

const reportLighter = cb => {
  cb();
};

export { getLighterData, getUserData, claimLighter, reportLighter };
