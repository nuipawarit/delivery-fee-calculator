import { Input } from "@material-ui/core";
import { isEqual } from "lodash";
import MaterialTable, {
  Column,
  EditComponentProps,
  Options,
} from "material-table";
import React, { forwardRef } from "react";
import icons from "../icons";
import { RouteCost } from "../types/RouteCost";
import validate from "../validations/routeCost";

type Props = {
  data: RouteCost[];
  onChange: (value: RouteCost[]) => void;
};

const RouteCostTable = forwardRef<MaterialTable<RouteCost>, Props>(
  ({ data, onChange }, ref) => {
    const options: Options<RouteCost> = {
      paging: false,
      search: false,
    };

    const columns: Column<RouteCost>[] = [
      { title: "From", field: "from" },
      { title: "To", field: "to" },
      {
        title: "Cost",
        field: "cost",
        editComponent: (props: EditComponentProps<RouteCost>) => (
          <Input
            type="number"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
    ];

    const onRowDelete = (oldData: RouteCost) => {
      const dataDelete = data.filter((item) => !isEqual(oldData, item));
      onChange([...dataDelete]);

      return Promise.resolve([...dataDelete]);
    };

    const onRowUpdate = (newData: RouteCost, oldData?: RouteCost) => {
      if (!validate(newData)) return Promise.reject();

      const dataUpdate = [...data];
      const index = dataUpdate.findIndex((item) => isEqual(oldData, item));
      dataUpdate[index] = newData;
      onChange([...dataUpdate]);

      return Promise.resolve([...dataUpdate]);
    };

    const onRowAdd = (newData: RouteCost) => {
      if (!validate(newData)) return Promise.reject();

      onChange([...data, newData]);

      return Promise.resolve([...data, newData]);
    };

    return (
      <MaterialTable
        ref={ref}
        columns={columns}
        data={data}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete,
        }}
        icons={icons}
        options={options}
        title="Route costs"
      />
    );
  }
);

export default RouteCostTable;
