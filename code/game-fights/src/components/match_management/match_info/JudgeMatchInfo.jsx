import React from 'react';
import MatchInfo from './MatchInfo';
import TextEntry from '../../utility/TextEntry';
import beInterface from '../../../backend_interface/interface';

import FighterInvitationSearchModal from '../../modals/ParticipantsInviteScreen/FighterInvitationSearchModal';

class JudgeMatchInfo extends MatchInfo{

    constructor(props){
        super(props);

        this.state.editingTitle = false;
    }

    onConfirmTitle = title => {
        beInterface.submitMatchTitle(title, this.onTitleSubmissionSuccess(title), )
    }

    onCancelTitle = () => {
        this.setState({editingTitle: false});
    }

    onTitleSubmissionSuccess = title => () => {
        this.setState({
            title: title,
            editingTitle: false
        })
    }

    onTitleSubmissionFailure(){
        //Not sure yet...
    }

    renderTitle(title){
        if(this.state.editingTitle){
            return(
                <TextEntry 
                    onConfirmEntry={this.onConfirmTitle}
                    onCancelEntry={this.onCancelTitle}
                />
            )
        }
        else{
            return <h1 onClick={() => this.setState({editingTitle: true})}>{title}</h1>
        }
    }

    renderJudgeInfo(){
        //Don't need to show the judge - user is the judge!
    }

    renderParticipantsInfo(participants){
        return (
            <div>
                {super.renderParticipantsInfo(participants)}
                <button>Invite</button>
            </div>
        )
    }

    renderParticipant(participant, number){
        return <div key={number}>
            {super.renderParticipant(participant)}
            <button>-</button>
        </div>
    }

    renderLoaded(){
        return (
            <div>
                {super.renderLoaded()}
                <FighterInvitationSearchModal />
            </div>
        )
    }

}

export default JudgeMatchInfo;
