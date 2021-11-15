import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import {ChangeEvent} from 'react';

interface CheckGroupProps {
	onGroup: (group: string) => void;
}

export const CheckGroup: React.FC<CheckGroupProps> = ({onGroup}) => {
	return (
		<FormControl component='fieldset'>
			{/* <FormLabel component='legend'>Group jobs</FormLabel> */}
			<RadioGroup
				row
				aria-label='NONE'
				name='row-radio-buttons-group'
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					onGroup(e.target.value)
				}>
				<FormControlLabel value='NONE' control={<Radio />} label='по релевантности' />
				<FormControlLabel
					value='OFFICE_NAME'
					control={<Radio />}
					label='по расположению офиса '
				/>
				<FormControlLabel
					value='DEPARTMENT_NAME'
					control={<Radio />}
					label='по отделу'
				/>
			</RadioGroup>
		</FormControl>
	);
};
