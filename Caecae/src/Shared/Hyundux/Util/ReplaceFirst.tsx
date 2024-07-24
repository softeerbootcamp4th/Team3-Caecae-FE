function replaceFirst<Element>(
    array: Element[],
    newItem: Element,
    condition: (item: Element) => boolean,
): Element[] {
    const index = array.findIndex(condition);
    if (index !== -1) {
        const newArray = [...array];
        newArray[index] = newItem;
        return newArray;
    }
    return [...array, newItem];
}

export default replaceFirst
