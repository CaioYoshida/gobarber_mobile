import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item }) => (
            <Provider
              onPress={() => navigation.navigate('SelectDateTime', { item })}
            >
              <Avatar
                source={{
                  uri: item.avatar
                    ? `${api.defaults.baseURL}/files/${item.avatar.path}`
                    : `https://api.adorable.io/avatars/50/${item.name}.png`,
                }}
              />
              <Name>{item.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={24} color="#FFF" />
    </TouchableOpacity>
  ),
});

SelectProvider.propTypes = {
  navigation: Proptypes.shape({
    navigate: Proptypes.func.isRequired,
  }).isRequired,
};
