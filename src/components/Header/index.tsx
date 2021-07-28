import { Container, Content } from "./styles";
import logo from "../../assets/logo.svg";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logo} alt="dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}