import axios from 'axios'
import app from '../main'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(function(config) {
  const access_token = localStorage.getItem('access-token');
  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  
  if ( uid != null ) {
    config.headers.access_token = access_token;
    config.headers.uid = uid;
    config.headers.client = client;
  }

  return config;
},function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    if (error.response.status === 401) {
      app.$store.dispatch('signOut')
      app.$router.push('/user/login')
    }
  }
)
