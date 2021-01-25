import { SelectColumnFilter } from './TableFilters';

export const conditionalTableColumns = (props) => {
  
  return props.stateProps.selectedActivity === 0 && props.stateProps.outputTable ? fuelConsumptionColumns : 
  props.stateProps.selectedActivity === 1 && props.stateProps.outputTable ? machineRegitrationColumns : 
  props.stateProps.selectedActivity === 2 && props.stateProps.outputTable ? maintenanceAndRepairsColumns : 
  props.stateProps.selectedActivity === 3 && props.stateProps.outputTable ? workingHoursInputColumns : 
  props.stateProps.selectedActivity === 4 && props.stateProps.outputTable ? workingHoursInputColumns : 
  props.stateProps.selectedActivity === 1 && props.stateProps.adminSection ? fuelManagementColumns : 
  props.stateProps.selectedActivity === 2 && props.stateProps.adminSection ? machineRegistrationManagementColumns :
  props.stateProps.selectedActivity === 3 && props.stateProps.adminSection ? maintenanceAndRepairsManagementColumns :
  props.stateProps.selectedActivity === 4 && props.stateProps.adminSection ? workingHoursManagementColumns : null;
}

const fuelConsumptionColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Fuel Registration',
    accessor: "fuelChoice",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
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
    Header: 'Fuel Supplier',
    accessor: 'supplierOfFuel',
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Delivery Note',
    accessor: 'deliveryNote',
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
    Header: 'Tank residual',
    accessor: "tankResidual",
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
    Header: 'Hours spent on last Activity',
    accessor: 'hoursSpentOnLastActivity',
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
    Header: 'Technician',
    accessor: "technician",
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
    Header: 'Cost Center',
    accessor: "costCenter",
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

const fuelManagementColumns = [
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
    Header: 'Total Liters Spent',
    accessor: 'liters',
  },
]

const machineRegistrationManagementColumns = [
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
    Header: 'Farm',
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
    Header: 'Total Hours/KM Spent',
    accessor: 'hoursSpentOnLastActivity',
  },
]

const maintenanceAndRepairsManagementColumns = [
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
    Header: 'Technician',
    accessor: "technician",
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
  {
    Header: 'Cost Of Technician',
    accessor: 'costOfTechnician',
  },
  {
    Header: 'Worked hours',
    accessor: 'workedHours',
  },
   
]

export const workingHoursManagementColumns = [
  // {
  //   Header: 'Date',
  //   accessor: "date",
  //   disableSortBy: true,
  //   Filter: SelectColumnFilter,
  //   filter: 'equals',
  // },
  {
    Header: 'Employee',
    accessor: "nameOfEmployee",
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
    Header: 'Type Of Hours',
    accessor: "typeOfHours",
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
  // {
  //   Header: 'Cost Center',
  //   accessor: "costCenter",
  //   disableSortBy: true,
  //   Filter: SelectColumnFilter,
  //   filter: 'equals',
  // },
  // {
  //   Header: 'Job Description',
  //   accessor: "jobDescription",
  //   disableSortBy: true,
  //   Filter: SelectColumnFilter,
  //   filter: 'equals',
  // },
  
  {
    
    Header: "date",
    accessor: 'manHours',
  },
]