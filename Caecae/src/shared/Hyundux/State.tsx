interface State<T> {
    type: string;
    payload: T;
}

function createState<PayLoad>(type: string, payload: PayLoad): State<PayLoad> {
    return {
        type: type,
        payload: payload
    }
}

export { createState }
export default State
