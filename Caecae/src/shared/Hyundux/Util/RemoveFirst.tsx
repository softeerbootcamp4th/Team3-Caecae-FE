function removeFirst<T>(arr: T[], predicate: (item: T) => boolean): { removed: T, newArray: T[] } {
    const index = arr.findIndex(predicate);

    const removed = arr[index];
    const newArray = [...arr.slice(0, index), ...arr.slice(index + 1)];

    return { removed, newArray };
}

export default removeFirst
