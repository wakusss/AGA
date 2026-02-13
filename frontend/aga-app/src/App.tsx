import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

//  Test of api
  useEffect(() => {
    async function getPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();          // ← вот здесь читаем JSON
      console.log(data);                           // ← здесь уже массив/объект
    }

    getPosts();
  }, []);



  return (
    <>
        <p>Hello, World!</p>
    </>
  )
}

export default App
