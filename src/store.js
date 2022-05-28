import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { subjectReducer } from './reducers/subjectReducer';
import { userReducer } from './reducers/userReducer';
import { eventReducer } from './reducers/eventReducer';
import { workshopReducer } from './reducers/workshopReducer';
import { skillsReducer } from './reducers/skillsReducer';
import { levelFilterReducer } from './reducers/levelFilterReducer';
import { commonReducer } from './reducers/commonReducer';

const reducer = combineReducers({
	tuitionSegments: subjectReducer,
	usersData: userReducer,
	eventSegments: eventReducer,
	workshop: workshopReducer,
	skills: skillsReducer,
	filterlevels: levelFilterReducer,
	commonData: commonReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
