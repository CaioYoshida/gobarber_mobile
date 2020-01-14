import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background/';
import Appointment from '~/components/Appointments';

import { Container, Title, List } from './styles';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Appointment data={item} />}
        />
      </Container>
    </Background>
  );
}

function SubmitIcon({ tintColor }) {
  return <Icon name="event" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: SubmitIcon,
};

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
