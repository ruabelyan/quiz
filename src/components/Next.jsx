import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { gameEnded, nextQuestion } from '../features/questions/questionsSlice'

export const Next = () => {
    const questions = useSelector(store => store.questions)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFinish = ()=>{
        dispatch(gameEnded())
        navigate('/results')
    }

  if(questions.index < questions.questionsRedux.length -1) return (
    <button className='btn btn-ui' onClick={()=>dispatch(nextQuestion())}>Հաջորդ</button>
  )
  
  return (
    <button className='btn btn-ui' onClick={handleFinish}>Ավարտել</button>
  )
}
