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
      allPlayers:this.props.allPlayers,
      bestPlayers:[]
    } 

    this.BestPlayers=this.BestPlayers.bind(this);
    this.change_player=this.change_player.bind(this);
    // this.quit=this.quit.bind(this);

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
    // let temp=false;
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
          // temp=true;

        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    this.setState({ players: updatedPlayers });
    // if(temp){
    //   this.BestPlayers();
    // }
    this.change_player();
  }

  handleClickMinus1 = (name) => {
    // let temp=false;
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
          // temp=true;

        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    // localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    // if(temp){
    //   this.BestPlayers();
    // }
    this.change_player();
  }

  handleClickTwice = (name) => {
    // let temp=false;
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
          // temp=true;
        }
        return updatedPlayer;
      } else {
        return player;
      }
    });
    // localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    // if(temp){
    //   this.BestPlayers();
    // }
    this.change_player();
  }

  handleClickDivide = (name) => {
    // let temp=false;
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
    // localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ players: updatedPlayers });
    // if(temp){
    //   this.BestPlayers();
    // }
    // this.BestPlayers();
    this.change_player();
  }

  checkWin = (player) => {
    if(player.score===100){
      // this.setState({ gameOver: true });
      // this.BestPlayers();
      // const sortedList = this.state.players.sort((a, b) => b.steps.length - a.steps.length);
      // const top3ObjectsWithLongestLists = sortedList.slice(0, 3);
      // this.setState({ bestPlayers : top3ObjectsWithLongestLists});
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

    // localStorage.setItem('Players', JSON.stringify(updatedPlayers));
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
    // const randomNumber=this.state.randomNumber;
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
            {/* <PlayerInfos player={player} players={this.props.players} currentPlayer={currentPlayer}/> */}
            {/* document.getElementById('operation_button').disabled=true */}
            

            {(player.gameOver)?(<p>{player.name} YOU WIN!!</p>):<div/>}
            {/* Gamer: <p className="gamerName">{player.name}</p> {currentPlayer.name===player.name?(<p>ENABLES</p>):(<p>NOT ENABLES</p>)} */}
           
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
      listPlayers:[],
      listAllPlayers:[],
    }
    this.StartGame=this.StartGame.bind(this);
    this.NewGame=this.NewGame.bind(this);
    this.updateListPlayers=this.updateListPlayers.bind(this);

  }

  updateListPlayers(listPlayers,listAllPlayers) {
    this.setState({ listPlayers: listPlayers });
    this.setState({ listAllPlayers: listAllPlayers });

  }

  updateListAllPlayers(myList) {
    let myListAllPlayers = this.state.listAllPlayers.slice();

    for (let i = 0; i < myListAllPlayers.length; i++) {
      for (let j = 0; j < myList.length; j++) {
        if (myListAllPlayers[i].name === myList[j].name) {
          myListAllPlayers[i] = myList[j];
          break;
        }
        else if (j === myList.length - 1) {
          myListAllPlayers.push(myList[j]);
        }
     }
    }
    this.setState({ listAllPlayers: myList });
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
          Get To 100<br/><br/>
          <button className='button' onClick={this.StartGame}>Start Game</button>
          <Get100 updateListPlayers={this.updateListPlayers} allPlayers={this.state.listAllPlayers}/>

        </div>
      );
    }
    else{
      return(
        <div className="container">
          <button className='button' onClick={this.NewGame}>New Game</button>
          <StartGame players={this.state.listPlayers} allPlayers={this.state.listAllPlayers} updateListAllPlayers={this.updateListAllPlayers.bind(this)}/>
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
      listAllPlayers:this.props.allPlayers,
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
    let myListAllPlayers = this.state.listAllPlayers.slice();

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
      gameOver:false,
      steps:[]
    };
      
    // listPlayers.push(PlayerObj);
    if (myListAllPlayers.some(player => player.name === PlayerObj.name)){
      alert("this name already exist");
    }
    else{
      myListAllPlayers.push(PlayerObj);
      myList.push(PlayerObj);
    }
    
    //}
    this.setState({ listPlayers: myList,listAllPlayers:myListAllPlayers, name: "" });
    this.props.updateListPlayers(myList,myListAllPlayers);
    // let totalPlayers=JSON.parse(localStorage.getItem('Players'));
    // localStorage.setItem('Players', JSON.stringify(listPlayers));
  };


  handleDelete(namePlayer){
    let updatedPlayers =this.state.listPlayers.filter((player) => {
      return player.name !== namePlayer;
    });
    let updatedAllPlayers =this.state.listAllPlayers.filter((player) => {
      return player.name !== namePlayer;
    });
    localStorage.setItem('Players', JSON.stringify(updatedPlayers));
    this.setState({ listPlayers:updatedPlayers,listAllPlayers:updatedAllPlayers});
    // this.setState({ listPlayers:updatedPlayers});
    this.props.updateListPlayers(updatedPlayers,updatedAllPlayers);
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