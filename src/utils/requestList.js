import { sendRequest } from '../utils/requests'

const currentStates = async () => {
    return await sendRequest('/states/current.json')
}

export { currentStates }