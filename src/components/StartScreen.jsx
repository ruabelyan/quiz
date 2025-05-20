import { useNavigate } from 'react-router-dom'
import { SocialMedia } from './SocialMedia'
import { selectGameMode } from '../features/difficulty/difficultySlice'
import { useDispatch } from 'react-redux'

export const StartScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (e) => {
    const gameMode = e.target.value;

    if (gameMode === "easy") {
      // Show prompt for email input
      const email = prompt("Մուտքագրեք ձեր Էլ հասցեն");
      const password = prompt("Մուտքագրեք ձեր Էլ Գաղտնաբառը");
      if (email === 'armen.andreasyan@gmail.com' && password === 'Aaaa1111') {
        // If email is entered, continue to the quiz
        dispatch(selectGameMode(gameMode));
        navigate(`/quiz`);
      } else {
        alert('Ձեր մուտքագրած տվյալները սխալ են, դուք կարղ եք քվեարկել ԱՆԱՆՈՒՆ')
      }
    } else {
      // Directly start quiz for anonymous users
      dispatch(selectGameMode(gameMode));
      navigate(`/quiz`);
    }
  };
  return (
    <div className='start-screen'>
      <h3>Մասնակցել քվեարկությանը</h3>
      {/* <h4 style={{ marginTop: "20px" }}>Ընտրեք քվեարկության տեսակը:</h4> */}
      <div className="game-mode">
        <button className='btn2' value='easy' onClick={(e) => handleClick(e)} style={{ backgroundColor: "#0ee32a" }}>Սկսել</button>
        {/* <button className='btn2' value='hard' onClick={(e)=>handleClick(e)} style={{backgroundColor:"#fc2121"}}>Անանուն</button> */}
      </div>
      <SocialMedia />
    </div>
  )
}
