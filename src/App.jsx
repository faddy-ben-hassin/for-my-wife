import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
const girlName = "xxxx"
function App() {
    // GET ELEMENT POSITION 
  const Ref = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleResize() {
      if (Ref.current) {
        const rect = Ref.current.getBoundingClientRect();
        setCoordinates({
          x: rect.x,
          y: rect.y
        });
      }
    }
    handleResize()

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GET WINDOW DIMENSIONS 
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize  ()  {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const max = {x:windowDimensions.width - coordinates.x, y: windowDimensions.height - coordinates.y}
  const min = {x:-coordinates.x,y:-coordinates.y}



  const [state, setState] = useState("♡‿♡")
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleClick (e) {
    if (e.target.innerHTML === 'YES') {
      setState("♡‿♡")
      setPosition({ x: 0, y: 0 });
    }else{
      setState("╥﹏╥")
      setPosition({ x: Math.random() * (max.x - min.x) + min.x, y: Math.random() * (max.y - min.y) + min.y});
    }
  };

  return (
    <div className="App">
      <h1 className="emotion">{state}</h1>
      <p className="prompt">{girlName} WILL YOU MARRY ME???</p>
      <div className="btnContainer">
        <button onClick={handleClick} id='yes'>YES</button>
        <motion.button ref={Ref} onClick={handleClick} animate={{x: position.x, y: position.y}} transition={{ duration: 0.3,  type: "spring"}} id='no'>NO</motion.button>
      </div>
    </div>
  )
}

export default App
