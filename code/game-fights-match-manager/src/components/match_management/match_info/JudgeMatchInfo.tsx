import React from 'react';
import MatchInfoComponent from './MatchInfo';

import FighterInvitationSearchModal from '../../modals/ParticipantsInviteScreen/FighterInvitationSearchModal';

import { LoadingComponentState } from '../../utility/LoadingComponent';
import { MatchData, FighterData } from '../../../types/datatypes';

import EnterableHeading from '../../utility/Enterable_Text/EnterableHeading';
import EnterableDateText from '../../utility/Enterable_Text/EnterableDateText';
import IMatchDataInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/IMatchDataInterface';

interface JudgeMatchInfoState extends LoadingComponentState<MatchData>{
    showingInvitationModal: boolean;
}

export default class JudgeMatchInfo extends MatchInfoComponent<JudgeMatchInfoState>{
    
    protected get matchInfoTypeClass(){
        return "judge";
    }

    protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialData: MatchData): JudgeMatchInfoState {
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
          
        await this.getDataInterface().submitMatchTitle(title);
        
        let newData: MatchData = this.state.data;
        newData.title = title;
    
        this.setState({
            data: newData,
        });
        
    }

    onManageInvitesClick = () => {
        this.setState({
            showingInvitationModal: true
        });
    }

    onConfirmInvites = async (invites: FighterData[]) => {
        await this.getDataInterface().submitMatchParticipants(invites);
        this.setState({ showingInvitationModal: false });
    }

    renderTitle(title: string, matchTitleClassName: string){
        
            return(
                <EnterableHeading
                    className={matchTitleClassName}
                    initialValue={title}
                    onSubmitValue={this.onConfirmTitle}
                />
            )
        
    }

    renderDate(date: Date, dateTextClassName: string){

        return<EnterableDateText
            className={dateTextClassName}
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
                <button className="manageInvitesButton" onClick={this.onManageInvitesClick}>Manage Participants</button>
            </div>
        )
    }

    renderLoaded(dataInterface: IMatchDataInterface, data: MatchData){
        return (
            <div>
                {super.renderLoaded(dataInterface, data)}
                {this.state.showingInvitationModal ?
                    (<FighterInvitationSearchModal 
                        dataInterfaceManager={this.props.dataInterfaceManager}
                        preInvitedFighters={data.invitedFighters}
                        onCancel={() => { this.setState({ showingInvitationModal: false }) }}
                        onConfirmInvites={this.onConfirmInvites}
                    />)
                    :
                    (<div/>)}
            </div>
        )
    }

}
