import {Input} from '@mui/material';
import React from 'react';
import {GroupedJobs} from '../../shared/interfaces/job';
import Job from '../job/Job';
import {CheckGroup} from '../checkGroup/CheckGroup';
import ui from './JobList.module.css'
import Spinner from '../spinner/Spinner'


interface JobsListUiProps {
	onFilterJobs: (text: string) => void;
	jobsListLoading: boolean;
	jobs: GroupedJobs;
	onGroup: (group: string) => void;
}
const JobsListUi: React.FC<JobsListUiProps> = ({
	jobs,
	jobsListLoading,
	onGroup,
}) => {
	const JobsList = jobsListLoading ? (
		<div className={ui.block_spinner}> <Spinner/>  </div>
	) : (
		Object.entries(jobs).map(([title, vacancies]) => (
			<div key={title}>
				<h2>{title}</h2>

				<ul className={ui.card_list}>
					{vacancies.map((job) => (
						<Job job={job} key={job.id} />
					))}
				</ul>
			</div>
		))
	);

	return (
		<div className={ui.block_main}>
			 <CheckGroup onGroup={onGroup} />
			{JobsList}
		</div>
	);
};

export default JobsListUi;
