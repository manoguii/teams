import { Button } from '@components/button'
import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { ListEmpty } from '@components/listEmpty'
import { Loading } from '@components/loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll'
import { useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container } from './styles'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const groupsInStorage = await groupsGetAll()

      setGroups(groupsInStorage)
    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não existe nenhuma turma cadastrada, que tal cadastrar a primeira turma ?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
