import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { getPlayersByGroup } from './getPlayersByGroup'

export async function removePlayerByGroup(playerName: string, group: string) {
  try {
    const storage = await getPlayersByGroup(group)

    const filtered = storage.filter((player) => player.name !== playerName)

    const playersWithoutRemoved = JSON.stringify(filtered)

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      playersWithoutRemoved,
    )
  } catch (error) {
    throw error
  }
}
