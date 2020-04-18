import React from 'react';
import MatchInfoComponent from './MatchInfo';
import TextEntry from '../../utility/TextEntry';

import FighterInvitationSearchModal from '../../modals/ParticipantsInviteScreen/FighterInvitationSearchModal';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState } from '../../utility/LoadingComponent';
import { MatchData, FighterData } from '../../../types/datatypes';

interface JudgeMatchInfoState extends LoadingComponentState<MatchData>{
    editingTitle: boolean;
}

class JudgeMatchInfo extends MatchInfoComponent<JudgeMatchInfoState>{
    
    protected determineInitialState(initialLoadingValue: boolean, initialData: MatchData): JudgeMatchInfoState {
        return {
            loading: initialLoadingValue,
            data: initialData,
            editingTitle: false
        }
    }
    
    protected determineNewStateFromData(data: MatchData): JudgeMatchInfoState {
        return {
            loading: this.state.loading,
            data: data,
            editingTitle: this.state.editingTitle
        }
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
        
        this.setState({
            data: newData,
            editingTitle: false
        });

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
                <FighterInvitationSearchModal dataInterface={dataInterface}/>
            </div>
        )
    }

}

export default JudgeMatchInfo;
