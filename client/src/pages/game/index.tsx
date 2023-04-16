import React, { useContext, useState } from 'react';
import Page from '@/components/Page';
import WithAuth from '@/components/WithAuth';
import GameBoard from '@/components/GameBoard';
import gamePlay from '@/data/gamePlay.json';
import { toast } from 'react-hot-toast';
import UserContext from '@/contexts/UserContext';

const achCount = JSON.stringify(gamePlay).split('achievement').length - 1;

const Game = () => {
	const { user, mutate } = useContext(UserContext);
	const [gameData, setGameData] = useState<any>({
		title: 'Start',
		level: 1,
		obj: gamePlay.Start,
		idx: 0,
	});
	const reset = () => {
		setGameData({
			title: 'Start',
			level: 1,
			obj: gamePlay.Start,
			idx: 0,
		});
	};
	async function handleAchievement(achievement: string) {
		try {
			const result = await postAchievement(achievement);
			if (result.message === 'Achievement added') {
				toast.success(`Achievement Unlocked: ${achievement}`, {
					icon: '🎉',
					duration: 10000,
				});
				//update local user
				await mutate();
			}
		} catch (e) {
			console.log(e);
		}
	}
	async function giveLazyAchievement() {
		if (user?.achievements.length === achCount - 4) {
			handleAchievement('All Star');
		}
		handleAchievement('Too bored to be productive; Too tired to be lazy');
	}
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
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
	const setAnswer = async (answer: string) => {
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
			nextGameData['idx'] = randomIdx;
		} else {
			//if it is not, then we can just use it
			nextGameData['obj'] = gameData.obj[idx];
			nextGameData['idx'] = 0;
		}
		//check if any achievements are present
		if ('achievement' in nextGameData['obj']) {
			if (user?.achievements.length === achCount - 1) {
				handleAchievement('All Star');
			}
			handleAchievement(nextGameData['obj']['achievement']);
		}
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
				idx={gameData.idx}
				lazyAchievement={giveLazyAchievement}
			/>
		</Page>
	);
};

export default WithAuth(Game);
