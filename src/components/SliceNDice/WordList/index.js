import React from 'react';
import './index.css'

const WordList = ({words, selectWord, selectedWord}) => {

	return(<ul>
		{words && words.map((w,i) => (
			<li 
				key={`${w}$i`} 
				style={{
					textDecoration: (selectedWord === w) ? 'underline' : 'none',
					listStyleType: 'none',
					cursor: 'pointer'
				}}
				className={'word'}
				onClick={() => selectWord(w)}>
				{w}
			</li>
		))}
		{!words && <li>Empty Word List Here</li>}
	</ul>)
}

export default WordList