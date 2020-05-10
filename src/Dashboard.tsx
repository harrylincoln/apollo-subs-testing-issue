import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import {
  GET_RUNNING_DATA_SUBSCRIPTION,
  START_GET_RUNNING_DATA,
  STOP_GET_RUNNING_DATA,
} from './queries';

import { useSubscription, useMutation } from '@apollo/react-hooks';

export const Loading = ({text}) => <p>{text}</p>

type Props = ReturnType<typeof mapStateToProps>;

const Dashboard: React.FC<RouteComponentProps & Props> = props => {
  const userHasProduct = !!props.user.serialNumber;

  const [startGetRunningData] = useMutation(START_GET_RUNNING_DATA);

  const [stopGetRunningData] = useMutation(STOP_GET_RUNNING_DATA);

  useEffect(() => {
    startGetRunningData({
      variables: { serialNumber: props.user.serialNumber },
    });

    return () => {
      stopGetRunningData();
    };
  }, [startGetRunningData, stopGetRunningData, props]);

  const SubscriptionData = (): any => {
    const { data, loading } = useSubscription(GET_RUNNING_DATA_SUBSCRIPTION);

    if (loading) {
      return <Loading text="Loading..."/>;
    }

    const metrics = [];
    if (data) {
      console.log('DATA NEVER CALLED IN TEST!');
    }

    return metrics;
  };

  if (!userHasProduct) {
    return <Redirect to="/enter-serial" />;
  }

  return (
    <>
      <SubscriptionData />
    </>
  );
};

const mapStateToProps = (state): any => ({
  ...state,
});

export default connect(mapStateToProps, null)(Dashboard);
