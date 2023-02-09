import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'

export async function groupsGetAll() {
  try {
    const storages = await AsyncStorage.getItem(GROUP_COLLECTION)

    const groups: string[] = storages ? JSON.parse(storages) : []

    return groups
  } catch (error) {
    throw error
  }
}
