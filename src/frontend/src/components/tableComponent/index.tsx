import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useDarkStore } from "../../stores/darkStore";
import "../../style/ag-theme-shadcn.css"; // Custom CSS applied to the grid
import { cn } from "../../utils/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import ForwardedIconComponent from "../genericIconComponent";
import {
  DEFAULT_TABLE_ALERT_MSG,
  DEFAULT_TABLE_ALERT_TITLE,
} from "../../constants/constants";

interface TableComponentProps extends AgGridReactProps {
  columnDefs: NonNullable<AgGridReactProps["columnDefs"]>;
  rowData: NonNullable<AgGridReactProps["rowData"]>;
  alertTitle?: string;
  alertDescription?: string;
}

const TableComponent = forwardRef<
  ElementRef<typeof AgGridReact>,
  TableComponentProps
>(
  (
    {
      alertTitle = DEFAULT_TABLE_ALERT_TITLE,
      alertDescription = DEFAULT_TABLE_ALERT_MSG,
      ...props
    },
    ref,
  ) => {
    const dark = useDarkStore((state) => state.dark);

    if (props.rowData.length === 0) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Alert variant={"default"} className="w-[50%]">
            <ForwardedIconComponent
              name="AlertCircle"
              className="h-5 w-5 text-primary"
            />
            <AlertTitle>{alertTitle}</AlertTitle>
            <AlertDescription>{alertDescription}</AlertDescription>
          </Alert>
        </div>
      );
    }
    return (
      <div
        className={cn(
          dark ? "ag-theme-quartz-dark" : "ag-theme-quartz",
          "ag-theme-shadcn flex h-full flex-col",
        )} // applying the grid theme
      >
        <AgGridReact ref={ref} {...props} />
      </div>
    );
  },
);

export default TableComponent;
