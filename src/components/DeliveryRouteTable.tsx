import { MenuItem, Select, Typography } from "@material-ui/core";
import { findIndex, isEqual, uniq } from "lodash";
import MaterialTable, {
  Column,
  EditComponentProps,
  Options,
} from "material-table";
import React, { forwardRef } from "react";
import { findRoute } from "../helper/delivery";
import icons from "../icons";
import { DeliveryRoute } from "../types/DeliveryRoute";
import { RouteCost } from "../types/RouteCost";
import validate from "../validations/deliveryRoute";

type Props = {
  data: DeliveryRoute[];
  onChange: (value: DeliveryRoute[]) => void;
  allRoute: RouteCost[];
};

const DeliveryRouteTable = forwardRef<MaterialTable<DeliveryRoute>, Props>(
  ({ data, onChange, allRoute }, ref) => {
    const locations = uniq(
      allRoute.reduce(
        (acc, item) => [...acc, item.from, item.to],
        [] as string[]
      )
    ).sort();

    const options: Options<DeliveryRoute> = {
      paging: false,
      search: false,
    };

    const renderLocationSelector = (
      value: string,
      onChange: (v: any) => void
    ) => {
      return (
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          <MenuItem key="not-selected" value="">
            (Not selected)
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      );
    };

    const columns: Column<DeliveryRoute>[] = [
      {
        title: "Location",
        field: "location",
        editComponent: (props: EditComponentProps<DeliveryRoute>) => {
          return renderLocationSelector(props.value, props.onChange);
        },
      },
      {
        title: "No.",
        editable: "never",
        render: (rowData: DeliveryRoute) => {
          return <Typography>{findIndex(data, rowData) + 1}</Typography>;
        },
      },
      {
        title: "Route",
        editable: "never",
        render: (rowData: DeliveryRoute) => {
          const currentDeliveryIndex = findIndex(data, rowData);

          if (currentDeliveryIndex < 1) {
            return <Typography variant="caption">(Begin)</Typography>;
          }

          const from = data[currentDeliveryIndex - 1].location;
          const to = data[currentDeliveryIndex].location;

          return (
            <Typography variant="caption">{`${from} -> ${to}`}</Typography>
          );
        },
      },
      {
        title: "Cost",
        editable: "never",
        render: (rowData: DeliveryRoute) => {
          const currentDeliveryIndex = findIndex(data, rowData);

          if (currentDeliveryIndex < 1) {
            return <Typography>-</Typography>;
          }

          const from = data[currentDeliveryIndex - 1].location;
          const to = data[currentDeliveryIndex].location;
          const route = findRoute(allRoute, from, to);

          if (route === null) {
            return <Typography variant="caption">(No Such Route)</Typography>;
          }

          return <Typography variant="caption">{route.cost}</Typography>;
        },
      },
    ];

    const onRowDelete = (oldData: DeliveryRoute) => {
      const dataDelete = data.filter((item) => !isEqual(oldData, item));
      onChange([...dataDelete]);

      return Promise.resolve([...dataDelete]);
    };

    const onRowUpdate = (newData: DeliveryRoute, oldData?: DeliveryRoute) => {
      if (!validate(newData)) return Promise.reject();

      const dataUpdate = [...data];
      const index = dataUpdate.findIndex((item) => isEqual(oldData, item));
      dataUpdate[index] = newData;
      onChange([...dataUpdate]);

      return Promise.resolve([...dataUpdate]);
    };

    const onRowAdd = (newData: DeliveryRoute) => {
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
        title="Delivery route"
      />
    );
  }
);

export default DeliveryRouteTable;
