// Constants.js
const prod = {
  url: {
    API_URL: 'https://git.heroku.com/rixong-shopping-api/api/v1'
  }
};
const dev = {
  url: {
    API_URL: 'http://localhost:3000/api/v1'
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;