import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {


  const canvasReference=useRef(null);
  const contextReference=useRef(null);

  const [isPressed,setisPressed]=useState(false);

  const beingDraw = (e) => {
    contextReference.current.beginPath();
    contextReference.current.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);

    setisPressed(true);
  };
  const updateDraw = (e) => {
    if(!isPressed)return;

    contextReference.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    contextReference.current.stroke();
  };
  const endDraw = () => {
    contextReference.current.closePath();
    setisPressed(false);
    console.log('false')
  };

useEffect(()=>{
  const canvas=canvasReference.current;
  canvas.width=400;
  canvas.height=400;
  const context=canvas.getContext('2d');
  // context.lineCap='rounded';
  context.strokeStyle='red'
  context.lineWidth=9;
  contextReference.current=context;

},[])

const clearCanvas=()=>{
  const canvas=canvasReference.current;
  const context=canvas.getContext('2d');
  context.fillstyle='white';
  context.fillRect(0,0,canvas.width,canvas.height);
}

  return (
    <div className="app">
      <canvas
      ref={canvasReference}
        onMouseDown={beingDraw}
        onMouseMove={updateDraw}
        onMouseUp={endDraw}
      />
      <button onClick={clearCanvas} >clear</button>
    </div>
  );
}

export default App;
