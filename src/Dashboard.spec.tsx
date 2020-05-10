import React from 'react';
import thunk from 'redux-thunk';
import wait from 'waait';
import { createMemoryHistory } from 'history';
import { create } from 'react-test-renderer';
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';

import Dashboard, {Loading} from './Dashboard';

import * as apolloHooksModule from '@apollo/react-hooks';

import {
  START_GET_RUNNING_DATA,
  STOP_GET_RUNNING_DATA,
  GET_RUNNING_DATA_SUBSCRIPTION,
} from './queries';

const mockStore = configureMockStore([thunk]);

const serialNumber = 'AL3286wefnnsf';

describe('Dashboard page', () => {
  let store: any;

  const fakeHistory = createMemoryHistory();

  const mocks = [
    {
      request: {
        query: START_GET_RUNNING_DATA,
        variables: {
          serialNumber,
        },
      },
      result: {
        data: {
          startFetchingRunningData: {
            startedFetch: true,
          },
        },
      },
    },
    {
      request: {
        query: GET_RUNNING_DATA_SUBSCRIPTION,
      },
      result: {
        data: {
          onLastPowerUpdate: {
            someProp1: 'prop1',
            someProp2: 'prop2'
          },
        },
      },
    },
    {
      request: {
        query: STOP_GET_RUNNING_DATA,
      },
      result: {
        data: {
          startFetchingRunningData: {
            startedFetch: false,
          },
        },
      },
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when initialising to get data', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          serialNumber,
          token: 'some.token.yeah',
          hydrated: true,
        },
      });
      store.dispatch = jest.fn();
    });

    it('should show a loading state while fetching subscription', async () => {
      const useMutationSpy = jest.spyOn(apolloHooksModule, 'useMutation');

      const component = create(
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Router history={fakeHistory}>
              <Dashboard />
            </Router>
          </MockedProvider>
        </Provider>,
      );
      expect(component.root.findAllByType(Loading)[0].props.text).toBe(
        'Loading...',
      );
    });

    it('should consume the subscription', async () => {
      const component = create(
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Router history={fakeHistory}>
              <Dashboard />
            </Router>
          </MockedProvider>
        </Provider>,
      );
      await wait(0); // wait for data to kick over but it never does.
    });
  });
});
