// All action creator code will go in here to be refactored later

import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  // We can assume our backend will return the updated User model
  dispatch({ type: FETCH_USER, payload: res.data });
};
