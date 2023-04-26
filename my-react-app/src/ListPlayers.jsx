import React from 'react';

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

  export default ListPlayers;