import type { NextApiRequest, NextApiResponse } from 'next';
import HookData from '../../interfaces/HookData';


// This sends the results of a game to a Discord Webhook.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { correct, guesses, day, name } = req.body as HookData;
		let guessString = '';
		for (const row of guesses) {
			guessString += '\n';
			for (const j in row) {
				const c = row[j];
				guessString += c === correct[j] ? '🟩' : c < correct[j] ? '🟪' : '🟧';
			}
			guessString += ` ${row[0]}, ${row[1]}, ${row[2]}`;
		}
		const body = `
		**Color:** ${name}
		**Guesses:**${guessString}
		**Solution:** ${correct[0]}, ${correct[1]}, ${correct[2]}
	`;
		const lastGuess = guesses[guesses.length - 1];
		const didGuess = lastGuess[0] === correct[0] && lastGuess[1] === correct[1] && lastGuess[2] === correct[2];
		const hex = `${lastGuess[0].toString(16)}${lastGuess[1].toString(16)}${lastGuess[2].toString(16)}`;
		const embed = {
			title: 'New game submitted!',
			description: body,
			color: 0x2f3136,
			thumbnail: {
				url: day === -25 ? `https://singlecolorimage.com/get/${hex}/512x512` : 'https://rgbdle.hicka.world/android-chrome-512x512.png'
			},
			footer: {
				text: `RGBdle ${day === -25 ? 'Mania' : day} ${didGuess ? guesses.length : 'X'}/10`
			},
			timestamp: new Date().toISOString()
		}
		await fetch(process.env.DISCORD_HOOK_URL!, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				embeds: [embed]
			})
		});
		res.status(200).end();
	} catch (e: any) {
		console.error(e);
		res.status(500).send(e.message || 'Something unknown went wrong.');
	}
};
export default handler;
