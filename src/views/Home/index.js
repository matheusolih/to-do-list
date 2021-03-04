import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import FilterCard from '../../Components/FilterCard';
import TaskCard from '../../Components/TaskCard';

function Home() {
  const [filterActived, setFilterActived] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [lateCount, setLateCount] = useState();

  async function loadTasks() {
    await api
      .get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
      .then((response) => {
        setTasks(response.data);
      });
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then((response) => {
      setLateCount(response.data.length);
    });
  }

  function clickNotification() {
    setFilterActived('late');
  }

  useEffect(() => {
    loadTasks();
    lateVerify();
  }, [filterActived]);

  return (
    <S.Container>
      <Header lateCount={lateCount} clickNotification={clickNotification} />

      <S.FilterArea>
        <button type="button" onClick={() => setFilterActived('all')}>
          <FilterCard title="Todos" actived={filterActived === 'all'} />
        </button>
        <button type="button" onClick={() => setFilterActived('today')}>
          <FilterCard title="Hoje" actived={filterActived === 'today'} />
        </button>
        <button type="button" onClick={() => setFilterActived('week')}>
          <FilterCard title="Semana" actived={filterActived === 'week'} />
        </button>
        <button type="button" onClick={() => setFilterActived('month')}>
          <FilterCard title="Mês" actived={filterActived === 'month'} />
        </button>
        <button type="button" onClick={() => setFilterActived('year')}>
          <FilterCard title="Ano" actived={filterActived === 'year'} />
        </button>
      </S.FilterArea>

      <S.Title>
        <h3>{filterActived === 'late' ? 'Tarefas atrasadas' : 'Tarefas'}</h3>
      </S.Title>

      <S.Content>
        {tasks.map((t, index) => (
          <Link to={`/task/${t._id}`} key={index}>
            <TaskCard
              title={t.title}
              when={t.when}
              type={t.type}
              done={t.done}
            />
          </Link>
        ))}
      </S.Content>
    </S.Container>
  );
}

export default Home;
