import type { PageLoad } from '../background/$types';

export const load: PageLoad = ({ params }) => {
  return {
    year: parseInt(params.year),
    round: parseInt(params.round) - 1,
  };
};
