import { SelectColumnFilter } from './TableFilters';

export const conditionalTableColumns = (props) => {
 return props.stateProps.selectedActivity === 0 ? fuelConsumptionColumns : 
  props.stateProps.selectedActivity === 1 ? machineRegitrationColumns : 
  props.stateProps.selectedActivity === 2 ? maintenanceAndRepairsColumns : 
  props.stateProps.selectedActivity === 3 ? workingHoursInputColumns : null;
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
    Header: 'Liters',
    accessor: 'liters',
  },
  {
    Header: 'Kilometers',
    accessor: 'kilometers',
  },
  {
    Header: 'Tank #',
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
    Header: 'Farm Location',
    accessor: "farmLocation",
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

const maintenanceAndRepairsColumns = [
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
    Header: 'Worked hours',
    accessor: 'workedHours',
  },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'External Technician',
    accessor: "externalTechnician",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Maint./Rep.',
    accessor: "maintenanceOrRerairs",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "jobDescription",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  // {
  //   Header: 'Man hours',
  //   accessor: 'manHours',
  // },
  {
    Header: 'Cost Of Technician',
    accessor: 'costOfTechnician',
  },
  {
    Header: 'Acitivity Explained',
    accessor: 'explainTheActivity',
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

export const workingHoursInputColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Employee',
    accessor: "nameOfEmployee",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  }, 
  {
    Header: 'Type Of Hours',
    accessor: "typeOfHours",
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
    Header: 'Project',
    accessor: "project",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "jobDescription",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Man hours',
    accessor: 'manHours',
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
  {
    Header: 'Username',
    accessor: "displayName",
    }, 
 { 
    Header: 'E-mail',
    accessor: "email",
  },
   { 
      Header: 'Role',
      accessor: "role",
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
   }, 
]

