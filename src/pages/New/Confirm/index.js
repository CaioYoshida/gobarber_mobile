import React, { useMemo } from 'react';
import Proptypes from 'prop-types';
import { formatRelative, parseISO, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const hour = navigation.getParam('hour');

  const dateFormatted = useMemo(
    () =>
      formatRelative(subHours(parseISO(hour), 2), new Date(), { locale: pt }),
    [hour]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: hour,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? `${api.defaults.baseURL}/files/${provider.avatar.path}`
              : `https://api.adorable.io/avatars/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>Confirmar</SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={24} color="#FFF" />
    </TouchableOpacity>
  ),
});

Confirm.propTypes = {
  navigation: Proptypes.shape({
    navigate: Proptypes.func.isRequired,
    getParam: Proptypes.func.isRequired,
  }).isRequired,
};
