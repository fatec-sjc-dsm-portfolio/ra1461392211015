'use client'

import Card from "./components/Card/cardStation";
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import Estacoes from "./components/Pages/Estacoes/estacoes";
import { useState } from "react";

const App: React.FC = () => {
  const isClient = typeof window !== 'undefined';

  const page = useSelector((state: RootState) => state.page);

  return (
    <>
      {isClient && page}
    </>
  );
};

export default App;
