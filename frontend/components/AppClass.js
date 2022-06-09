import React from 'react'
import axios from "axios"
export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = {
      coordinateX: 2,
      coordinateY: 2,
      totalMoves: 0,
      message: "",
      email: ""
    }    
  }

  // BUTTON LEFT
  clickButtonLeft = () => {      
    this.setState({
      ...this.state,
      coordinateX: this.state.coordinateX - 1,
      totalMoves: this.state.totalMoves + 1,
      message: ""
    })  
    if(this.state.coordinateX - 1 < 1) {
      this.setState({
        ...this.state,
        message: "You can't go left",
      })
    }
  }

  // BUTTON RIGHT
  clickButtonRight = () => {
    this.setState({
      ...this.state,
      coordinateX: this.state.coordinateX + 1,
      totalMoves: this.state.totalMoves + 1,
      message: ""
    })  
    if(this.state.coordinateX + 1 > 3) {
      this.setState({
        ...this.state,
        message: "You can't go right",
      })
    }
  }

  // BUTTON UP
  clickButtonUp = () => {
    this.setState({
      ...this.state,
      coordinateY: this.state.coordinateY - 1,
      totalMoves: this.state.totalMoves + 1,
      message: ""
    })
    if(this.state.coordinateY - 1 < 1) {
      this.setState({
        ...this.state,
        message: "You can't go up",
      })
    }
  }

  // BUTTON DOWN
  clickButtonDown = () => {
    this.setState({
      ...this.state,
      coordinateY: this.state.coordinateY + 1,
      totalMoves: this.state.totalMoves + 1,
      message: ""
    })
    if(this.state.coordinateY + 1 > 3) {
      this.setState({
        ...this.state,
        message: "You can't go down",
      })
    }
  }

  // RESET BUTTON
  resetButton = () => {
    this.setState({
      ...this.state,
      coordinateX: 2,
      coordinateY: 2,
      totalMoves: 0,
      message: "",
      email: ""
    })
  }

  // HANDLE INPUT CHANGE
  handleChange = (e) => {
    const {value} = e.target
    this.setState({
      ...this.state,
      email: value,
    })  
  }

  // SUBMIT FORM AND POST REQUEST
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.email === "") {
      this.setState({
        ...this.state,
        message: "Ouch: email is required"
      })     
    }    
    const sendInfo = {
      "x": this.state.coordinateX,
      "y": this.state.coordinateY,
      "steps": this.state.totalMoves,
      "email": this.state.email
    }
    axios.post("http://localhost:9000/api/result", sendInfo)
    .then((response) => {
      console.log(response);     
      this.setState({
        ...this.state,
        message: response.data.message,
        email: ""
      })
    })
    .catch((error) => {
      this.setState({
        ...this.state,
        message: error.response.data.message
      })    
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.coordinateX}, ${this.state.coordinateY})`}</h3>
          <h3 id="steps">{this.state.totalMoves === 1 ? `You moved ${this.state.totalMoves} time` : `You moved ${this.state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          <div className={`${this.state.coordinateX === 1 && this.state.coordinateY === 1 ? "square active": "square"}`}>{this.state.coordinateX === 1 && this.state.coordinateY === 1 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 2 && this.state.coordinateY === 1 ? "square active": "square"}`}>{this.state.coordinateX === 2 && this.state.coordinateY === 1 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 3 && this.state.coordinateY === 1 ? "square active": "square"}`}>{this.state.coordinateX === 3 && this.state.coordinateY === 1 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 1 && this.state.coordinateY === 2 ? "square active": "square"}`}>{this.state.coordinateX === 1 && this.state.coordinateY === 2 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 2 && this.state.coordinateY === 2 ? "square active": "square"}`}>{this.state.coordinateX === 2 && this.state.coordinateY === 2 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 3 && this.state.coordinateY === 2 ? "square active": "square"}`}>{this.state.coordinateX === 3 && this.state.coordinateY === 2 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 1 && this.state.coordinateY === 3 ? "square active": "square"}`}>{this.state.coordinateX === 1 && this.state.coordinateY === 3 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 2 && this.state.coordinateY === 3 ? "square active": "square"}`}>{this.state.coordinateX === 2 && this.state.coordinateY === 3 ? "B": ""}</div>
          <div className={`${this.state.coordinateX === 3 && this.state.coordinateY === 3 ? "square active": "square"}`}>{this.state.coordinateX === 3 && this.state.coordinateY === 3 ? "B": ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.clickButtonLeft}>LEFT</button>
          <button id="up"onClick={this.clickButtonUp}>UP</button>
          <button id="right" onClick={this.clickButtonRight}>RIGHT</button>
          <button id="down" onClick={this.clickButtonDown}>DOWN</button>
          <button id="reset" onClick={this.resetButton}>reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
