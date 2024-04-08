
import classes from './RoomSelector.module.css';
import generateRandomName from './RandomNameGenerator/RandomNameGenerator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomSelector: React.FC = () => {
	
	const [roomName, setRoomName] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		randomGenerate();
	}, []);


	const randomGenerate = () => {
		const randomName = generateRandomName();
		setRoomName(randomName);
	}

	const handleSubmit = async (e : React.FormEvent) => {
		e.preventDefault();
		const body = JSON.stringify(roomName);
		try{
			const response = await axios.post('endpoint_url', roomName , {
				headers : {
					'Content-Type' : 'application/json',
					'Authorization' : 'Bearer ${}',
				}
			});

			navigate('/roomReady');
			console.log(response);
			
		}catch(error){
			console.error("Failed to create room: ", error);
			//일단은 클릭만해도 roomReady로 이동하게 해뒀지만, roomReady로 이동하는 로직을 막아둬야할 필요는 있음.
			navigate('/roomReady');
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={classes.container}>
				<div className={classes.title}>
					임시 타이틀
				</div>
				<div className={classes.inputGroup}>
					<input 
						type="text" 
						className={classes.input} 
						placeholder="Enter room name" 
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
					/>
					<button className={classes.nameGenButton} onClick={randomGenerate}>
						{/* <img src={refresh} className={classes.icon} alt="refresh"/> */}
						새로고침 버튼
					</button>
				</div>
				<button 
					className={classes.joinButton} 
					type='submit'
				>JOIN</button>
			</div>

		</form>
	)
};

export default RoomSelector;