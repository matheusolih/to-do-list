import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { format } from 'date-fns';

import api from '../../services/api';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import TypeIcons from '../../utils/typeIcons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task({ match }) {
  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then((response) => {
      setLateCount(response.data.length);
    });
  }

  async function LoadTaskDetails() {
    await api.get(`/task/${match.params.id}`).then((response) => {
      console.log(response.data);
      setType(response.data.type);
      setDescription(response.data.description);
      setTitle(response.data.title);
      setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
      setHour(format(new Date(response.data.when), 'HH:mm'));
    });
  }

  async function Save() {
    await api
      .post(`/task`, {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`,
      })
      .then(() => alert('Tarefa cadastrada com sucesso.'));
  }

  useEffect(() => {
    lateVerify();
    LoadTaskDetails();
  }, []);

  return (
    <S.Container>
      <Header lateCount={lateCount} />

      <S.Form>
        <S.TypeIcons>
          {TypeIcons.map(
            (icon, index) =>
              index > 0 && (
                <button type="button" onClick={() => setType(index)}>
                  <img
                    src={icon}
                    alt="Ícone"
                    className={type && type !== index && 'inative'}
                  />
                </button>
              )
          )}
        </S.TypeIcons>

        <S.Input>
          <span>Título</span>
          <input
            type="text"
            placeHolder="Título da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeHolder="Descrição da tarefa"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <img src={iconCalendar} alt="Calendário" />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input
            type="time"
            onChange={(e) => setHour(e.target.value)}
            value={hour}
          />
          <img src={iconClock} alt="Clock" />
        </S.Input>

        <S.Options>
          <div>
            <input
              type="checkbox"
              onChange={() => setDone(!done)}
              value={done}
            />
            Concluído
          </div>
          <button type="button">Excluir</button>
        </S.Options>

        <S.Save>
          <button type="button" onClick={Save}>
            Salvar
          </button>
        </S.Save>
      </S.Form>

      <Footer />
    </S.Container>
  );
}

export default Task;
