import { SelectColumnFilter } from './TableFilters';

// export const conditionalTableColumns = (props) => {
//   return usersCollection
// }

export const conditionalTableColumns = (props) => {
 return props.stateProps.index1 ? fuelConsumptionColumns : 
  props.stateProps.index2 ? machineRegitrationColumns : null;
}

const fuelConsumptionColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    }, 
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Liters',
    accessor: 'liters',
  },
  {
    Header: 'Kilometers',
    accessor: 'kilometers',
  },
  {
    Header: 'Tank Number',
    accessor: 'tankNumber',
  },
  {
    Header: 'Operator',
    accessor: "operator",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
]

const machineRegitrationColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    }, 
 { 
    Header: 'Attached Machinery',
    accessor: "attachedMachinery",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
   },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Product',
    accessor: "product",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Kilometers',
    accessor: 'kilometers',
  },
  {
    Header: 'Line',
    accessor: 'line',
  },
  {
    Header: 'Block',
    accessor: 'block',
  },
  {
    Header: 'Operator',
    accessor: "operator",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
]

export const usersCollection = [
  // {
  //   Header: '#',
  //   accessor: "id",
  // },
  {
    Header: 'Username',
    accessor: "displayName",
    // disableSortBy: true,
    // Filter: SelectColumnFilter,
    // filter: 'equals',
    }, 
 { 
    Header: 'E-mail',
    accessor: "email",
    // disableSortBy: true,
    // Filter: SelectColumnFilter,
    // filter: 'equals',
   },
]

