import React, { useMemo } from 'react';
import Proptypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointments({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? `${api.defaults.baseURL}/files/${data.provider.avatar.path}`
              : `https://api.adorable.io/avatars/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointments.propTypes = {
  data: Proptypes.shape({
    date: Proptypes.string.isRequired,
    past: Proptypes.bool.isRequired,
    cancelable: Proptypes.bool.isRequired,
    canceled_at: Proptypes.string,
    provider: Proptypes.shape({
      name: Proptypes.string.isRequired,
      avatar: Proptypes.shape({
        path: Proptypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onCancel: Proptypes.func.isRequired,
};
