import React, { useState } from 'react';
import Page from '@/components/Page';
import WithAuth from '@/components/WithAuth';
import GameBoard from '@/components/GameBoard';
import gamePlay from '@/data/gamePlay.json';
import { toast } from 'react-hot-toast';

const Game = () => {
	const [gameData, setGameData] = useState<any>({
		title: 'Start',
		level: 1,
		obj: gamePlay.Start,
	});
	const reset = () => {
		setGameData({
			title: 'Start',
			level: 1,
			obj: gamePlay.Start,
		});
	};
	async function postAchievement(achievement: string) {
		try {
			const response = await fetch('/api/user/newAchievement', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ achievement }),
			});
			if (!response.ok) {
				if (response.status === 500) {
					toast.error(
						'Server temporarily unavailable. Please try again later.'
					);
					return;
				}
				const result = await response.json();
				console.error(result);
				toast.error(result.message);
				return;
			}
		} catch (e) {
			console.log(e);
		}
	}
	const setAnswer = (answer: string) => {
		console.log('Answer: ', answer);
		let idx = answer.toLowerCase();
		let nextGameData: any = {};
		nextGameData['title'] = answer;
		nextGameData['level'] = gameData.level + 1;
		//check if obj[idx] is an array
		if (Array.isArray(gameData.obj[idx])) {
			//if it is, then we need to pick a random one
			let randomIdx = Math.floor(
				Math.random() * gameData.obj[idx as any].length
			);
			nextGameData['obj'] = gameData.obj[idx as any][randomIdx];
		} else {
			//if it is not, then we can just use it
			nextGameData['obj'] = gameData.obj[idx];
		}
		//check if any achievements are present
		if ('achievement' in nextGameData['obj']) {
			postAchievement(nextGameData['obj'].achievement);
			toast.success(nextGameData['obj'].achievement);
		}
		console.log('Next Game Data: ', nextGameData);
		setGameData(nextGameData);
	};

	return (
		<Page title={gameData.title}>
			<GameBoard
				time={10}
				level={gameData.level}
				levelName={gameData.title}
				difficultyMultiplier={1}
				levelDescription={gameData.obj.levelDescription}
				possibleAnswers={gameData.obj.possibleAnswers}
				setAnswer={setAnswer}
				reset={reset}
				key={gameData.title}
			/>
		</Page>
	);
};

export default WithAuth(Game);
