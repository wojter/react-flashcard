import { useState, useEffect } from 'react';
import axios from '../../axios';
import { LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const QuizSummary = (props) => {

    const selectedCards = props.selectedCards;
    const quizType = props.typeQuiz;
    const [summaryNumbers, setSummaryNumbers] = useState([0,0,0,0,0]);
    const [stats, setStats] = useState([]);

    const calculate = () => {
        var tempResult = [];
        tempResult[0] = selectedCards.length;
        tempResult[1] = selectedCards.filter(x => x.favourite === true).length;
        tempResult[2] = selectedCards.filter(x => x.known === 1).length;
        tempResult[3] = selectedCards.filter(x => x.known === 2).length;
        tempResult[4] = selectedCards.filter(x => x.known === 3).length;

        setSummaryNumbers(tempResult);
        console.log(tempResult);
        let data = {category: selectedCards[0].category,
                        wellKnown: tempResult[2],
                        midKnown: tempResult[3],
                    badKnown: tempResult[4]
                };
                console.log(data)
        saveStats(data)
        getStats();
    }

    const getStats = () => {
        let _id = selectedCards[0].category;
        axios.get('/stats/' + _id)
        .then((response)=>{
            // console.log(response);
            const resp = response.data;
            // add data to our function state
            setStats(resp);
            console.log(resp);
        })
        .catch(error=> console.error('Error: ', error))
        console.log(stats);
    }

    const saveStats = (data) => {
        axios.post('/stats/', data )
        .then((response)=>{
            console.log(response);

        })
        .catch(error=> console.error('Error: ', error))
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
            
                <ResponsiveContainer width="95%" height={250}>
                <LineChart data={stats}>
                    <Line name="Well Known" type="monotone" dataKey="wellKnown" stroke="#026b1a" />
                    <Line name="Mid Known" type="monotone" dataKey="midKnown" stroke="#8884b8" />
                    <Line name="Bad Known" type="monotone" dataKey="badKnown" stroke="#6b0202" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis />
                    <YAxis />
                    <Legend
                        varticalAlighn="bottom"
                        height={36}
                        align="center" />
                </LineChart>
                </ResponsiveContainer>
                </div>
            )}
        </div>
     );
}
 
export default QuizSummary;