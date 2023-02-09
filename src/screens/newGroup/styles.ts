import { UsersThree } from 'phosphor-react-native'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY_600};
  padding: 52px 19px;
`
export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Icon = styled(UsersThree).attrs((props) => ({
  size: 56,
  color: props.theme.COLORS.GREEN_700,
}))`
  align-self: center;
`
