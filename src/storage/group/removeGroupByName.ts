import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupsGetAll'

export async function removeGroupByName(groupDeleted: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groupsWithoutRemoved = storedGroups.filter(
      (group) => group !== groupDeleted,
    )

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(groupsWithoutRemoved),
    )

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    throw error
  }
}
