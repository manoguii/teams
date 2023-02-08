import { ButtonIcon } from '@components/buttonIcon'
import { Container, Icon, Name } from './styles'

interface PlayerCardProps {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>

      <ButtonIcon type="SECONDARY" icon="close" onPress={onRemove} />
    </Container>
  )
}
