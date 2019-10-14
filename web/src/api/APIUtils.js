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

const claimLighter = (username, password, number) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/widgets/claimLighter`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          number,
        }),
      });

      if (!response.ok) reject(new Error(`${response.status} ${response.statusText}`));

      const body = await response.json();
      resolve(body);
    } catch (error) {
      reject(error);
    }
  });

const reportLighter = (username, password, number) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/widgets/reportLoss`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          number,
        }),
      });

      if (!response.ok) reject(new Error(`${response.status} ${response.statusText}`));

      const body = await response.json();
      resolve(body);
    } catch (error) {
      reject(error);
    }
  });

const addLighter = (username, password, number, color, description) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/widgets/createLighter`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          number,
          color,
          description,
        }),
      });

      if (!response.ok) reject(new Error(`${response.status} ${response.statusText}`));

      const body = await response.json();
      resolve(body);
    } catch (error) {
      reject(error);
    }
  });

export { getLighterData, getUserData, claimLighter, reportLighter, addLighter };
