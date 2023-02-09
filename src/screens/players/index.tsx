import { Button } from '@components/button'
import { ButtonIcon } from '@components/buttonIcon'
import { Filter } from '@components/filter'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Input } from '@components/input'
import { ListEmpty } from '@components/listEmpty'
import { PlayerCard } from '@components/playerCard'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

interface RouteParams {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('time a')
  const [players, setPlayers] = useState([])

  const route = useRoute()

  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['time a', 'time b']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard onRemove={() => {}} name={item} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  )
}
