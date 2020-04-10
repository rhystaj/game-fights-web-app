import React from 'react';
import MatchInfoComponent from './MatchInfo';
import TextEntry from '../../utility/TextEntry';

import FighterInvitationSearchModal from '../../modals/ParticipantsInviteScreen/FighterInvitationSearchModal';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState } from '../../utility/LoadingComponent';
import { MatchData, FighterData } from '../../../types/datatypes';

class JudgeMatchInfoState extends LoadingComponentState<MatchData>{

    public readonly editingTitle: boolean;

    constructor(loading: boolean, data: MatchData, editingTitle: boolean){
        super(loading, data);
        this.editingTitle = editingTitle;
    }

    public setEditingTitle(editingTitle: boolean): JudgeMatchInfoState {
        return new JudgeMatchInfoState(this.loading, this.data, editingTitle);
    }

}

class JudgeMatchInfo extends MatchInfoComponent<JudgeMatchInfoState>{
    
    protected instantiateState(loading: boolean, data: MatchData): JudgeMatchInfoState {
        return new JudgeMatchInfoState(loading, data, false);
    }

    onConfirmTitle = (title: string) => {
        this.props.dataInterface.submitMatchTitle(title, this.onTitleSubmissionSuccess(title), 
            this.onTitleSubmissionFailure);
    }

    onCancelTitle = () => {
        this.setState({editingTitle: false});
    }

    onTitleSubmissionSuccess = (title: string) => () => {
        
        let newData: MatchData = this.state.data;
        newData.title = title;
        
        this.setState(this.state.setEditingTitle(false)
                                .setData(newData));

    }

    onTitleSubmissionFailure(){
        //Not sure yet...
    }

    renderTitle(title: string){
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
        return <div /> //Don't need to show the judge - user is the judge!
    }

    renderParticipantsInfo(participants: FighterData[]){
        return (
            <div>
                {super.renderParticipantsInfo(participants)}
                <button>Invite</button>
            </div>
        )
    }

    renderParticipant(participant: FighterData){
        return <div key={participant.id}>
            {super.renderParticipant(participant)}
            <button>-</button>
        </div>
    }

    renderLoaded(dataInterface: GameFightsDataInterface, data: MatchData){
        return (
            <div>
                {super.renderLoaded(dataInterface, data)}
                <FighterInvitationSearchModal />
            </div>
        )
    }

}

export default JudgeMatchInfo;
