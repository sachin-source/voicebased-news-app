import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/newsCards/NewsCards';

import useStyles from './styles';
const alanKey = '9110363dc234426516151aac077690f92e956eca572e1d8b807a3e2338fdd0dc/stage';

import wordsToNumbers from 'words-to-numbers';

function App() {
    var [newsArticles, setnewsArticles] = useState([])
    const [activeArticle, setactiveArticle] = useState(-1)
    const classes = useStyles()
    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand : ( { command, articles, number } ) => {
                if (command === 'newHeadlines') {
                    setnewsArticles(articles);
                    setactiveArticle(-1)
                } else if (command === 'highlight') {
                    setactiveArticle((previousActiveArticle) => previousActiveArticle + 1)
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy : true }) : number;
                    window.open(articles[number].url, '_blank')
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src='https://alan.app/voice/images/previews/preview.jpg' className={classes.alanLogo} alt='aln logo' />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App
