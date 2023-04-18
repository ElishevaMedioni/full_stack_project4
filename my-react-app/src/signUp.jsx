import React from 'react';
// import StartGame from './StartGame'; 
import { BestPlayers } from './BestPlayers.jsx';
import './styles.css'; // Import the CSS file

class ListPlayers extends React.Component{

  
  render(){
    let players=this.props.players;
    return(
      <div >
        <h1>List of gamers:</h1>
        {players.map((player, index) => (
          <div className="player-item" key={index}>
            Gamer: {player.name}
            <button className='buttonDelete' onClick={() => this.props.handleDelete(player.name)}>X</button>
          </div>
        ))}
      </div>
    );
  }
}

class StartGame extends React.Component{
  constructor(props){
    super(props);

    this.state={
      player:this.props.players[0],
      players:this.props.players,
      gameOver:false,
      bestPlayers:[]
    }

    // this.Plus_1=this.Plus_1.bind(this);
    // this.Minus_1=this.Minus_1.bind(this);
    // this.twice=this.twice.bind(this);
    this.BestPlayers=this.BestPlayers.bind(this);
    this.change_player=this.change_player.bind(this);
    this.replay=this.replay.bind(this);
    // this.quit=this.quit.bind(this);

    // this.randerNumber=this.randerNumber.bind(this);

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
    let temp=false;
    const updatedPlayers = this.state.players.map((player) => {
      if (player.name === name) {
        let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score+1 };
        if(this.checkWin(updatedPlayer)){
          let ListSteps=player.steps.slice();
          ListSteps.push(updatedPlayer.currentStep);
          updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score + 1,win:true, steps:ListSteps};
      // this.BestPlayers();
          temp=true;

        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    if(temp){
      this.BestPlayers();
    }
    this.change_player();
  }

  handleClickMinus1 = (name) => {
    let temp=false;
    const updatedPlayers = this.state.players.map((player) => {
      if (player.name === name) {
        let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score-1 };
        if(this.checkWin(updatedPlayer)){
          let ListSteps=player.steps.slice();
          ListSteps.push(updatedPlayer.currentStep);
          updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score - 1,win:true, steps:ListSteps};
      // this.BestPlayers();
          temp=true;

        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    if(temp){
      this.BestPlayers();
    }
    this.change_player();
  }

  handleClickTwice = (name) => {
    let temp=false;
    const updatedPlayers = this.state.players.map((player) => {
      if (player.name === name) {
        let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score*2 };
        if(this.checkWin(updatedPlayer)){
          let ListSteps=player.steps.slice();
          ListSteps.push(updatedPlayer.currentStep);
          updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score *2,win:true, steps:ListSteps};
      // this.BestPlayers();
          temp=true;
        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    // if(temp){
    //   this.BestPlayers();
    // }
    this.change_player();
  }

  handleClickDivide = (name) => {
    let temp=false;
    const updatedPlayers = this.state.players.map((player) => {
      if (player.name === name) {
        let updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score/2 };
        if(this.checkWin(updatedPlayer)){
          let ListSteps=player.steps.slice();
          ListSteps.push(updatedPlayer.currentStep);
          updatedPlayer = { ...player,currentStep:player.currentStep+1, score: player.score /2,win:true, steps:ListSteps};
          temp=true;
        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    // if(temp){
    //   this.BestPlayers();
    // }
    // this.BestPlayers();
    this.change_player();
  }

  checkWin = (player) => {
    if(player.score===100){
      this.setState({ gameOver: true });
      // this.BestPlayers();
      // const sortedList = this.state.players.sort((a, b) => b.steps.length - a.steps.length);
      // const top3ObjectsWithLongestLists = sortedList.slice(0, 3);
      // this.setState({ bestPlayers : top3ObjectsWithLongestLists});
      return true;
    }

  }
  replay(event){
    const updatedPlayers = this.state.players.map((player) => {
      // if (player.name === name) {
        let updatedPlayer = { ...player,currentStep:0,score:Math.floor(Math.random() * 100) ,currentStep:0, win:false, };
        return updatedPlayer;
    });

    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ gameOver: false, player:this.state.players[0],players:updatedPlayers});
    this.BestPlayers();
  }

  quit(name){
    let updatedPlayers =this.state.players.filter((player) => {
      return player.name !== name;
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players:updatedPlayers});
    // this.setState({ gameOver: false, player:this.props.players[0]});
  }

  BestPlayers(){
    const sortedList = this.state.players.sort((a, b) => b.steps.length - a.steps.length);
    const top3ObjectsWithLongestLists = sortedList.slice(0, 3);
    this.setState({ bestPlayers : top3ObjectsWithLongestLists});
  }

  render(){
    const currentPlayer=this.state.player;
    // const randomNumber=this.state.randomNumber;
    return(
      <div>
        {/* <h1>List of players:</h1> */}
        

        {(this.state.gameOver)? (<div>
              <button className="button" onClick={ this.replay}> replay</button></div>):(<div></div>)}

        {this.state.bestPlayers.length !== 0 ? (
        <div className='bestplayersContainer'>
          <div className='bestplayersClass'>
            Best Players: <br/><br/>
            {this.state.bestPlayers.map((player, index) => (
              <div key={index}>
                {player.name}<br/><br/>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}

          

          <h1>List of players:</h1>
        {this.state.players.map((player, index) => (
          <div className="playersClass" key={index}>
            {/* <PlayerInfos player={player} players={this.props.players} currentPlayer={currentPlayer}/> */}
            {/* document.getElementById('operation_button').disabled=true */}
            

            {(this.state.gameOver)?((player.win)?(<p>{player.name} YOU WIN!!</p>):(<p>Sorry you lose. Too bad</p>)):<div/>}
            {/* Gamer: <p className="gamerName">{player.name}</p> {currentPlayer.name===player.name?(<p>ENABLES</p>):(<p>NOT ENABLES</p>)} */}
           
            <div>
             Gamer:
              <p className="gamerName" style={{display: 'inline'}}>{player.name}</p>
              {/* {currentPlayer.name===player.name?(<p style={{display: 'inline'}}> ENABLES</p>):(<p style={{display: 'inline'}}> NOT ENABLES</p>)} */}
            </div>
            {currentPlayer.name===player.name?(<p>ENABLES</p>):(<p>NOT ENABLES</p>)}
            <br/>
            Score:{player.score} <br/><br/>
            Steps:{player.currentStep}<br/>
            
            <button className="button" id='operation_button' onClick={() => this.handleClickPlus1(player.name)} disabled={(currentPlayer.name!==player.name)||(this.state.gameOver===true) }>+1</button>
            <button className="button" id='operation_button' onClick={() => this.handleClickMinus1(player.name)} disabled={(currentPlayer.name!==player.name)||(this.state.gameOver===true) }>-1</button>
            <button className="button" id='operation_button' onClick={() => this.handleClickTwice(player.name)} disabled={(currentPlayer.name!==player.name)||(this.state.gameOver===true) }>*2</button>
            <button className="button" id='operation_button' onClick={() => this.handleClickDivide(player.name)} disabled={(currentPlayer.name!==player.name)||(this.state.gameOver===true) }>/2</button><br/>
          
            {(this.state.gameOver)? (<div>
              {/* <button onClick={ this.replay}> replay</button> */}
              <button className="button" onClick={() => this.quit(player.name)}> quit</button>
            </div>):(<div></div>)}

            {player.name}'s scores:{player.steps.join(', ')} <br/>
          </div>
  
        ))}
         
            
               
            

        
      </div>
    );
  }
}

// class BestPlayers extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       player:JSON.parse(localStorage.getItem("Players"))[0],
//       players:this.props.players,
//       InGame:true
//     }
//     // this.change_player=this.change_player.bind(this);
//   }
// }
  
//   // change_player(event){
//   //   const PlayersList=this.props.players;
//   //   let idx =PlayersList.findIndex(player => player.name=== this.state.player.name);;
//   //   if(PlayersList[idx+1]){
//   //     this.setState({ player: PlayersList[idx+1] });
//   //     console.log('ci bon');
//   //   }
//   //   else{
//   //     this.setState({ player: PlayersList[0] });
//   //   }
//   // }

//   handleClickDivide = (name) => {
//     const updatedPlayers = this.state.players.map((player) => {
//       if (player.name === name) {
//         this.setState({ player: player });
//         return { ...player, score: player.score + 1 };
//       } else {
//         return player;
//       }
//     });
//     localStorage.setItem('Players', JSON.stringify(updatedPlayers));
//     this.setState({ players: updatedPlayers });
//     this.setState({ InGame: false });
//     // this.change_player();
//   }

//   render(){
//     return(
//       <div>

//         Gamer: {this.props.player.name} {this.props.currentPlayer.name===this.props.player.name?(<p>ENABLES</p>):(<p>NOT ENABLES</p>)}
//         Score:{this.props.player.score} <br/>
//         Steps:{this.props.player.steps}<br/>
//         <button id='operation_button' onClick={this.Plus_1} disabled={this.props.currentPlayer.name!==this.props.player.name}>+1</button>
//         <button id='operation_button' onClick={this.Minus_1} disabled={this.props.currentPlayer.name!==this.props.player.name}>-1</button>
//         <button id='operation_button' onClick={this.twice} disabled={this.props.currentPlayer.name!==this.props.player.name}>*2</button>
//         <button id='operation_button' onClick={() => this.handleClickDivide(this.props.player.name)} disabled={this.props.currentPlayer.name!==this.props.player.name}>/2</button><br/>
        
//         ----------------------------------------------
  
      
//       </div>
//     );
//   }
// }


class Link extends React.Component {
  constructor(props){
    super(props);
    this.state={
      InGame:false,
      listPlayers:[]
    }
    this.StartGame=this.StartGame.bind(this);
    this.NewGame=this.NewGame.bind(this);
    this.updateListPlayers=this.updateListPlayers.bind(this);

  }

  updateListPlayers(listPlayers) {
    this.setState({ listPlayers: listPlayers });
  }

  StartGame(event){
    // document.getElementById("name").disabled = true;
    // document.getElementById("SubmitButton").disabled = true;
    this.setState({ InGame: true });

  }
  NewGame(event){
    // document.getElementById("name").disabled = false;
    // document.getElementById("SubmitButton").disabled = false;
    this.setState({ listPlayers: [] });
    // localStorage.setItem('Players', '');
    this.setState({ InGame: false });

  }
  render(){
    if(this.state.InGame===false){
      return(
        <div className="container">
          <button className='button' onClick={this.StartGame}>Start Game</button>
          <Get100 updateListPlayers={this.updateListPlayers}/>

        </div>
      );
    }
    else{
      return(
        <div className="container">
          <button className='button' onClick={this.NewGame}>New Game</button>
          <StartGame players={this.state.listPlayers}/>
          {/* <StartGame players={localStorage.getItem("Players") ? JSON.parse(localStorage.getItem("Players")) : []}/> */}
        </div>
      );
    }
  }
}





class Get100 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      listPlayers:[],
      InGame:false
    }
    this.setname=this.setname.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    // this.StartGame=this.StartGame.bind(this);
    // this.NewGame=this.NewGame.bind(this);
  }

  setname(event){
    this.setState({name:event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    // let listPlayers = localStorage.getItem("Players")?JSON.parse(localStorage.getItem("Players")):[];
    // let listPlayers=[];
    let myList = this.state.listPlayers.slice();
    // const objectExist = listPlayers.some((o) => o.name === this.state.name);
    // if(objectExist){
    //   objectExist.currentStep=0;
    //   objectExist.win=false;
    //   objectExist.score=Math.floor(Math.random() * 100);
    //   myList.push(objectExist);

    // }
    // else{
    const PlayerObj={
      name:this.state.name,
      score:Math.floor(Math.random() * 100),
      currentStep:0,
      win:false,
      steps:[]
    };
      
    // listPlayers.push(PlayerObj);
    if (myList.some(player => player.name === PlayerObj.name)){
      alert("this name already exist");
    }
    else{
      myList.push(PlayerObj);
    }
    
    //}
    this.setState({ listPlayers: myList, name: "" });
    this.props.updateListPlayers(myList);
    // let totalPlayers=JSON.parse(localStorage.getItem('Players'));
    // localStorage.setItem('Players', JSON.stringify(listPlayers));
  };


  handleDelete(namePlayer){
    let updatedPlayers =this.state.listPlayers.filter((player) => {
      return player.name !== namePlayer;
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ listPlayers:updatedPlayers});
    this.props.updateListPlayers(updatedPlayers);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.setname}
          />
          <button className='button' id='SubmitButton' type="submit">Submit</button>
        </form>

        {/* {document.getElementById("name").value = ""} */}
        <ListPlayers players={this.state.listPlayers} handleDelete={this.handleDelete.bind(this)}/>
        {/* <Link players={this.state.listPlayers}/> */}
        {/* {document.getElementById("name")?(document.getElementById("name").value = ""):("")} */}
      </div>
    );
  }
}

export default Link;