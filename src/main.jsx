import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store';
import { Provider } from 'react-redux';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCAYNofI80B-N4LbaP3eVP7ohCGCIvmGjU",
  authDomain: "quiz-game-6f080.firebaseapp.com",
  projectId: "quiz-game-6f080",
  storageBucket: "quiz-game-6f080.firebasestorage.app",
  messagingSenderId: "333406122856",
  appId: "1:333406122856:web:afa9e86d0d5eb6ce7e1cdd",
  measurementId: "G-X041XZ6949"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
    <App />
  </Provider>
)

