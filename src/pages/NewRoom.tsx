import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss'
import { Button } from '../components/Buttons';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando bate-papo" />  
        <strong>Crie salas de Q&amp;A ao-vivo!</strong>
        <p>Tire as dúvidas da sua sala em tempo-real.</p>     
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo da aplicação Letmeask" /> 
          <h1>Crie uma nova sala</h1>
          <form onSubmit={handleCreateRoom}>
            <input
             type="text"
             placeholder="Nome da sala"
             onChange={event => setNewRoom(event.target.value)}
             value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala? já existente? 
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}