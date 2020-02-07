import React, {Component} from 'react';
import beInterface from '../../backend_interface/interface';

class ParticipantsInviteScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            foundFighters: [],
            invitations: []
        }
    }

    onSearchBoxInput = e => {
        beInterface.fetchFightersByName(e.target.value, this.onFightersFetched);
    }

    onFightersFetched = foundFighters => {
        this.setState({foundFighters: foundFighters})
    }

    addFighterToInvites = fighterNumber => () => {
        this.setState({ 
            invitations: this.state.invitations.concat(this.state.foundFighters[fighterNumber]) 
        });
    }

    renderFoundFighters(){
        let number = 0;
        
        return this.state.foundFighters.map(f => { 
            return (
                <div key={number}>
                    <img src='https://via.placeholder.com/50' alt={f.name} />
                    <p>{f.name}</p>
                    {f.engaged ? 
                        <p>Engaged</p> 
                        : 
                        <button onClick={this.addFighterToInvites(number++)}>Invite</button>}
                </div>
            )
        }
        )
    }

    renderInvitations(){
        return this.state.invitations.map(i =>
            (
                <div>
                    <img src='https://via.placeholder.com/50' alt={i.name} />
                    <p>{i.name}</p>
                    <button>Remove</button>
                </div>
            )
        )
    }

    render(){
        return (
            <div>
                <input onInput={this.onSearchBoxInput} type="text" id="searchBox" />
                <div id="participantFind">
                    {this.renderFoundFighters()}
                </div>
                <div id="invitations">
                    {this.renderInvitations()}
                </div>
                <button>Cancel</button>
                <button>Send Invites</button>
            </div>
        )
    }    

}

export default ParticipantsInviteScreen;