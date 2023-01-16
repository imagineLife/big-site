/*

    TextDisplay = () => {
        
        // { srcText } = useTextStore()
        { longestWord, theme, commonWord } = useStoreContext()
        
        const setLongestWord = txtParam => {
            return txtParam.applyLongestWordRegexHere...()
        }

        NOTE: 
            helper function will prob be in a separate file

        let alteredText = srcText
        alteredText = longestWord && setLongestWord(alteredText)
        alteredText = theme && setTheme(alteredText)
        alteredText = commonWord && setCommonWord(alteredText)

        return alteredText

    }

    resText = txt; 
    selectedWord && getQueriedWord


    Use Context
    Parent Context
        textBlob

    longestWordCtx
        longWordVal setter

    themeCtx
        theme, setTheme

    <TextDisplay>
        let { txtCtn} = useContext(thisContext)
        let { lwCtx } = useContext(LongestWordCtx)
        let { cwCtx } = useContext(thisContext)
        show fancy text here
    </TextDisplay>

    <LongestWordProvider>
        <LongestWord />
    </LongestWordProvider>        
*
