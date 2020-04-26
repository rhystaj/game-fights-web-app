import React from 'react';
import MatchInfoComponent from './MatchInfo';
import TextEntry from '../../utility/Entry/TextEntry';

import FighterInvitationSearchModal from '../../modals/ParticipantsInviteScreen/FighterInvitationSearchModal';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState } from '../../utility/LoadingComponent';
import { MatchData, FighterData } from '../../../types/datatypes';

import EnterableHeading from '../../utility/Enterable_Text/EnterableHeading';
import DateEntry from '../../utility/Entry/DateEntry';
import EnterableDateText from '../../utility/Enterable_Text/EnterableDateText';

interface JudgeMatchInfoState extends LoadingComponentState<MatchData>{
    showingInvitationModal: boolean;
}

export default class JudgeMatchInfo extends MatchInfoComponent<JudgeMatchInfoState>{
    
    protected determineInitialState(initialLoadingValue: boolean, initialData: MatchData): JudgeMatchInfoState {
        return {
            loading: initialLoadingValue,
            data: initialData,
            showingInvitationModal: false
        }
    }
    
    protected determineNewStateFromData(data: MatchData): JudgeMatchInfoState {
        return {
            loading: this.state.loading,
            data: data,
            showingInvitationModal: this.state.showingInvitationModal
        }
    }

    onConfirmTitle = async (title: string) => {
          
        await this.props.dataInterface.submitMatchTitle(title);
        
        let newData: MatchData = this.state.data;
        newData.title = title;
    
        this.setState({
            data: newData,
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
        
            return(
                <EnterableHeading
                    initialValue={this.state.data.title}
                    onSubmitValue={this.onConfirmTitle}
                />
            )
        
    }

    renderDate(date: Date){

        return<EnterableDateText
            initialValue={date}
            onSubmitValue={async () => { }}
        />

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
