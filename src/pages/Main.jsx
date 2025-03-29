import { useEffect, useState } from 'react';
import { StartScreen } from '../components/StartScreen';
import { Header } from '../components/Header';
import { app } from '../main';
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const Main = () => {
  const db = getFirestore(app);
  const [quizzes, setQuizzes] = useState([]); // State to store quizzes
  const [loading, setLoading] = useState(true); // To show loading state

  // Function to fetch quizzes
  async function getQuizzes() {
    try {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const quizzesData = [];
      querySnapshot.forEach((doc) => {
        quizzesData.push({ id: doc.id, ...doc.data() });
      });
      setQuizzes(quizzesData); // Update state with fetched data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching quizzes: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuizzes(); // Call getQuizzes when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading quizzes...</div>; // Show loading message while data is being fetched
  }

  return (
    <main className="main">
      <Header />
      <StartScreen quizzes={quizzes} /> {/* Pass quizzes as a prop to StartScreen */}
    </main>
  );
};
