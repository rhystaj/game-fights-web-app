import React from 'react';

import SearchModal, { SearchModalState, SearchModalProps } from '../../utility/SearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/functions/qolFunctions'

import InvitedFighterList from './InvitedFighterList';
import { FetchFunction } from '../../../types/functionTypes';
import { FighterMatchStatus } from '../../../enums/statusEnums';
import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';

interface FighterInvitationSearchModalProps extends SearchModalProps<GameFightsDataInterfaceManager>{
    preInvitedFighters: FighterData[],
    onConfirmInvites: (invites: FighterData[]) => void;
};

interface FighterInvitationSearchModalState extends SearchModalState<FighterData>{
    invitedFighters: FighterData[]
}

/**
 * [DES] A SerachModal that allows you to search for and invite fighters.
 */
export default class FighterInvitationSearchModal 
    extends SearchModal<GameFightsDataInterfaceManager, FighterData, FighterInvitationSearchModalProps, 
        FighterInvitationSearchModalState>{
    
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

    fetchSearchResults = (searchString: string) => (searchCallback: (searchResults: FighterData[]) => void) => {
        this.props.dataInterface.fetchFightersByName(searchString)(searchCallback);
    }

    protected determineInitialState(searchResults: FighterData[]): FighterInvitationSearchModalState{
        return {
            searchResults: searchResults,
            invitedFighters: this.props.preInvitedFighters
        }
    }

    protected GenerateFetchFunctionForSearchString(searchString: string): FetchFunction<FighterData[]> {
        return this.props.dataInterface.fetchFightersByName(searchString);
    }

    /**
     * A filter for filtering out fighters who have been added to the invited fighters.
     */
    invitedFightersFilter = (fighter: FighterData) => {
        //If a fighter is avalible or engaged, thry have not been invited.
        return fighter.status in [FighterMatchStatus.AVAILABLE, FighterMatchStatus.ENGAGED];
    }

    renderSearchResults = () => {
        return (
            <div>
                <InvitationSearchResultsFighterList 
                    items={this.state === null ? [] : this.state.searchResults.filter(this.invitedFightersFilter)} 
                    onInviteFighter={this.onInviteFighter}    
                />
                <InvitedFighterList 
                    items={this.state === null ? [] : this.state.invitedFighters}
                    onUninviteFighter={this.onUninviteFighter}
                />
            </div>
        );
    }

    protected getConfirmButtonText(): string {
        return "Confirm Invites";
    }

    protected getOnConfirmClickAction(): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            this.props.onConfirmInvites(this.state.invitedFighters);
        }
    }

}