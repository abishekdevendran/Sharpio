import Router from 'next/router';
import React, { ComponentPropsWithoutRef, useMemo } from 'react';
import Countdown from 'react-countdown';

interface IGameBoardProps extends ComponentPropsWithoutRef<'div'> {
	time: number;
	level: number;
	levelName: string;
	levelDescription: string;
	className?: string;
	possibleAnswers: string[];
	difficultyMultiplier: number;
	setAnswer: (answer: string) => void;
	reset: () => void;
}

const GameBoard = ({
	time,
	level,
	levelName,
	levelDescription,
	className,
	possibleAnswers,
	difficultyMultiplier,
	setAnswer,
	reset,
	...props
}: IGameBoardProps) => {
	const [selectedAnswer, setSelectedAnswer] = React.useState<string>('');
	const [interactable, setinteractable] = React.useState<boolean>(false);
	const [hasEnded, setHasEnded] = React.useState<boolean>(false);
	const countdownRef = React.useRef<any>(null);
	const calcTime = useMemo(
		() => Date.now() + time * 1000 * difficultyMultiplier,
		[time, difficultyMultiplier, level]
	);
	function selectRandomAnswer() {
		if (!possibleAnswers) return;
		const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
		setSelectedAnswer(possibleAnswers[randomIndex]);
	}
	if (!possibleAnswers && !hasEnded) {
		setHasEnded(true);
		setinteractable(true);
	}
	return (
		<div
			{...props}
			className={`card glassy flex items-center justify-center select-none w-5/6 p-12 relative ${
				className ? className : ''
			}`}
		>
			<div
				className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl md:text-9xl ${
					interactable ? 'hidden' : ''
				}`}
			>
				Ready?
			</div>
			<div
				className={`gameContent w-full flex flex-col items-center justify-center text-center  ${
					!interactable ? 'blur-lg' : ''
				} ${!interactable ? 'pointer-events-none' : ''}`}
			>
				<div className="level">
					<p className="text-xl">Level: {level}</p>
				</div>
				<h1 className="font-bold text-4xl">{levelName}</h1>
				<div className="desc mt-12">
					<p className="text-xl">{levelDescription}</p>
				</div>
				<div className="timer mt-12">
					<p className="text-xl">
						{!hasEnded && (
							<Countdown
								date={calcTime}
								autoStart={false}
								onComplete={() => {
									setinteractable(false);
									countdownRef.current.stop();
									setAnswer(selectedAnswer);
								}}
								ref={countdownRef}
								precision={2}
								intervalDelay={0}
								key={Router.asPath}
								renderer={({ seconds, milliseconds, completed }) => {
									if (completed) {
										return <span>Time&apos;s up!</span>;
									} else {
										return (
											<span>
												{seconds}:{milliseconds.toString().slice(0, 2)}
											</span>
										);
									}
								}}
							/>
						)}
					</p>
				</div>
				<form>
					<div className="answers mt-12 text-left">
						{!possibleAnswers && <p>The end</p>}
						{possibleAnswers?.map((answer, index) => (
							<div className="answer my-1" key={index}>
								<label
									htmlFor={`answer${index}`}
									className="label cursor-pointer"
								>
									<input
										type="radio"
										name="answer"
										id={`answer${index}`}
										value={answer}
										className="radio checked:bg-primary checked:border-primary mr-2"
										checked={selectedAnswer === answer}
										onChange={(e) => {
											setSelectedAnswer(e.target.value);
										}}
									/>
									<span className="label-text w-full">{answer}</span>
								</label>
							</div>
						))}
					</div>
				</form>
			</div>
			<div>
				{!interactable && !hasEnded && (
					<button
						className="btn btn-primary"
						onClick={(e) => {
							e.preventDefault();
							setinteractable(true);
							selectRandomAnswer();
							countdownRef.current.start();
						}}
					>
						Start
					</button>
				)}
				{interactable && !hasEnded && (
					<button
						className="btn btn-primary disabled:btn-disabled"
						onClick={(e) => {
							e.preventDefault();
							setinteractable(false);
							countdownRef.current.stop();
							setAnswer(selectedAnswer);
						}}
						disabled={!selectedAnswer}
					>
						Submit
					</button>
				)}
				{hasEnded && (
					<button
						className="btn btn-primary"
						onClick={(e) => {
							e.preventDefault();
							setinteractable(false);
							setHasEnded(false);
							reset();
						}}
					>
						Reset
					</button>
				)}
			</div>
		</div>
	);
};

export default GameBoard;
