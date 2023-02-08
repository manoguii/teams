import { Button } from '@components/button'
import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { ListEmpty } from '@components/listEmpty'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Futebol de domingo'])

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
      />

      <Button title="Criar nova turma" />
    </Container>
  )
}
