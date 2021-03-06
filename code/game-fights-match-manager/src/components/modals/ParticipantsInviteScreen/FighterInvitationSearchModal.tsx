import React from 'react';

import AbstractSearchModal, { SearchModalProps, SearchModalState } from '../../utility/Modals/AbstractSearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/functions/qolFunctions'

import InvitedFighterList from './InvitedFighterList';
import { FighterMatchStatus } from '../../../enums/statusEnums';

import '../../../style/main.css'

interface FighterInvitationSearchModalProps extends SearchModalProps<FighterData>{
    preInvitedFighters: FighterData[],
    onConfirmInvites: (invites: FighterData[]) => Promise<void>;
};

interface FighterInvitationSearchModalState extends SearchModalState<FighterData>{
    invitedFighters: FighterData[]
}

/**
 * [DES] A SearchModal that allows you to search for and invite fighters.
 */
export default class FighterInvitationSearchModal extends AbstractSearchModal<FighterData, 
        FighterInvitationSearchModalProps, FighterInvitationSearchModalState>{
    
    protected get searchModalTypeClass(){
        return "fighterInvitation";
    }

    protected determineInitialSearchModalState(initalSearchResults: FighterData[], showingConfirmationError: boolean){
        return{
            searchResults: initalSearchResults,
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
            [
                <InvitationSearchResultsFighterList 
                    itemListTypeName="fighterInvitationSearchResults"
                    items={this.state === null ? [] : this.state.searchResults.filter(this.invitedFightersFilter)} 
                    onInviteFighter={this.onInviteFighter}    
                />,
                <InvitedFighterList
                    itemListTypeName="invitedFighters"
                    items={this.state === null ? [] : this.state.invitedFighters}
                    onUninviteFighter={this.onUninviteFighter}
                />
            ]
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