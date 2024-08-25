import { useState } from "react";
import { Story } from "./Story";
import { saga, SagaAction } from "./Saga";

type SagaStatus = "isLoading" | "isSuccess" | "isError";

const useSaga = () => {
  const [sagaStatus, setSagaStatus] = useState<SagaStatus>("isLoading");

  return [
    sagaStatus,
    async (action: SagaAction, story: Story, parameter: object = {}) => {
      setSagaStatus("isLoading");
      try {
        await saga.run(action, story, parameter);
      } catch (e) {
        console.log(`saga Error: ${e}`);
        setSagaStatus("isError");
      }
      setSagaStatus("isSuccess");
    },
  ] as const;
};

export default useSaga;
