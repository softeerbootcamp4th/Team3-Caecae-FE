import { useState } from 'react';
import HState from '../State';
import store from '../Store';
import Reducer from '../Reducer';


function useBind<PayLoad>(initialState: HState<PayLoad>, reducer: Reducer<PayLoad>): PayLoad {
    const [state, setState] = useState<HState<PayLoad>>(initialState);
    store.subscribe(state, reducer, (newState) => {
        setState(newState)
    });

    return state.payload;
}

export default useBind;
