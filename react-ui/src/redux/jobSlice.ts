import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {GroupBy, GroupedJobs, IJob} from '../shared/interfaces/job';
import {RootState} from './store';
import {jobsApi} from '../api/jobs';

interface IInitialState {
	loading: boolean;
	jobs: IJob[];
	jobsFiltred: IJob[];
	error: null | string;
	searchPattern: string;
	groupBy: string;
}
const initialState: IInitialState = {
	loading: false,
	jobs: [],
	jobsFiltred: [],
	error: null,
	searchPattern: '',
	groupBy: GroupBy.NONE,
};

const fetchJobs = createAsyncThunk(
	'jobs/fetch-jobs',
	async function getJobs(): Promise<IJob[]> {
		try {
			return await jobsApi.getJobs();
		} catch (error) {
			console.log((error as Error).message);
		}
		return [];
	},
);

export const jobSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		setLoading: (state, {payload}) => {
			state.loading = payload;
		},
		setJobs: (state, {payload}: {payload: IJob[]}) => {
			state.jobs = payload;
		},
		setSearchPattern: (state, {payload}: {payload: string}) => {
			const filteredSearch = filterByPattern(payload, state.jobs);
			state.searchPattern = payload;
			state.jobsFiltred = filteredSearch;
		},
		setGroupBy: (state, {payload}: {payload: string}) => {
			state.groupBy = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchJobs.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchJobs.fulfilled,
			(state, action: PayloadAction<IJob[]>) => {
				state.loading = false;
				state.jobsFiltred = state.jobs = action.payload;
			},
		);
		builder.addCase(fetchJobs.rejected, (state) => {
			state.error = 'Failed to fetch jobs';
			state.loading = false;
		});
	},
	// extraReducers: {
	// 	[fetchJobs.pending]: (state) => {
	// 		state.loading = true;
	// 	},
	// 	[fetchJobs.fulfilled]: (state: IInitialState, {payload}) => {
	// 		state.jobsFiltred = state.jobs = payload;
	// 		state.loading = false;
	// 	},
	// 	[fetchJobs.rejected]: (
	// 		state: IInitialState,
	// 		{payload}: {payload: string},
	// 	) => {
	// 		state.error = payload;
	// 		state.loading = false;
	// 	},
	// },
});

export const jobActions = jobSlice.actions;

export const jobThunkActions = {
	fetchJobs,
};

export const jobSelectors = {
	getLoading: (state: RootState) => state.jobReducer.loading,
	getJobs: (state: RootState) => {
		if (state.jobReducer.searchPattern) {
			filterByPattern(
				state.jobReducer.searchPattern,
				state.jobReducer.jobsFiltred,
			);
		}
		return groupBy(state.jobReducer.groupBy, state.jobReducer.jobsFiltred);
	},
};

export default jobSlice.reducer;

function filterByPattern(searchPattern: string, jobs: IJob[]): IJob[] {
	const lowerCasedInput = searchPattern.toLowerCase();
	return jobs.filter((job) => {
		const searchPattern =
			`${job.name}-${job.slug}-${job.profile}-${job.description}`.toLowerCase();
		return searchPattern.includes(lowerCasedInput);
	});
}

function groupBy(by: string, jobs: IJob[]): GroupedJobs {
	if (by === GroupBy.NONE) {
		return {
			_: jobs,
		};
	}

	const grouped: GroupedJobs = {};

	for (const job of jobs) {
		const officePath = job.office.name;
		const departmentPath = job.department.name;

		const path = by === GroupBy.OFFICE_NAME ? officePath : departmentPath;

		const lookup = grouped[path];

		if (!lookup) {
			grouped[path] = [job];
		} else {
			grouped[path].push(job);
		}
	}

	return grouped;
}
