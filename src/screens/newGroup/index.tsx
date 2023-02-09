import { Button } from '@components/button'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Input } from '@components/input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', { group })
  }

  return (
    <Container behavior="padding" enabled>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subTitle="crie uma turma para adicionar pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={(event) => setGroup(event)}
        />

        <Button title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  )
}
