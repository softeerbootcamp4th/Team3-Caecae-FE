import State from "./State";
interface Action {
  type: string;
  actionName: string;
  payload?: object;
}
interface DoAction<T> {
  type: string;
  doing: (state: State<T>) => State<T>;
}

export type { Action, DoAction };
