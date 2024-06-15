import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://dummyjson.com',
    // withCredentials: true 
});

// Function to start loader
const startLoader = () => {
    const loaderElement = document.getElementById('loading');
    if (loaderElement) {
      loaderElement.style.display = 'block';
    }
};
  
  // Function to stop loader
  const stopLoader = () => {
    const loaderElement = document.getElementById('loading');
    if (loaderElement) {
      loaderElement.style.display = 'none';
    }
  };

  instance.interceptors.request.use(
    (config) => {
      // need to show loader
      startLoader();
      return config;
    },
    (error) => {
      stopLoader();
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor to decrement counter and handle errors
  instance.interceptors.response.use(
    (response) => {
      // stop the loader
      stopLoader();
      return response;
    },
    (error) => {
    // navigate
      if(error.response){
        const GlobalError = error.response.data.Message;
        // alert(GlobalError);
      }
      stopLoader();
      return Promise.reject(error);
    }
  );


// set session cookie
export function setSessionCookie(){
    instance.post('/account/users/create-session')
    .then(res => {
    }).catch(err => {
      console.log(err);
    })
}


   //validate session cookie
 export function validateSessionCookie(){
    instance.get('/account/users/validate-session')
    .then(res => {
      
    }).catch(err => {
        setSessionCookie();
    })
}