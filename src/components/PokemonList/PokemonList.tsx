import React, { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate, useParams, Routes, Route } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery, gql } from '@apollo/client';

const POKEMON_DETAILS_QUERY = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  if (loading) return <div className={classes.loading}>Loading...</div>;

  const openDialog = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <>
      <input
        className={classes.searchBox}
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={classes.root}>
        {filteredPokemons.map((pkmn) => (
          <div
            key={pkmn.id}
            className={classes.card}
            onClick={() => openDialog(pkmn.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') openDialog(pkmn.name);
            }}
          >
            <img src={pkmn.image} alt={pkmn.name} className={classes.image} />
            <h3>{pkmn.name}</h3>
            <p>#{pkmn.number}</p>
            <div className={classes.types}>
              {pkmn.types.map((type) => (
                <span key={type} className={classes.type}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Routes>
        <Route path="pokemon/:name" element={<PokemonDialog onClose={() => navigate('/')} />} />
      </Routes>
    </>
  );
};

const PokemonDialog = ({ onClose }: { onClose: () => void }) => {
  const classes = useStyles();
  const { name } = useParams<{ name: string }>();

  const { data, loading, error } = useQuery(POKEMON_DETAILS_QUERY, {
    variables: { name },
  });

  if (loading)
    return (
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );

  if (error)
    return (
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Error loading Pokémon details</DialogTitle>
        <DialogContent>{error.message}</DialogContent>
      </Dialog>
    );

  const pkmn = data?.pokemon;

  if (!pkmn) return null;

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{pkmn.name} (#{pkmn.number})</DialogTitle>
      <DialogContent dividers>
        <img
          src={pkmn.image}
          alt={pkmn.name}
          className={classes.dialogImage}
        />
        <p className={classes.dialogText}><b>Classification:</b> {pkmn.classification}</p>
        <p className={classes.dialogText}>
          <b>Height:</b> {pkmn.height.minimum} - {pkmn.height.maximum}
        </p>
        <p className={classes.dialogText}>
          <b>Weight:</b> {pkmn.weight.minimum} - {pkmn.weight.maximum}
        </p>
        <p className={classes.dialogText}><b>Types:</b> {pkmn.types.join(', ')}</p>
        <p className={classes.dialogText}><b>Resistant to:</b> {pkmn.resistant.join(', ')}</p>
        <p className={classes.dialogText}><b>Weaknesses:</b> {pkmn.weaknesses.join(', ')}</p>
        <p className={classes.dialogText}><b>Flee Rate:</b> {pkmn.fleeRate}</p>
        <p className={classes.dialogText}><b>Max CP:</b> {pkmn.maxCP}</p>
        <p className={classes.dialogText}><b>Max HP:</b> {pkmn.maxHP}</p>
      </DialogContent>
    </Dialog>
  );
};



const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 20,
    padding: 32,
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.5rem',
    color: '#fff',
  },
  card: {
    background: '#222',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    textAlign: 'center',
    userSelect: 'none',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
      cursor: 'pointer',
    },
    outline: 'none',
  },
  image: {
    width: 120,
    height: 120,
    objectFit: 'contain',
    marginBottom: 12,
  },
  types: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  type: {
    background: '#444',
    padding: '4px 8px',
    borderRadius: 8,
    fontSize: '0.8rem',
    color: '#fff',
  },
  searchBox: {
    width: '100%',
    maxWidth: 400,
    margin: '16px auto',
    display: 'block',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#fff',
  },
  dialogImage: {
    display: 'block',
    margin: '0 auto 1rem',
    maxWidth: 150,
  },
  dialogText: {
    marginBottom: 8,
  },
});
