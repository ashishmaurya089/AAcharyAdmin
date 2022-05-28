import axios from 'axios';

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRmMzI1NGQ1OGMwMzJlM2M0ZTk5NzAiLCJwaG9uZU51bWJlciI6ODE0MjQwMDgxNCwiaWF0IjoxNjI2MzQ3NTM5fQ.Jxfzz0ER5g49AqcQd17To8mnHMnYtlv8Hai4qc-jurY';

const instance = axios.create({
	baseURL: 'https://aacharya.herokuapp.com',
	// baseURL: 'https://api.aacharya.net',
	// baseURL: "http://localhost:3339",
});

instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;
