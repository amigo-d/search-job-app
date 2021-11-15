import React, {useState} from 'react';
import {IJob} from '../../shared/interfaces/job';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ui from './Job.module.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';


interface JobProps {
	job: IJob;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	height: '100vh',
};

const Job: React.FC<JobProps> = ({job}) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className={ui.card}>
			<h3>{job.name}</h3>
			<div className={ui.card_info}>
				<div>
					<div className={ui.card_field}> <AssignmentIcon/>  Contract: {job.contract_type.en}</div>  
					<div className={ui.card_field}><BusinessIcon/> Ofiice: {job.office.name}</div>
				</div>
			 
			<Button variant="outlined" onClick={handleOpen}> Подробнее </Button>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style} style={{overflowY: 'auto'}}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{job.name}
					</Typography>
					<Typography id='modal-modal-description' sx={{mt: 2}}>
						<Box
						dangerouslySetInnerHTML={{__html: job.description}} />
						<div className={ui.modalText}>
						<h2 className={ui.element}>About recrutment process:</h2>
						<p dangerouslySetInnerHTML={{__html: job.recruitment_process}}></p>
						<a href={`${job.websites_urls[0]?.url}`}>
							<Button variant='outlined' className={ui.element}> На сайт работодателя </Button>
						</a>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default Job;
