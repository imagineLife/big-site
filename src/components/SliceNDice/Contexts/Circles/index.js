import React from 'react';
import { getWordsByLength } from '../../lib/stats'
const CirclesContext = React.createContext()
const { Provider, Consumer } = CirclesContext

const CirclesProvider = (props) => {
 
 	//state
 	let [wordsByLength, setWordsByLength] = React.useState([]) 

 	//calculation && state-setter
 	const calcWordsByLength = (str) => {
 		setWordsByLength(getWordsByLength(str))
 	}
 	
	return(<Provider value={{calcWordsByLength, wordsByLength}}>
		{props.children}
	</Provider>)
}

export {
	CirclesProvider, 
	Consumer as CirclesConsumer, 
	CirclesContext
}