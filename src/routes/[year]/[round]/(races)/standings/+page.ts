import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    year: parseInt(params.year),
    round: parseInt(params.round) - 1,
  };
};
