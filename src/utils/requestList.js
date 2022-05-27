import { sendRequest } from '../utils/requests'

const currentStates = async () => {
    return await sendRequest('/states/current.json')
}

const currentByState = async (state) => {
    return await sendRequest('/states/' + state + '/current.json')
}

const historicalByStateDta = async (state, date) => {
    return await sendRequest('/states/' + state + '/' + date + '.json')
}

const dailyByState = async (state) => {
    return await sendRequest('/states/' + state + '/daily.json')
}

export { currentStates, currentByState, historicalByStateDta, dailyByState }