import { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./Grid.module.css";

const dateStringToTime = (date: string) => {
    if (typeof date === "undefined" || date === null) {
        return null;
    }
    return new Date(date).getTime();
};

const dateComparator = (valueA: string, valueB: string) => {
    const aDateTime = dateStringToTime(valueA);
    const bDateTime = dateStringToTime(valueB);
    if (aDateTime === null && bDateTime === null) {
        return 0;
    }
    if (aDateTime === null) {
        return -1;
    }
    if (bDateTime === null) {
        return 1;
    }
    return aDateTime - bDateTime;
};

const stringToNumberConverter = (value: string) => {
    const valueNumber = Number(value);
    return isNaN(valueNumber) ? null : valueNumber;
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
        comparator: dateComparator,
    },
    {
        field: "h_mag",
        headerName: "H (mag)",
        valueGetter: (params) => stringToNumberConverter(params.data.h_mag),
        filter: "agNumberColumnFilter",
    },
    {
        field: "moid_au",
        headerName: "MOID (au)",
        valueGetter: (params) => stringToNumberConverter(params.data.moid_au),
        filter: "agNumberColumnFilter",
    },
    {
        field: "q_au_1",
        headerName: "q (au)",
        valueGetter: (params) => stringToNumberConverter(params.data.q_au_1),
        filter: "agNumberColumnFilter",
    },
    {
        field: "q_au_2",
        headerName: "Q (au)",
        valueGetter: (params) => stringToNumberConverter(params.data.q_au_2),
        filter: "agNumberColumnFilter",
    },
    {
        field: "period_yr",
        headerName: "Period (yr)",
        valueGetter: (params) => stringToNumberConverter(params.data.period_yr),
        filter: "agNumberColumnFilter",
    },
    {
        field: "i_deg",
        headerName: "Inclination (deg)",
        valueGetter: (params) => stringToNumberConverter(params.data.i_deg),
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
