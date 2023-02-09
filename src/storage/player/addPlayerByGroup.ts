import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'
import { getPlayersByGroup } from './getPlayersByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  try {
    const storagePlayers = await getPlayersByGroup(group)

    const playerAlreadyExists = storagePlayers.filter((player) => {
      return player.name === newPlayer.name
    })

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa ja esta adiciona em um time aqui !')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
