import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background/';

// import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Text>Dashboard</Text>
    </Background>
  );
}

function SubmitIcon({ tintColor }) {
  return <Icon name="event" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: SubmitIcon,
};

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
