import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonDialog } from '../components';

export const PokemonDialogWrapper = () => {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  return (
    <PokemonDialog
      name={name}
      onClose={() => navigate('/pokemon')}
    />
  );
}; 