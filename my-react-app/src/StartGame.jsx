import React from 'react';

class StartGame extends React.Component{
    constructor(props){
      super(props);
  
      this.state={
        player:JSON.parse(localStorage.getItem("Players"))[0],
        players:this.props.players
      }
  
      this.Plus_1=this.Plus_1.bind(this);
      this.Minus_1=this.Minus_1.bind(this);
      this.twice=this.twice.bind(this);
      this.divide_by_2=this.divide_by_2.bind(this);
      this.change_player=this.change_player.bind(this);
      // this.randerNumber=this.randerNumber.bind(this);
  
    }
  
    change_player(event){
      const PlayersList=this.props.players;
      let idx =PlayersList.findIndex(player => player.name=== this.state.player.name);;
      if(PlayersList[idx+1]){
        this.setState({ player: PlayersList[idx+1] });
        console.log('ci bon');
      }
      else{
        this.setState({ player: PlayersList[0] });
      }
    }
  
    Plus_1(event){
      this.change_player();
    }
  
    Minus_1(event){
      this.change_player();
    }
  
    twice(event){
      this.change_player();
    }
  
    divide_by_2(event){
    //   const PlayersList=this.props.players;
    //   let idx =PlayersList.findIndex(player => player.name=== this.state.player.name);
    //   const player=this.state.player;
    //   let number=player.number;
    //   const countStep=player.currentStep;
    //   const PlayerObj={
    //     name:this.state.name,
    //     score:number/2,
    //     currentStep:countStep+1,
    //     steps:[]
    //   };
    //  console.log(PlayerObj);
    //  console.log(PlayersList[idx]);
  
    //   PlayersList[idx]=PlayerObj;
    //  console.log(PlayersList[idx]);
  
     
    //   localStorage.setItem('Players', JSON.stringify(PlayersList));
    //   this.change_player();
    }
  
    handleClick = (name) => {
      const updatedPlayers = this.state.players.map((player) => {
        if (player.name === name) {
          this.setState({ player: player });
          return { ...player, score: player.score + 1 };
        } else {
          return player;
        }
      });
      localStorage.setItem('Players', JSON.stringify(updatedPlayers));
      this.setState({ players: updatedPlayers });
      this.change_player();
    }
  
    render(){
      const currentPlayer=this.state.player;
      // const randomNumber=this.state.randomNumber;
      return(
        <div>
          <h1>List of players:</h1>
          {this.props.players.map((player, index) => (
            <div key={index}>
              
              {/* document.getElementById('operation_button').disabled=true */}
              Gamer: {player.name} {currentPlayer.name===player.name?(<p>ENABLES</p>):(<p>NOT ENABLES</p>)}
              Score:{this.state.player.score} <br/>
              Steps:{player.steps}<br/>
              <button id='operation_button' onClick={this.Plus_1} disabled={currentPlayer.name!==player.name}>+1</button>
              <button id='operation_button' onClick={this.Minus_1} disabled={currentPlayer.name!==player.name}>-1</button>
              <button id='operation_button' onClick={this.twice} disabled={currentPlayer.name!==player.name}>*2</button>
              <button id='operation_button' onClick={() => this.handleClick(player.name)} disabled={currentPlayer.name!==player.name}>/2</button><br/>
             
              ----------------------------------------------
            </div>
          ))}
        </div>
      );
    }
  }
  
  export default StartGame;