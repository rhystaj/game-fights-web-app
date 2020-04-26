import React from 'react';

import SearchModal, { SearchModalState, SearchModalProps } from '../../utility/SearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/functions/qolFunctions'

import InvitedFighterList from './InvitedFighterList';
import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';
import { FetchFunction } from '../../../types/functionTypes';

interface FighterInvitationSearchModalProps extends SearchModalProps<GameFightsDataInterface>{
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
    extends SearchModal<GameFightsDataInterface, FighterData, FighterInvitationSearchModalProps, 
        FighterInvitationSearchModalState>{
    
    onInviteFighter = (fighter: FighterData) => () => {
        this.setState({
            invitedFighters: whenUnassigned(this.state.invitedFighters, []).concat(fighter)
        });
    };

    onUninviteFighter = (fighter: FighterData) => () => {
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
     * A filter for fighters who have been added to the invited fighters.
     */
    invitedFightersFilter = (fighter: FighterData) => {
        const fighterIds: number[] = whenUnassigned(this.state.invitedFighters, []).map(f => f.id);
        return fighterIds.indexOf(fighter.id) === -1;
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