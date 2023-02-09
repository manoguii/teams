import { Button } from '@components/button'
import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { ListEmpty } from '@components/listEmpty'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Futebol de domingo'])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <ListEmpty message="Não existe nenhuma turma cadastrada, que tal cadastrar a primeira turma ?" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
