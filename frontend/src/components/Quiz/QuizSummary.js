import { useState, useEffect } from 'react';

const QuizSummary = (props) => {

    const selectedCards = props.selectedCards;
    const quizType = props.typeQuiz;
    const [summaryNumbers, setSummaryNumbers] = useState([0,0,0,0,0]);

    const calculate = () => {
        var tempResult = [];
        tempResult[0] = selectedCards.length;
        tempResult[1] = selectedCards.filter(x => x.favourite === true).length;
        tempResult[2] = selectedCards.filter(x => x.known === 1).length;
        tempResult[3] = selectedCards.filter(x => x.known === 2).length;
        tempResult[4] = selectedCards.filter(x => x.known === 3).length;

        setSummaryNumbers(tempResult);
        console.log(tempResult);
    }

    useEffect(() => {
        if (quizType ===1)
        calculate();
    },[])

    return ( 
        <div className="quiz-summary">
            <h3>You ended selected deck</h3>
            { (quizType === 1) && (
                <div>
                    <p>Total cards number: { summaryNumbers[0] }</p>
                    <p>Well known cards number: { summaryNumbers[2] }</p>
                    <p>Medium known cards number: { summaryNumbers[3] }</p>
                    <p>Dont known cards number: { summaryNumbers[4] }</p>
            
                </div>
            )}
        </div>
     );
}
 
export default QuizSummary;