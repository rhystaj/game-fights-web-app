import React from 'react';

import SearchModal, { SearchModalProps, SearchModalState } from '../../utility/SearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/functions/qolFunctions'

import InvitedFighterList from './InvitedFighterList';
import { FighterMatchStatus } from '../../../enums/statusEnums';
import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import { DataInterfacingComponentState } from '../../utility/DataInterfacingComponent';
import SearchInterface from '../../../backend_interface/lib/abstract_implementations/AbstarctSearchInterface';
import ISearchInterface from '../../../backend_interface/lib/interfaces/ISearchInterface';

interface FighterInvitationSearchModalProps extends SearchModalProps<GameFightsDataInterfaceManager>{
    preInvitedFighters: FighterData[],
    onConfirmInvites: (invites: FighterData[]) => Promise<void>;
};

interface FighterInvitationSearchModalState extends SearchModalState<FighterData>{
    invitedFighters: FighterData[]
}

/**
 * [DES] A SearchModal that allows you to search for and invite fighters.
 */
export default class FighterInvitationSearchModal extends SearchModal<GameFightsDataInterfaceManager, FighterData, 
    ISearchInterface<FighterData>, FighterInvitationSearchModalProps, FighterInvitationSearchModalState>{
    
    protected getDataInterface(): ISearchInterface<FighterData> {
        return this.props.dataInterfaceManager.fighterDataInvitationInterface;
    }

    protected determineInitialSearchModalState(initialData: FighterData[], showingConfirmationError: boolean){
        return{
            data: initialData,
            showingConfirmationError: showingConfirmationError,
            invitedFighters: this.props.preInvitedFighters
        }
    }

    onInviteFighter = (fighter: FighterData) => () => {
        
        fighter.status = FighterMatchStatus.INVITED;
        
        this.setState({
            invitedFighters: whenUnassigned(this.state.invitedFighters, []).concat(fighter)
        });

    };

    onUninviteFighter = (fighter: FighterData) => () => {
        
        fighter.status = FighterMatchStatus.AVAILABLE;
        
        this.setState({
            invitedFighters: this.state.invitedFighters.filter(f => f.id !== fighter.id)
        });

    }

    /**
     * A filter for filtering out fighters who have been added to the invited fighters.
     */
    invitedFightersFilter = (fighter: FighterData) => {
        //If a fighter is avalible or engaged, they have not been invited.
        return fighter.status in [FighterMatchStatus.AVAILABLE, FighterMatchStatus.ENGAGED];
    }

    renderSearchResults = () => {
        return (
            <div>
                <InvitationSearchResultsFighterList 
                    items={this.state === null ? [] : this.state.data.filter(this.invitedFightersFilter)} 
                    onInviteFighter={this.onInviteFighter}    
                />
                <InvitedFighterList 
                    items={this.state === null ? [] : this.state.invitedFighters}
                    onUninviteFighter={this.onUninviteFighter}
                />
            </div>
        );
    }

    protected renderConfirmationError(){
        return <p>An error occured while inviting the fighters.</p>
    }

    protected getConfirmButtonText(): string {
        return "Confirm Invites";
    }

    protected async confirm(){
        await this.props.onConfirmInvites(this.state.invitedFighters);
    }
}