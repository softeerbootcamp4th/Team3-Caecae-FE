export type Story = (request: object) => Promise<object>;
export type RunStory = () => Promise<object>;

export function createStory(story: Story, parameter: object): RunStory {
  return function () {
    return story(parameter);
  };
}
