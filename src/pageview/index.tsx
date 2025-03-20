import { useState } from 'react';
import axios from 'axios';

const pageview = () => {

  axios.get('http://localhost:8080/datas/visits/get_today')
    .then(response => {
      console.log(response.data);
      setCount(response.data.data.visit);
    })
    .catch(error => {
      console.error('Error fetching visit count by date:', error);
    });

  const [count, setCount] = useState(0);


  return (
    <div>
      <h2>关注伴奏网喵，关注伴奏网谢谢喵</h2>
      <p>Today Visit Count: {count}</p>
    </div>
  );
};


export default pageview;
