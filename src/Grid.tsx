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

const columnDefs: ColDef[] = [
    {
        field: "designation",
        headerName: "Designation",
        sort: "asc",
        filter: true,
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
        filter: "agNumberColumnFilter",
    },
    {
        field: "moid_au",
        headerName: "MOID (au)",
        valueGetter: numberValueGetter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "q_au_1",
        headerName: "q (au)",
        valueGetter: numberValueGetter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "q_au_2",
        headerName: "Q (au)",
        valueGetter: numberValueGetter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "period_yr",
        headerName: "Period (yr)",
        valueGetter: numberValueGetter,
        filter: "agNumberColumnFilter",
    },
    {
        field: "i_deg",
        headerName: "Inclination (deg)",
        valueGetter: numberValueGetter,
        filter: "agNumberColumnFilter",
    },
    { field: "pha", headerName: "Potentially Hazardous", filter: true },
    {
        field: "orbit_class",
        headerName: "Orbit Class",
        enableRowGroup: true,
        filter: true,
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
            />
        </div>
    );
};

export default NeoGrid;
