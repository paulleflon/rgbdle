import { useEffect, useRef, useState } from 'react';
import { IoMdCheckmark, IoMdShare } from 'react-icons/io';
import ResultsContainerProps from '../../interfaces/Results/ResultsContainerProps';
import ColorDisplayer from '../Game/ColorDisplayer';
import Popup from '../Common/Popup';
import Diagram from './Diagram';
import GuessGradient from './GuessGradient';
import Statistics from './Statistics';
import PopupProps from '../../interfaces/Common/PopupProps';

/**
 * Calculates and formats the time to wait until the next game.
 */
const calculateTimeLeft = () => {
	const now = new Date();
	const next = new Date();
	next.setDate(next.getDate() + 1);
	next.setHours(0);
	next.setMinutes(0);
	next.setSeconds(0);
	next.setMilliseconds(0);
	const diff = next.getTime() - now.getTime();
	let hours: string = '' + Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes: string = '' + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds: string = '' + Math.floor((diff % (1000 * 60)) / 1000);
	hours = hours.length === 1 ? '0' + hours : hours;
	minutes = minutes.length === 1 ? '0' + minutes : minutes;
	seconds = seconds.length === 1 ? '0' + seconds : seconds;
	return `${hours}:${minutes}:${seconds}`;
};

/**
 * Pop-up displaying the results of the last played game, and the player's global stats. 
 */
const ResultsContainer = ({ attempts, close, displayed }: ResultsContainerProps) => {
	return (
		<Popup
			close={close}
			displayed={displayed}
		>
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Statistics</div>
			<Statistics attempts={attempts} />
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Guess Distribution</div>
			{
				attempts.length
					?
					<div className='flex justify-center my-2'>
						<Diagram
							attempts={attempts}
						/>
					</div>
					:
					<div className='text-center'>
						No data.
					</div>
			}
		</Popup>
	);
}
export default ResultsContainer;
