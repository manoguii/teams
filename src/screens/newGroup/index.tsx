import { Button } from '@components/button'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Input } from '@components/input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [groupInput, setGroupInput] = useState('')

  const navigation = useNavigation()

  async function handleCreateNewGroup() {
    try {
      if (groupInput.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma')
      }

      await groupCreate(groupInput)

      navigation.navigate('players', { group: groupInput })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', 'Não foi possivel criar um novo grupo')
      }
      console.log(error)
    }
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
          onChangeText={(event) => setGroupInput(event)}
        />

        <Button title="Criar" onPress={handleCreateNewGroup} />
      </Content>
    </Container>
  )
}
