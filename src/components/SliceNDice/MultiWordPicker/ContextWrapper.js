import React from 'react';
import WordList from './UsingContext'
import {WordListProvider} from '../../WordListContext'
const WrappedComponent = () => {
	return(
		<WordListProvider>
			<WordList />
		</WordListProvider>
	)
}

export default WrappedComponent;