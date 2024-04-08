
import classes from './RoomSelector.module.css';
import generateRandomName from './RandomNameGenerator/RandomNameGenerator';
import { useEffect, useState } from 'react';

const RoomSelector: React.FC = () => {
	
	const [roomName, setRoomName] = useState<string>('');
	
	useEffect(() => {
		randomGenerate();
	}, []);


	const randomGenerate = () => {
		const randomName = generateRandomName();
		setRoomName(randomName);
	}

	const handleSubmit = (e : React.FormEvent) => {
		e.preventDefault();
		
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
				<button className={classes.joinButton}>JOIN</button>
			</div>
		</form>
	)
};

export default RoomSelector;