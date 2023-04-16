import { Request, Response } from 'express';
import prisma from '@/databases/postgresPrisma';

export async function statsController(req: Request, res: Response) {
	//send aggregate stats
	// defining types of achievements
	// list of all achievements
	const achievementsList = {
		all: [
			'Maybe the One Piece is friendship.',
			"Sheesh what a man, couldn't be me.",
			'Give up on your dreams and die.',
			'Eat 5 star, ...',
			'Weeeee',
			'Oh, okay.👍',
			'Kindness paid in kind.',
			'Illusioned to the end.',
			"You're a real treasure.",
			'Just me and my mighty shield.',
			'May the better Goblin win.',
			'I have won, but at what cost?',
			'Caught a case',
			'Nerf this player please.',
			'Forcefully retired',
			'Agony Nullified',
			'To be or not to be',
			'No chill pills for me',
			'But, but the background is a JoJo reference 🤓',
			'No rest for the wicked',
			'Hackerman',
			'Too bored to be productive; Too tired to be lazy',
			'All Star',
		],
		legendary: [
			'All Star',
			'Hackerman',
			'Too bored to be productive; Too tired to be lazy',
		],
		epic: ['Give up on your dreams and die.', 'Nerf this player please.'],
		rare: [
			'Oh, okay.👍',
			'Kindness paid in kind.',
			'Illusioned to the end.',
			'Caught a case',
			'No chill pills for me',
			'But, but the background is a JoJo reference 🤓',
			'No rest for the wicked',
		],
		uncommon: [
			'Maybe the One Piece is friendship.',
			'To be or not to be',
			'Weeeee',
			"You're a real treasure.",
			'May the better Goblin win.',
			'I have won, but at what cost?',
			'Forcefully retired',
			'Agony Nullified',
		],
		common: ["Sheesh what a man, couldn't be me.", 'Eat 5 star, ...'],
		greedy: [
			'All Star',
			'Hackerman',
			'Too bored to be productive; Too tired to be lazy',
		],
		kind: ['Give up on your dreams and die.', 'Nerf this player please.'],
		dark: ['Oh, okay.👍', 'Kindness paid in kind.', 'Illusioned to the end.'],
		neutral: [
			"You're a real treasure.",
			'May the better Goblin win.',
			'I have won, but at what cost?',
		],
		light: [
			'Caught a case',
			'No chill pills for me',
			'But, but the background is a JoJo reference 🤓',
		],
		chaotic: ['No rest for the wicked', 'To be or not to be', 'Weeeee'],
	};
	try {
		// using transaction to ensure data consistency
		const [
			all,
			legendary,
			epic,
			rare,
			uncommon,
			common,
			greedy,
			kind,
			dark,
			neutral,
			light,
			chaotic,
		] = await prisma.$transaction([
			prisma.user.count(),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.legendary } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.epic } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.rare } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.uncommon } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.common } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.greedy } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.kind } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.dark } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.neutral } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.light } },
			}),
			prisma.user.count({
				where: { achievements: { hasSome: achievementsList.chaotic } },
			}),
		]);
		return res.status(200).json({
			data: [
				{
					name: 'All',
					value: all,
				},
				{
					name: 'Legendary',
					value: legendary,
				},
				{
					name: 'Epic',
					value: epic,
				},
				{
					name: 'Rare',
					value: rare,
				},
				{
					name: 'Uncommon',
					value: uncommon,
				},
				{
					name: 'Common',
					value: common,
				},
				{
					name: 'Greedy',
					value: greedy,
				},
				{
					name: 'Kind',
					value: kind,
				},
				{
					name: 'Dark',

					value: dark,
				},
				{
					name: 'Neutral',
					value: neutral,
				},
				{
					name: 'Light',
					value: light,
				},
				{
					name: 'Chaotic',
					value: chaotic,
				},
			],
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export async function getMatchingUsers(req: Request, res: Response) {
	const { username } = req.body;
	console.log(req.body);
	if (typeof username !== 'string')
		return res.status(400).json({ message: 'Invalid username' });
	try {
		const users = await prisma.user.findMany({
			where: {
				username: {
					contains: username,
					mode: 'insensitive',
				},
			},
		});
		return res.status(200).json({ data: users });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export default {
	statsHandler: statsController,
	matchingUsersHandler: getMatchingUsers,
};
