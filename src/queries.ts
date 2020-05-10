
import gql from 'graphql-tag';

export const GET_RUNNING_DATA_SUBSCRIPTION = gql`
  subscription OnLastPowerUpdate {
    onLastPowerUpdate {
      someProp1,
      someProp2
    }
  }
`;

export const START_GET_RUNNING_DATA = gql`
  mutation startFetchingRunningData($serialNumber: String) {
    startFetchingRunningData(serialNumber: $serialNumber) {
      startedFetch
    }
  }
`;

export const STOP_GET_RUNNING_DATA = gql`
  mutation stopFetchingRunningData($serialNumber: String) {
    stopFetchingRunningData(serialNumber: $serialNumber) {
      startedFetch
    }
  }
`;
