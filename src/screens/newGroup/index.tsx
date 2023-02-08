import { Button } from '@components/button'
import { Header } from '@components/header'
import { Highlight } from '@components/highligth'
import { Input } from '@components/input'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subTitle="crie uma turma para adicionar pessoas"
        />

        <Input placeholder="Nome da turma" />

        <Button title="Criar" />
      </Content>
    </Container>
  )
}
