import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../../mock.json'

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const initialState = {
    questionsRedux: [],
    status: 'ready', // 'loading', 'error', 'ready'
    index: 0,
    currentQuestion: {},
    answer: null,
    points: 0,
    highscore: 0
}

export const getQuestions = createAsyncThunk('questions/getQuestions', async (difficulty) => {
    try {
        return data
    } catch (err) {
        console.log(err);
        throw err
    }
})

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        newAnswer: (state, { payload }) => {
            state.answer = payload
            if (payload === state.currentQuestion.correctAnswer) {
                state.points += 20
            }
        },
        nextQuestion: (state) => {
            const nextIndex = state.index + 1
            if (nextIndex < state.questionsRedux.length) {
                const temp = state.questionsRedux[nextIndex]
                const newArray = {
                    id: temp.id,
                    correctAnswer: temp.correctAnswer,
                    question: temp.question.text ?? temp.question,
                    options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer])
                }
                state.index = nextIndex
                state.currentQuestion = newArray
                state.answer = null
            } else {
                // No more questions — optionally handle end of game here
                state.status = 'finished'
            }
        },
        gameEnded: (state) => {
            state.highscore = Math.max(state.points, state.highscore)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getQuestions.fulfilled, (state, { payload }) => {
                const first = payload[0]
                const newArray = {
                    id: first.id,
                    correctAnswer: first.correctAnswer,
                    question: first.question.text ?? first.question,
                    options: shuffleArray([...first.incorrectAnswers, first.correctAnswer])
                }
                state.status = 'ready'
                state.questionsRedux = payload
                state.currentQuestion = newArray
                state.index = 0
                state.points = 0
                state.answer = null
            })
            .addCase(getQuestions.rejected, (state) => {
                state.status = 'error'
            })
    }
})

export const { newAnswer, nextQuestion, gameEnded } = questionsSlice.actions
export default questionsSlice.reducer
