import React from 'react';

const FaceRecognition = ({imageUrl}) => {
	return(
		<div className='center'>
			<div className=''>
				<img alt='' src={imageUrl} />
			</div>
		</div>
	);
}

export default FaceRecognition;