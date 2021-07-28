import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import outcomeImg from "../../assets/outcome.svg";
import incomeImg from "../../assets/income.svg";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handlerCreateNewTransaction(event: FormEvent){
    event.preventDefault();
    await createTransaction({
        title,
        amount,
        category,
        type 
      })

      setTitle(' ')
      setAmount(0);
      setCategory(' ');   
      setType('deposit');
      onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

    <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      
      <Container onSubmit={handlerCreateNewTransaction}>
        <h1>Cadastrar transação</h1>

        <input 
          type="text" 
          placeholder="Título" 
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input 
          type="number" 
          placeholder="Preço" 
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={ type === 'deposit'}
            onClick={() => setType('deposit')}
            activeColors="green"
           >
             <img src={incomeImg} alt="Entrada" />
             <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={ type === 'withdraw'}
            onClick={() => setType('withdraw')}
            activeColors="red"
           >
             <img src={outcomeImg} alt="Saida" />
             <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          value={category}
          placeholder="Categoria"
          onChange={event => setCategory(event.target.value)}
          />

        <button type="submit"> 
          Cadastrar 
        </button>
      </Container>
    </Modal>
  );
}