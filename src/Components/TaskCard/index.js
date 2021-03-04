import React, { useMemo } from 'react';
import * as S from './styles';
import { format } from 'date-fns';

import typeIcons from '../../utils/typeIcons';

function TaskCard({ type, title, when, done }) {
  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'));
  const hour = useMemo(() => format(new Date(when), 'HH:mm'));

  return (
    <S.Container done={done}>
      <S.TopCard>
        <img src={typeIcons[type]} alt="Icone da tarefa" />
        <h3>{title}</h3>
      </S.TopCard>
      <S.BottonCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </S.BottonCard>
    </S.Container>
  );
}

export default TaskCard;
