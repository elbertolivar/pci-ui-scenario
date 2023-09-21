import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Header } from "../../components/Header/Header";
import data from "../../near-earth-asteroids.json";
import {
    dateValueFormatter,
    dateValueGetter,
    numberValueFormatter,
    numberValueGetter,
    stringComparator,
    yesNoValueFormatter,
} from "../../utils/ag-grid.helpers";

import styles from "./NeoGrid.module.css";

const NeoGrid = () => {
    const gridRef = useRef<AgGridReact>(null);

    const columnDefs = useMemo(() => {
        return [
            {
                field: "designation",
                headerName: "Designation",
                filter: "agTextColumnFilter",
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
                valueGetter: (params) =>
                    params.data.pha.toLowerCase() === "n/a"
                        ? null
                        : params.data.pha,
                valueFormatter: yesNoValueFormatter,
                filter: "agTextColumnFilter",
                filterParams: {
                    filterOptions: ["equals"],
                    textMatcher: ({ value, filterText }: any) => {
                        const aliases: { [key: string]: string | null } = {
                            yes: "y",
                            no: "n",
                        };
                        return (
                            value.toLowerCase() === aliases[filterText || ""]
                        );
                    },
                    maxNumConditions: 1,
                },
                comparator: stringComparator,
            },
            {
                field: "orbit_class",
                headerName: "Orbit Class",
                enableRowGroup: true,
                filter: "agTextColumnFilter",
                comparator: stringComparator,
            },
        ] as ColDef[];
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            unSortIcon: true,
            sortable: true,
        };
    }, []);

    const clearFiltersAndSort = useCallback(() => {
        if (gridRef.current) {
            // Reset all filters
            gridRef.current.api.setFilterModel(null);
            // Clear all sorts
            gridRef.current.columnApi.applyColumnState({
                defaultState: { sort: null },
            });
        }
    }, []);

    return (
        <div className={`${styles.container} ag-theme-alpine`}>
            <Header title="Near-Earth Object Overview">
                <button type="button" onClick={clearFiltersAndSort}>
                    Clear Filters and Sorters
                </button>
            </Header>
            <AgGridReact
                className={styles.grid}
                ref={gridRef}
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
