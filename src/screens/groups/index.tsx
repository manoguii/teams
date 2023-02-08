import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Container } from './styles'

export function Groups() {
  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />

      <GroupCard title="Galera do Ignite" />
    </Container>
  )
}
