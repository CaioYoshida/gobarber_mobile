import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateTimeInput from '~/components/DateTimeInput';

import { Container, TimeList, TimeButton, TimeText } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [timeList, setTimeList] = useState([]);
  const provider = navigation.getParam('item');

  useEffect(() => {
    async function loadTimeList() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setTimeList(response.data);
    }

    loadTimeList();
  }, [date, provider.id]);

  function handleSelectHour(selectedHour) {
    navigation.navigate('Confirm', {
      provider,
      hour: selectedHour,
    });
  }

  return (
    <Background>
      <Container>
        <DateTimeInput date={date} onChange={setDate} />
        <TimeList
          data={timeList}
          keyExtractor={time => String(time.time)}
          renderItem={({ item: time }) => (
            <TimeButton
              onPress={() => handleSelectHour(time.value)}
              enabled={time.available}
            >
              <TimeText>{time.time}</TimeText>
            </TimeButton>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
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

SelectDateTime.propTypes = {
  navigation: Proptypes.shape({
    navigate: Proptypes.func.isRequired,
    getParam: Proptypes.func.isRequired,
  }).isRequired,
};
