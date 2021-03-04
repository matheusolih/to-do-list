import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { format } from 'date-fns';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../Components/Header';
import TypeIcons from '../../utils/typeIcons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task({ match }) {
  const [redirect, setRedirect] = useState(false);
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
      setType(response.data.type);
      setDone(response.data.done);
      setDescription(response.data.description);
      setTitle(response.data.title);
      setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
      setHour(format(new Date(response.data.when), 'HH:mm'));
    });
  }

  async function Save() {
    //Validação
    if (!title) return alert('Você precisa informar um título');
    else if (!description) return alert('Você precisa informar uma descrição');
    else if (!type) return alert('Você precisa informar um tipo');
    else if (!date) return alert('Você precisa informar uma data');
    else if (!hour) return alert('Você precisa informar uma hora');

    if (match.params.id) {
      await api
        .put(`/task/${match.params.id}`, {
          macaddress,
          done,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000`,
        })
        .then(() => setRedirect(true))
        .catch((error) => alert(`Erro: ${error.message}`));
    } else {
      await api
        .post(`/task`, {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000`,
        })
        .then(() => setRedirect(true))
        .catch((error) => alert(`Erro: ${error.message}`));
    }
  }

  async function Remove() {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/task/${match.params.id}`).then(() => {
        alert('Excluido com sucesso.');
        setRedirect(true);
      });
    }
  }

  useEffect(() => {
    lateVerify();
    LoadTaskDetails();
  }, []);

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
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
            placeholder="Título da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeholder="Descrição da tarefa"
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
              checked={done}
            />
            Concluído
          </div>
          {match.params.id && (
            <button type="button" onClick={Remove}>
              Excluir
            </button>
          )}
        </S.Options>

        <S.Save>
          <button type="button" onClick={Save}>
            Salvar
          </button>
        </S.Save>
      </S.Form>
    </S.Container>
  );
}

export default Task;
