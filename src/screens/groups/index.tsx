import { StyleSheet, Text, View } from 'react-native'

export function Groups() {
  return (
    <View style={styles.container}>
      <Text>Hello wolrd</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
