import axios from 'axios';
import {IJob} from '../shared/interfaces/job';

const getJobs = async (): Promise<IJob[]> => {
	const {data} = await axios.get(
		`https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k`,
	);
	return data.jobs;
};

export const jobsApi = {getJobs};
