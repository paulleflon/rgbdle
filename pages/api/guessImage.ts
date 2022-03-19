import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas } from 'canvas';

// This returns a visual representation of a user's guesses for a game.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { guesses: _guesses } = req.query;
		const guesses = JSON.parse(_guesses as string);
		const canvas = createCanvas(1000, 50 * guesses.length);
		const ctx = canvas.getContext('2d');
		for (const i in guesses) {
			const guess = guesses[i];
			ctx.fillStyle = `rgb(${guess[0]}, ${guess[1]}, ${guess[2]})`;
			ctx.fillRect(0, parseInt(i) * 50, canvas.width, 50);
		}
		res.setHeader('Content-Type', 'image/png');
		res.send(canvas.toBuffer());
	} catch (err) {
		console.error(err);
		res.redirect('https://i.imgur.com/h7tsUlO.png');
	}
};
export default handler;
