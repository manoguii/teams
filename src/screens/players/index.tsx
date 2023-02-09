/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@components/button'
import { ButtonIcon } from '@components/buttonIcon'
import { Filter } from '@components/filter'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Input } from '@components/input'
import { ListEmpty } from '@components/listEmpty'
import { Loading } from '@components/loading'
import { PlayerCard } from '@components/playerCard'
import { useNavigation, useRoute } from '@react-navigation/native'
import { removeGroupByName } from '@storage/group/removeGroupByName'
import { addPlayerByGroup } from '@storage/player/addPlayerByGroup'
import { getPlayerByGroupAndTeam } from '@storage/player/getPlayerByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup'
import { AppError } from '@utils/AppError'
import { useRef, useEffect, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

interface RouteParams {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('time a')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const route = useRoute()

  const navigation = useNavigation()

  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar',
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await addPlayerByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      fetchPlayersByTeam()

      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        return Alert.alert('Nova pessoa', 'Não foi possivel adicionar jogador')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playerByTeam = await getPlayerByGroupAndTeam(group, team)

      setPlayers(playerByTeam)
    } catch (error) {
      console.log(error)

      Alert.alert(
        'Pessoas',
        'Não foi possivel carregar as pessoas filtradas do time selecionado',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group)

      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remover', 'Não foi possivel remover esssa pessoa !')
    }
  }

  async function groupRemove() {
    try {
      await removeGroupByName(group)

      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover grupo', 'Não foi possivel remover grupo !')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover a turma ?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={(event) => setNewPlayerName(event)}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef} // passa referencia do input para tirar foco do input ao adicionar player
          onSubmitEditing={handleAddPlayer} // usa botão do teclado para disparar a função
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              onRemove={() => handlePlayerRemove(item.name)}
              name={item.name}
            />
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
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
