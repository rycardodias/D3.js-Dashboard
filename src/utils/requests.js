const sendRequest = async (url) => {
    const response = await fetch('https://api.covidtracking.com/v1' + url, { mode: 'cors' });
    const data = await response.json();
    return data;
};

export { sendRequest }
