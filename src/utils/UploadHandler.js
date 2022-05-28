import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { toast } from 'react-toastify';
import axios from '../axios/index';
import ImagePreview from './ImagePreview';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
}));
export default function UploadHandler({ getUrl, text }) {
	const classes = useStyles();
	const [selectedFile, setSelectedFile] = useState('');
	const [isSelected, setIsSelected] = useState(false);
	const [preview, setPreview] = useState();
	const [openPreview, setopenPreview] = useState(false);
	const [width, setwidth] = useState(200);

	const [loading, setloading] = useState(false);
	// create a preview as a side effect, whenever selected file is changed
	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		setopenPreview(true);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};
	const handleClose = () => {
		console.log('closing');
		setSelectedFile('');
		setPreview('');
		setIsSelected(false);
		setopenPreview(false);
	};
	const handleSubmission = async () => {
		try {
			// Handle Loader
			setloading(true);

			const formData = new FormData();
			formData.append('file', selectedFile);
			console.log('submitted');
			const { data } = await axios.post(`api/upload/banners`, formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});
			getUrl(data);
			handleClose();

			setTimeout(() => {
				setloading(false);
			}, 600);
		} catch (error) {
			console.log(error);
			toast.error('Error - Please try again later');
			setloading(false);
		}
	};

	return (
		<div>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<input
				name='file'
				accept='image/*'
				style={{ display: 'none' }}
				onChange={changeHandler}
				id={text}
				type='file'
			/>
			<label htmlFor={text}>
				<span>{text}</span>
				<IconButton
					color='primary'
					aria-label='upload picture'
					component='span'
				>
					<PhotoCamera />
				</IconButton>
			</label>
			{isSelected && (
				<>
					<ImagePreview
						open={openPreview}
						preview={preview}
						width={width}
						text={text}
						selectedFile={selectedFile}
						handleClose={handleClose}
						handleSubmission={handleSubmission}
					/>
				</>
			)}
		</div>
	);
}
