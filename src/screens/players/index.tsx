import { ButtonIcon } from '@components/buttonIcon'
import { Filter } from '@components/filter'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Input } from '@components/input'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

export function Players() {
  const [team, setTeam] = useState('time a')
  const [player, setPlayer] = useState([])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Os crias do fut"
        subTitle="adicione a galera e separe os times"
      />

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

        <NumberOfPlayers>{player.length}</NumberOfPlayers>
      </HeaderList>
    </Container>
  )
}
