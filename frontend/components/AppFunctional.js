import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"

export default function AppFunctional(props) {
  const [state, setState] = useState({
    coordinateX: 2,
    coordinateY: 2,
    totalMoves: 0,
    message: "",
    email: ""
  })

  // BUTTON LEFT
  const clickButtonLeft = () => {      
    setState({
      ...state,
      coordinateX: state.coordinateX - 1,
      totalMoves: state.totalMoves + 1,
      message: ""
    })  
    if(state.coordinateX - 1 < 1) {
      setState({
        ...state,
        message: "You can't go left",
      })
    }
  }

  // BUTTON RIGHT
  const clickButtonRight = () => {
    setState({
      ...state,
      coordinateX: state.coordinateX + 1,
      totalMoves: state.totalMoves + 1,
      message: ""
    })  
    if(state.coordinateX + 1 > 3) {
      setState({
        ...state,
        message: "You can't go right",
      })
    }
  }

  // BUTTON UP
  const clickButtonUp = () => {
    setState({
      ...state,
      coordinateY: state.coordinateY - 1,
      totalMoves: state.totalMoves + 1,
      message: ""
    })
    if(state.coordinateY - 1 < 1) {
      setState({
        ...state,
        message: "You can't go up",
      })
    }
  }

  // BUTTON DOWN
  const clickButtonDown = () => {
    setState({
      ...state,
      coordinateY: state.coordinateY + 1,
      totalMoves: state.totalMoves + 1,
      message: ""
    })
    if(state.coordinateY + 1 > 3) {
      setState({
        ...state,
        message: "You can't go down",
      })
    }
  }

  // RESET BUTTON
  const resetButton = () => {
    setState({
      ...state,
      coordinateX: 2,
      coordinateY: 2,
      totalMoves: 0,
      message: "",
      email: ""
    })
  }

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const {value} = e.target
    setState({
      ...state,
      email: value,
    })  
  }

  // SUBMIT FORM AND POST REQUEST
  const handleSubmit = (e) => {
    if(state.email === "") {
      setState({
        ...state,
        message: "Ouch: email is required"
      })  
    } else if (!state.email.match("@")) {
      console.log("no match");     
    }
    e.preventDefault()
    const sendInfo = {
      "x": state.coordinateX,
      "y": state.coordinateY,
      "steps": state.totalMoves,
      "email": state.email
    }
    axios.post("http://localhost:9000/api/result", sendInfo)
    .then((response) => {
      console.log(response);     
      setState({
        ...state,
        message: response.data.message,
        email: ""
      })
    })
    .catch((error) => {     
      setState({
        ...state,
        message: error.response.data.message
      })
    })   
  }

    const { className } = props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${state.coordinateX}, ${state.coordinateY})`}</h3>
          <h3 id="steps">{state.totalMoves === 1 ? `You moved ${state.totalMoves} time` : `You moved ${state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          <div className={`${state.coordinateX === 1 && state.coordinateY === 1 ? "square active": "square"}`}>{state.coordinateX === 1 && state.coordinateY === 1 ? "B": ""}</div>
          <div className={`${state.coordinateX === 2 && state.coordinateY === 1 ? "square active": "square"}`}>{state.coordinateX === 2 && state.coordinateY === 1 ? "B": ""}</div>
          <div className={`${state.coordinateX === 3 && state.coordinateY === 1 ? "square active": "square"}`}>{state.coordinateX === 3 && state.coordinateY === 1 ? "B": ""}</div>
          <div className={`${state.coordinateX === 1 && state.coordinateY === 2 ? "square active": "square"}`}>{state.coordinateX === 1 && state.coordinateY === 2 ? "B": ""}</div>
          <div className={`${state.coordinateX === 2 && state.coordinateY === 2 ? "square active": "square"}`}>{state.coordinateX === 2 && state.coordinateY === 2 ? "B": ""}</div>
          <div className={`${state.coordinateX === 3 && state.coordinateY === 2 ? "square active": "square"}`}>{state.coordinateX === 3 && state.coordinateY === 2 ? "B": ""}</div>
          <div className={`${state.coordinateX === 1 && state.coordinateY === 3 ? "square active": "square"}`}>{state.coordinateX === 1 && state.coordinateY === 3 ? "B": ""}</div>
          <div className={`${state.coordinateX === 2 && state.coordinateY === 3 ? "square active": "square"}`}>{state.coordinateX === 2 && state.coordinateY === 3 ? "B": ""}</div>
          <div className={`${state.coordinateX === 3 && state.coordinateY === 3 ? "square active": "square"}`}>{state.coordinateX === 3 && state.coordinateY === 3 ? "B": ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={clickButtonLeft}>LEFT</button>
          <button id="up"onClick={clickButtonUp}>UP</button>
          <button id="right" onClick={clickButtonRight}>RIGHT</button>
          <button id="down" onClick={clickButtonDown}>DOWN</button>
          <button id="reset" onClick={resetButton}>reset</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            name="email"
            value={state.email}
            onChange={handleChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }

