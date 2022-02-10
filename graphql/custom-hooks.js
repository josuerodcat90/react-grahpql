import { useQuery } from '@apollo/client';
import { All_PERSONS } from './queries';

export const usePersons = () => {
	const result = useQuery(All_PERSONS);
	return result;
};
