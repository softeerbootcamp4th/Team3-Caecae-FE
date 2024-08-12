import { useState } from "react";
import { Action } from "../Hyundux/Actions";
import { RunStory } from "./Story";
import saga from "./Saga";

type SagaStatus = "isLoading" | "isSuccess" | "isError";

const useSaga = () => {
  const [sagaStatus, setSagaStatus] = useState<SagaStatus>("isLoading");

  return [
    sagaStatus,
    async (action: (object: object) => Action, stories: RunStory[]) => {
      setSagaStatus("isLoading");
      try {
        await saga.run(action, stories);
      } catch (e) {
        console.log(`saga Error: ${e}`);
        setSagaStatus("isError");
      }
      setSagaStatus("isSuccess");
    },
  ] as const;
};

export default useSaga;
