import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '~/components/Background/';
import Appointment from '~/components/Appointments';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, [isFocused, toggle]);

  async function handleCancelAppointment(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );

    setToggle(!toggle);
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onCancel={() => handleCancelAppointment(item.id)}
            />
          )}
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

export default withNavigationFocus(Dashboard);

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
