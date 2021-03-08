import React, { useState } from 'react';
import * as S from './styles';
import Qr from 'qrcode.react';

import Header from '../../Components/Header';

function QrCode() {
  return (
    <S.Container>
      <Header />

      <S.Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <S.QrCodeArea>
          <Qr value="getMacAddress" size={350} />
        </S.QrCodeArea>
        <p>Suas atividades serão sincronizadas com o celular</p>
      </S.Content>

      <S.ValidationCode>
        <span>Digite a numeração que apareceu no celular</span>
        <input type="text" />
        <button type="button">SINCRONIZAR</button>
      </S.ValidationCode>
    </S.Container>
  );
}

export default QrCode;
