import { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    ValueFormatterParams,
    ValueGetterParams,
} from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./Grid.module.css";

const numberValueGetter = (params: ValueGetterParams) => {
    if (params.colDef.field) {
        const valueNumber = Number(params.data[params.colDef.field]);
        if (!isNaN(valueNumber)) {
            return valueNumber;
        }
    }
    return null;
};

const dateValueGetter = (params: ValueGetterParams) => {
    if (params.colDef.field) {
        const value = params.data[params.colDef.field];
        if (value) {
            return new Date(value);
        }
    }
    return null;
};

const dateValueFormatter = (params: ValueFormatterParams) => {
    return params.value
        ? params.value.toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : "";
};

const numberValueFormatter = (params: ValueFormatterParams) => {
    return params.value ? params.value.toLocaleString() : "";
};

const yesNoValueFormatter = (params: ValueFormatterParams) => {
    const value = params.value.toLowerCase();
    if (value === "y") {
        return "Yes";
    } else if (value === "n") {
        return "No";
    }
    return "";
};

const stringComparator = (valueA: string, valueB: string) => {
    const aValueLower = valueA.toLowerCase();
    const bValueLower = valueB.toLowerCase();
    if (aValueLower > bValueLower) {
        return 1;
    } else if (aValueLower < bValueLower) {
        return -1;
    }
    return 0;
};

const columnDefs: ColDef[] = [
    {
        field: "designation",
        headerName: "Designation",
        sort: "asc",
        filter: true,
        comparator: stringComparator,
    },
    {
        field: "discovery_date",
        headerName: "Discovery Date",
        valueGetter: dateValueGetter,
        valueFormatter: dateValueFormatter,
        filter: "agDateColumnFilter",
    },
    {
        field: "h_mag",
        headerName: "H (mag)",
        valueGetter: numberValueGetter,
        valueFormatter: numberValueFormatter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "moid_au",
        headerName: "MOID (au)",
        valueGetter: numberValueGetter,
        valueFormatter: numberValueFormatter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "q_au_1",
        headerName: "q (au)",
        valueGetter: numberValueGetter,
        valueFormatter: numberValueFormatter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "q_au_2",
        headerName: "Q (au)",
        valueGetter: numberValueGetter,
        valueFormatter: numberValueFormatter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "period_yr",
        headerName: "Period (yr)",
        valueGetter: numberValueGetter,
        valueFormatter: numberValueFormatter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "i_deg",
        headerName: "Inclination (deg)",
        valueGetter: numberValueGetter,
        valueFormatter: numberValueFormatter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "pha",
        headerName: "Potentially Hazardous",
        valueFormatter: yesNoValueFormatter,
        filter: true,
        comparator: stringComparator,
    },
    {
        field: "orbit_class",
        headerName: "Orbit Class",
        enableRowGroup: true,
        filter: true,
        comparator: stringComparator,
    },
];

const NeoGrid = (): JSX.Element => {
    const title = "Near-Earth Object Overview";

    const defaultColDef = useMemo(() => {
        return {
            unSortIcon: true,
            sortable: true,
        };
    }, []);

    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
            <div className={styles.header}>
                <h1>{title}</h1>
            </div>
            <AgGridReact
                defaultColDef={defaultColDef}
                rowData={data}
                columnDefs={columnDefs}
                rowGroupPanelShow={"always"}
                enableRangeSelection={true}
                copyHeadersToClipboard={true}
            />
        </div>
    );
};

export default NeoGrid;
