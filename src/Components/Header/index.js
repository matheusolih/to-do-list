import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

import api from '../../services/api';

function Header({ clickNotification }) {
  useEffect(() => {
    lateVerify();
  }, []);

  const [lateCount, setLateCount] = useState();

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then((response) => {
      setLateCount(response.data.length);
    });
  }
  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <Link to="/">INÍCIO</Link>
        <span className="dividir" />
        <Link to="/task">NOVA TAREFA</Link>
        <span className="dividir" />
        <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
        {lateCount && (
          <>
            <span className="dividir" />
            <button onClick={clickNotification} id="notification">
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        )}
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
