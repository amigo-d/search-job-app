import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {jobActions, jobSelectors, jobThunkActions} from '../../redux/jobSlice';
import JobsListUi from './jobsList.ui';

export const JobList: React.VFC = () => {
	// heap
	const jobsListLoading = useSelector(jobSelectors.getLoading);
	const dispatch = useDispatch();
	const jobs = useSelector(jobSelectors.getJobs);

	const onFilterJobs = (text: string) =>
		dispatch(jobActions.setSearchPattern(text));

	const onGroup = (group: string) => dispatch(jobActions.setGroupBy(group));

	useEffect(() => {
		dispatch(jobThunkActions.fetchJobs());
	}, [dispatch]);

	return (
		<JobsListUi
			jobs={jobs}
			jobsListLoading={jobsListLoading}
			onFilterJobs={onFilterJobs}
			onGroup={onGroup}
		/>
	);
};
