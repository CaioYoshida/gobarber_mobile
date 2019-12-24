import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

import Input from '~/components/Input/index';
import Button from '~/components/Button/index';
import Background from '~/components/Background/index';

export default function SignIn() {
  return (
    <Background>
      <Text>SignIn</Text>

      <Input style={{ marginTop: 30 }} icon="call" placeholder="Digite aqui" />

      <Button>Entrar</Button>
    </Background>
  );
}
