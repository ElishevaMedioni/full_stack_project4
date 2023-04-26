import React from 'react';

class StartGame extends React.Component{
    constructor(props){
      super(props);
  
      this.state={
        player:this.props.players[0],
        players:this.props.players,
        allPlayers:this.props.allPlayers,
        bestPlayers:[]
      } 
  
      this.BestPlayers=this.BestPlayers.bind(this);
      this.change_player=this.change_player.bind(this);
  
    }
  
    change_player(event){
      const PlayersList=this.state.players;
      let idx =PlayersList.findIndex(player => player.name=== this.state.player.name);;
      if(PlayersList[idx+1]){
        this.setState({ player: PlayersList[idx+1] });
        console.log('ci bon');
      }
      else{
        this.setState({ player: PlayersList[0] });
      }
    }
  
    handleClickPlus1 = (name) => {
      const updatedPlayers = this.state.players.map((player) => {
        if (player.name === name) {
          let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score+1 };
          if(this.checkWin(updatedPlayer)){
            let ListSteps=player.steps.slice();
            ListSteps.push(updatedPlayer.currentStep);
            updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score + 1,gameOver:true, steps:ListSteps};
            const updatedAllPlayers = this.state.allPlayers.map((player) => {
              if (player.name === name) {
                return updatedPlayer
              }else{
                return player;
              }
            });
            this.setState({ allPlayers: updatedAllPlayers });
  
          }
          return updatedPlayer;
        } else {
          return player;
        }
      });
      this.setState({ players: updatedPlayers });
     
      this.change_player();
    }
  
    handleClickMinus1 = (name) => {
      const updatedPlayers = this.state.players.map((player) => {
        if (player.name === name) {
          let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score-1 };
          if(this.checkWin(updatedPlayer)){
            let ListSteps=player.steps.slice();
            ListSteps.push(updatedPlayer.currentStep);
            updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score - 1,gameOver:true, steps:ListSteps};
            const updatedAllPlayers = this.state.allPlayers.map((player) => {
              if (player.name === name) {
                return updatedPlayer
              }else{
                return player;
              }
            });
            this.setState({ allPlayers: updatedAllPlayers });          
  
          }
          return updatedPlayer;
        } else {
          return player;
        }
      });
      this.setState({ players: updatedPlayers });
      this.change_player();
    }
  
    handleClickTwice = (name) => {
      const updatedPlayers = this.state.players.map((player) => {
        if (player.name === name) {
          let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score*2 };
          if(this.checkWin(updatedPlayer)){
            let ListSteps=player.steps.slice();
            ListSteps.push(updatedPlayer.currentStep);
            updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score *2,gameOver:true, steps:ListSteps};
            const updatedAllPlayers = this.state.allPlayers.map((player) => {
              if (player.name === name) {
                return updatedPlayer;
              }else{
                return player;
              }
            });
            this.setState({ allPlayers: updatedAllPlayers });
          }
          return updatedPlayer;
        } else {
          return player;
        }
      });
      this.setState({ players: updatedPlayers });
      this.change_player();
    }
  
    handleClickDivide = (name) => {
      const updatedPlayers = this.state.players.map((player) => {
        if (player.name === name) {
          let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score/2 };
          if(this.checkWin(updatedPlayer)){
            let ListSteps=player.steps.slice();
            ListSteps.push(updatedPlayer.currentStep);
            updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score /2,gameOver:true, steps:ListSteps};
            const updatedAllPlayers = this.state.allPlayers.map((player) => {
              if (player.name === name) {
                return updatedPlayer
              }else{
                return player;
              }
            });
            this.setState({ allPlayers: updatedAllPlayers });
            // temp=true;
          }
          return updatedPlayer;
        } else {
          return player;
        }
      });
      this.setState({ players: updatedPlayers });
      this.change_player();
    }
  
    checkWin = (player) => {
      if(player.score===100){
         return true;
      }
  
    }
    replay(name){
      const updatedPlayers = this.state.players.map((player) => {
        if (player.name === name) {
          let updatedPlayer = { ...player,currentStep:0,score:Math.floor(Math.random() * 100) ,currentStep:0, gameOver:false, };
          return updatedPlayer;
        }
        return player;
      });
  
      this.setState({players:updatedPlayers});
      this.BestPlayers();
    }
  
    quit(name){
      let updatedPlayers =this.state.players.filter((player) => {
        return player.name !== name;
      });
      localStorage.setItem('Players', JSON.stringify(updatedPlayers));
      this.setState({ players:updatedPlayers});
      this.BestPlayers();
    }
  
    BestPlayers(){
      const sortedList = this.state.allPlayers.sort((a, b) => b.steps.length - a.steps.length);
      const top3ObjectsWithLongestLists = sortedList.slice(0, 3);
      this.setState({ bestPlayers : top3ObjectsWithLongestLists});
      this.props.updateListAllPlayers(this.state.allPlayers);
    }
  
  
    render(){
      const currentPlayer=this.state.player;
      return(
        <div>
  
          {this.state.bestPlayers.length === 0 ? (
            <div>{this.BestPlayers()}</div>) : ( <div></div>)}
  
          <div className='bestplayersContainer'>
            <div className='bestplayersClass' style={{color: 'red'}}>
              Best Players: <br/><br/>
            </div>
              {this.state.bestPlayers.map((player, index) => (
                <div key={index}>
                  {player.name}<br/><br/>
                </div>
              ))}
          </div>
            
  
            <h1>List of players:</h1>
          {this.state.players.map((player, index) => (
            <div className="playersClass" key={index}>
     
  
              {(player.gameOver)?(<p>{player.name} YOU WIN!!</p>):<div/>}
             
              <div>
               Gamer:
                <p className="gamerName" style={{display: 'inline'}}>{player.name}</p>
              </div>
              {currentPlayer.name===player.name?(<p>ENABLES</p>):(<p>NOT ENABLES</p>)}
              <br/>
              Score:{player.score} <br/><br/>
              Steps:{player.currentStep}<br/>
              
              <button className="button" id='operation_button' onClick={() => this.handleClickPlus1(player.name)} disabled={(currentPlayer.name!==player.name)||(player.gameOver===true) }>+1</button>
              <button className="button" id='operation_button' onClick={() => this.handleClickMinus1(player.name)} disabled={(currentPlayer.name!==player.name)||(player.gameOver===true) }>-1</button>
              <button className="button" id='operation_button' onClick={() => this.handleClickTwice(player.name)} disabled={(currentPlayer.name!==player.name)||(player.gameOver===true) }>*2</button>
              <button className="button" id='operation_button' onClick={() => this.handleClickDivide(player.name)} disabled={(currentPlayer.name!==player.name)||(player.gameOver===true) }>/2</button><br/>
            
              {(player.gameOver)? (<div>
                <button className="button" onClick={() => this.quit(player.name)}> quit</button>
                <button className="button" onClick={() => this.replay(player.name)}> replay</button>
              </div>):(<div></div>)}
  
              {player.name}'s scores:{player.steps.join(', ')} <br/>
            </div>
    
          ))}
           
          
        </div>
      );
    }
  }
  
  export default StartGame;