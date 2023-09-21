import { ValueFormatterParams, ValueGetterParams } from "ag-grid-community";

export const numberValueGetter = (params: ValueGetterParams) => {
    if (params.colDef.field) {
        const valueNumber = Number(params.data[params.colDef.field]);
        if (!isNaN(valueNumber)) {
            return valueNumber;
        }
    }
    return null;
};

export const dateValueGetter = (params: ValueGetterParams) => {
    if (params.colDef.field) {
        const value = params.data[params.colDef.field];
        if (value) {
            return new Date(value);
        }
    }
    return null;
};

export const dateValueFormatter = (params: ValueFormatterParams) => {
    return params.value
        ? params.value.toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : "";
};

export const numberValueFormatter = (params: ValueFormatterParams) => {
    return params.value ? params.value.toLocaleString() : "";
};

export const yesNoValueFormatter = (params: ValueFormatterParams) => {
    const value = params.value ? params.value.toLowerCase() : "";
    if (value === "y") {
        return "Yes";
    } else if (value === "n") {
        return "No";
    }
    return "";
};

export const stringComparator = (
    valueA: string | null,
    valueB: string | null
) => {
    const aValueLower = valueA ? valueA.toLowerCase() : "";
    const bValueLower = valueB ? valueB.toLowerCase() : "";
    if (aValueLower > bValueLower) {
        return 1;
    } else if (aValueLower < bValueLower) {
        return -1;
    }
    return 0;
};
