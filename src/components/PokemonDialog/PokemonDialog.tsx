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
} from '@mui/material';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';

type Props = {
  name?: string;
  onClose: () => void;
};


export const PokemonDialog = ({ name, onClose }: Props) => {
  const classes = useStyles();
  const { pokemon, loading, error } = useGetPokemonDetails(name);

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          className: classes.dialogPaper,
        },
      }}
    >

      <DialogTitle className={classes.title}>
        {pokemon?.name || 'Loading Pokémon...'}
      </DialogTitle>

      <DialogContent>
        {loading && <CircularProgress />}
        {error && (
          <Typography className={classes.errorText}>
            Error loading Pokémon details.
          </Typography>
        )}

        {pokemon && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className={classes.image}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="body2" className={classes.statText}>
                Number: {pokemon.number}
              </Typography>
              <Typography variant="body2" className={classes.statText}>
                Max HP: {pokemon.maxHP}
              </Typography>
              <Typography variant="body2" className={classes.statText}>
                Max CP: {pokemon.maxCP}
              </Typography>
              <Typography variant="body2" className={classes.statText}>
                Height: {pokemon.height.minimum} - {pokemon.height.maximum}
              </Typography>
              <Typography variant="body2" className={classes.statText}>
                Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}
              </Typography>
              <Typography variant="body2" className={classes.statText}>
                Classification: {pokemon.classification}
              </Typography>
              <Typography variant="body2" className={classes.statText}>
                Flee Rate: {pokemon.fleeRate}
              </Typography>

              <Typography variant="subtitle2" className={classes.sectionTitle}>
                Types:
              </Typography>
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  size="small"
                  className={classes.chip}
                />
              ))}

              <Typography variant="subtitle2" className={classes.sectionTitle}>
                Weaknesses:
              </Typography>
              {pokemon.weaknesses.map((w) => (
                <Chip
                  key={w}
                  label={w}
                  size="small"
                  className={classes.chip}
                  color="error"
                />
              ))}
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const useStyles = createUseStyles({
  dialogPaper: {
    '&.MuiPaper-root': {
      backgroundColor: '#1e1e2f',
      color: '#fff',
      padding: 16,
    },
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
  },
  statText: {
    marginBottom: 4,
  },
  chip: {
    margin: 4,
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: 600,
  },
  errorText: {
    color: 'red',
  },
});