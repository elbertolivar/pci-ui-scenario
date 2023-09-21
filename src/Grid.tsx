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

const numberComparator = (valueA: string, valueB: string) => {
    const aNumber = parseFloat(valueA);
    const bNumber = parseFloat(valueB);
    if (isNaN(aNumber) && isNaN(bNumber)) {
        return 0;
    }
    if (isNaN(aNumber)) {
        return -1;
    }
    if (isNaN(bNumber)) {
        return 1;
    }
    return aNumber - bNumber;
};

const columnDefs: ColDef[] = [
    { field: "designation", headerName: "Designation", sort: "asc" },
    {
        field: "discovery_date",
        headerName: "Discovery Date",
        comparator: dateComparator,
    },
    { field: "h_mag", headerName: "H (mag)", comparator: numberComparator },
    { field: "moid_au", headerName: "MOID (au)", comparator: numberComparator },
    { field: "q_au_1", headerName: "q (au)", comparator: numberComparator },
    { field: "q_au_2", headerName: "Q (au)", comparator: numberComparator },
    {
        field: "period_yr",
        headerName: "Period (yr)",
        comparator: numberComparator,
    },
    {
        field: "i_deg",
        headerName: "Inclination (deg)",
        comparator: numberComparator,
    },
    { field: "pha", headerName: "Potentially Hazardous" },
    { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true },
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
