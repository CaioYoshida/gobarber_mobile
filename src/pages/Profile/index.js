import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background/index';

// import { Container } from './styles';

export default function Profile() {
  return (
    <Background>
      <Text>Profile</Text>
    </Background>
  );
}

function SubmitIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}

Profile.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: SubmitIcon,
};

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
