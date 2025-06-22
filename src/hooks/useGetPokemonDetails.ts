import { useQuery, gql } from '@apollo/client';
import { Pokemon } from '../types/pokemon';

const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
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

type GetPokemonDetailsResponse = {
  pokemon: Pokemon;
};

type GetPokemonDetailsVars = {
  name?: string;
};

export const useGetPokemonDetails = (name?: string) => {
  const { data, loading, error } = useQuery<
    GetPokemonDetailsResponse,
    GetPokemonDetailsVars
  >(GET_POKEMON_DETAILS, {
    variables: { name },
    skip: !name,
  });

  return {
    pokemon: data?.pokemon,
    loading,
    error,
  };
};
