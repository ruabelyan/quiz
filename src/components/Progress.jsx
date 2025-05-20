import { useSelector } from 'react-redux'

export const Progress = () => {
  const questions = useSelector(store => store.questions)
  return (
    <header className='progress'>
      <progress max={questions.questionsRedux.length?.toString()} value={questions.index + Number(questions.answer !== null)} />
      <p>Հարց <strong>{questions.index + 1}</strong> / {questions.questionsRedux.length}</p>
      {/* <p><strong>{questions.points}</strong> / {questions.questionsRedux.length * 20}</p> */}
    </header>
  )
}
