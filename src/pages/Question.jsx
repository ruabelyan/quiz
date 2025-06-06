import { useEffect } from 'react'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { Progress } from '../components/Progress'
import { Next } from '../components/Next'
import { Timer } from '../components/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { restartTimer } from '../features/timer/timerSlice'
import { getQuestions, newAnswer } from '../features/questions/questionsSlice'

export const Question = () => {
  const { gameMode } = useSelector(store => store.difficulty)
  const { status, index, currentQuestion, answer } = useSelector(store => store.questions)
  const a = useSelector(store => console.log('store', store));
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restartTimer())
    dispatch(getQuestions(gameMode))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index])

  const statement = currentQuestion?.question
  const options = currentQuestion?.options
  const hasAnswered = answer !== null

  // console.log('store', store)
  return (
    <main className='main'>
      {status === 'loading' && <Loader />}
      {status === 'error' && <ErrorMessage />}
      {status === 'ready' &&
        <>
          <Progress />
          <div className='question-cont'>
            <h4>{statement}</h4>
            <div className="options">
              {options?.map(option => {
                return <button key={option} className={`btn btn-option
                   ${answer === option ? "answer" : ""}  `}
                  disabled={hasAnswered}
                  onClick={() => dispatch(newAnswer(option))}>{option}</button>
              })}
            </div>
          </div>
          <footer>
            <Timer />
            {answer && <Next />}
          </footer>
        </>}
    </main>
  )
}
