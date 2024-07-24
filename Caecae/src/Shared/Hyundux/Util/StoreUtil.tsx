import State from "../State";

export function makePayLoad<PayLoad>(originState: State<PayLoad>, payload: object): State<PayLoad> {
    return { ...originState, payload: { ...originState.payload, ...payload } }
}
