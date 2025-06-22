import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';

type Props = {
  name?: string;
  onClose: () => void;
};

export const PokemonDialog = ({ name, onClose }: Props) => {
  const theme = useTheme();
  const { pokemon, loading, error } = useGetPokemonDetails(name);

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1e1e2f',
          color: '#fff',
          padding: 2,
        },
      }}
    >
      <DialogTitle sx={{ color: '#fff', fontWeight: 'bold' }}>
        {pokemon?.name || 'Loading Pokémon...'}
      </DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error loading Pokémon details.</Typography>}

        {pokemon && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} textAlign="center">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: 120, height: 120 }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="body2">Number: {pokemon.number}</Typography>
              <Typography variant="body2">Max HP: {pokemon.maxHP}</Typography>
              <Typography variant="body2">Max CP: {pokemon.maxCP}</Typography>
              <Typography variant="body2">
                Height: {pokemon.height.minimum} - {pokemon.height.maximum}
              </Typography>
              <Typography variant="body2">
                Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Classification: {pokemon.classification}
              </Typography>
              <Typography variant="body2">Flee Rate: {pokemon.fleeRate}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>Types:</Typography>
              {pokemon.types.map((type) => (
                <Chip key={type} label={type} size="small" sx={{ m: 0.5 }} />
              ))}

              <Typography variant="subtitle2" sx={{ mt: 2 }}>Weaknesses:</Typography>
              {pokemon.weaknesses.map((w) => (
                <Chip
                  key={w}
                  label={w}
                  size="small"
                  color="error"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};
