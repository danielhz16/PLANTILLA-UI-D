const stringifyRowValue = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    return JSON.stringify(value);
};

const getValueByPath = (row: unknown, path: string) => {
    return path
        .split(".")
        .reduce<unknown>((currentValue, key) => {
            if (!currentValue || typeof currentValue !== "object") {
                return undefined;
            }

            return (currentValue as Record<string, unknown>)[key];
        }, row);
};

export const filterListData = <T,>(data: T[], filters: Record<string, string>) => {
    const activeFilters = Object.entries(filters).filter(([, value]) => value.trim() !== "");

    if (!activeFilters.length) {
        return data;
    }

    return data.filter((row) => {
        return activeFilters.every(([name, value]) => {
            const rowValue = getValueByPath(row, name);

            if (rowValue === null || rowValue === undefined) {
                return false;
            }

            return stringifyRowValue(rowValue).toLowerCase().includes(value.trim().toLowerCase());
        });
    });
};
