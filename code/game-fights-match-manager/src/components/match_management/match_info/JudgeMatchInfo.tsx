import React from 'react';
import MatchInfoComponent from './MatchInfo';
import TextEntry from '../../utility/TextEntry';

import FighterInvitationSearchModal from '../../modals/ParticipantsInviteScreen/FighterInvitationSearchModal';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState } from '../../utility/LoadingComponent';
import { MatchData, FighterData } from '../../../types/datatypes';

interface JudgeMatchInfoState extends LoadingComponentState<MatchData>{
    editingTitle: boolean;
    showingInvitationModal: boolean;
}

export default class JudgeMatchInfo extends MatchInfoComponent<JudgeMatchInfoState>{
    
    protected determineInitialState(initialLoadingValue: boolean, initialData: MatchData): JudgeMatchInfoState {
        return {
            loading: initialLoadingValue,
            data: initialData,
            editingTitle: false,
            showingInvitationModal: false
        }
    }
    
    protected determineNewStateFromData(data: MatchData): JudgeMatchInfoState {
        return {
            loading: this.state.loading,
            data: data,
            editingTitle: this.state.editingTitle,
            showingInvitationModal: this.state.showingInvitationModal
        }
    }
    
    onConfirmTitle = (title: string) => {
        this.props.dataInterface.submitMatchTitle(title)
                                .then(this.onTitleSubmissionSuccess);
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

    onInviteClick = () => {
        this.setState({
            showingInvitationModal: true
        });
    }

    onConfirmInvites = (invites: FighterData[]) => {

        this.props.dataInterface.submitMatchParticipants(invites)
                                .then(this.onConfirmInvitesSuccess);

        this.setState({
            showingInvitationModal: false
        });

    }

    onConfirmInvitesSuccess = (invites: FighterData[]) => {
        
        const newMatchData = this.state.data;
        newMatchData.participants = invites;
        
        this.setState({
            data: newMatchData
        });
        
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
                <button onClick={this.onInviteClick}>Invite</button>
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
                {this.state.showingInvitationModal ?
                    (<FighterInvitationSearchModal 
                        dataInterface={dataInterface}
                        preInvitedFighters={data.participants}
                        onCancel={() => { this.setState({ showingInvitationModal: false }) }}
                        onConfirmInvites={this.onConfirmInvites}
                    />)
                    :
                    (<div/>)}
            </div>
        )
    }

}
