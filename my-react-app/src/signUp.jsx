import React from 'react';
import Get100 from './Get100';
import StartGame from './StartGame';
import './styles.css'; 


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
    this.setState({ InGame: true });

  }
  NewGame(event){
    
    this.setState({ listPlayers: [] });
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
        </div>
      );
    }
  }
}


export default Link;