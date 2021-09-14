import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
const initialState = {
    detail: []
}
export const getAllDetail = createAsyncThunk('tableDetails/getAll', async (_, { rejectWithValue }) => {
    let response = await fetch('/api/v1/data/')
    if (response.ok) {
        const details = await response.json()
        return { details: details.data }
    } else {
        response = await response.json()
        return rejectWithValue({ error: response.message })
    }
})
export const addDetails = createAsyncThunk('tableDetails/addDetail', async (payload, thunkApi) => {
    let response = await fetch('/api/v1/data/', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data'
        },
        body: payload.formData
    })
    if (response.ok) {
        const details = await response.json()
        return { details: details.data }
    } else {
        response = await response.json()
        return thunkApi.rejectWithValue({ error: response.message })
    }
})
export const deleteDetails = createAsyncThunk('tableDetails/deleteDetails', async (payload) => {
    let response = await fetch(`/api/v1/data/${payload.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        response = await response.json();
        return { detail: response.data }
    }
})
const dataSlice = createSlice({
    name: 'Data',
    initialState,
    extraReducers: {
        [getAllDetail.rejected]: (state, action) => {
            console.log(action)
            return state
        },
        [getAllDetail.fulfilled]: (state, action) => {
            return Object.assign({}, state, {
                detail: [...action.payload.details]
            })
        },
        [addDetails.fulfilled]: (state, action) => {
            return Object.assign({}, state, {
                detail: [...state.detail, action.payload.details]
            })
        },
        [deleteDetails.fulfilled]: (state, action) => {
            const newDetails = state.detail.filter((obj) => { return obj.id !== parseInt(action.payload.detail.id,10) })
            return Object.assign({}, state, {
                detail: [...newDetails]
            })
        }
    }
})
export default dataSlice.reducer;