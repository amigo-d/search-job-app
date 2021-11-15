import React, { FC } from 'react'
import {jobActions} from '../../redux/jobSlice';
import {Input} from '@mui/material';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';

const Search:FC = () => {
    const dispatch = useDispatch();

    const onFilterJobs = (text: string) =>
    dispatch(jobActions.setSearchPattern(text));

    return (
        <>
        <Box
            sx={{
            width: 800,
            maxWidth: '100%',
            textAlign: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            }}
        >
            <Input
            fullWidth
			placeholder=' Работа твоей мечты >'
			onChange={(e) => onFilterJobs(e.target.value)}
		/>
        </Box>
        </>
    )
}

export default Search;