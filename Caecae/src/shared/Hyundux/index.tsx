import Reducer from "./Reducer";
import State, { createState } from "./State";
import store from "./Store";
import { Action, DoAction } from "./Actions";
import useDo from "./Hooks/useDo";
import useExistState from "./Hooks/useExistState";
import useWork from "./Hooks/useWork";
import removeFirst from "./Util/RemoveFirst";
import replaceFirst from "./Util/ReplaceFirst";
import { makePayLoad } from "./Util/StoreUtil";

export {
  createState,
  store,
  useDo,
  useExistState,
  useWork,
  removeFirst,
  replaceFirst,
  makePayLoad,
};
export type { Reducer, State, Action, DoAction };
