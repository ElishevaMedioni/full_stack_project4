import React from 'react';
import ListPlayers from './ListPlayers';

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
    
  }

  setname(event){
    this.setState({name:event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    let myList = this.state.listPlayers.slice();
    let myListAllPlayers = this.state.listAllPlayers.slice();

    const PlayerObj={
      name:this.state.name,
      score:Math.floor(Math.random() * 100),
      currentStep:0,
      gameOver:false,
      steps:[]
    };
      
    if (myListAllPlayers.some(player => player.name === PlayerObj.name)){
      alert("this name already exist");
    }
    else{
      myListAllPlayers.push(PlayerObj);
      myList.push(PlayerObj);
    }
    
  
    this.setState({ listPlayers: myList,listAllPlayers:myListAllPlayers, name: "" });
    this.props.updateListPlayers(myList,myListAllPlayers);
    
  };


  handleDelete(namePlayer){
    let updatedPlayers =this.state.listPlayers.filter((player) => {
      return player.name !== namePlayer;
    });
    let updatedAllPlayers =this.state.listAllPlayers.filter((player) => {
      return player.name !== namePlayer;
    });
    this.setState({ listPlayers:updatedPlayers,listAllPlayers:updatedAllPlayers});
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

        <ListPlayers players={this.state.listPlayers} handleDelete={this.handleDelete.bind(this)}/>
        </div>
    );
  }
}

export default Get100;
