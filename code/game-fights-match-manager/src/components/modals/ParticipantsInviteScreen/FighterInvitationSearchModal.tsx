import React from 'react';

import SearchModal, { SearchModalState } from '../../utility/SearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/qolFunctions'

import InvitedFighterList from './InvitedFighterList';
import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

type FighterInvitationSearchModalProps = {dataInterface: GameFightsDataInterface};

interface FighterInvitationSearchModalState extends SearchModalState<FighterData>{
    invitedFighters: FighterData[]
}

/**
 * [DES] A SerachModal that allows you to search for and invite fighters.
 */
export default class FighterInvitationSearchModal 
    extends SearchModal<FighterInvitationSearchModalProps, FighterData, FighterInvitationSearchModalState>{

    getDerivedStateFromProps = (props: FighterInvitationSearchModalProps, state: FighterInvitationSearchModalState) => {
        return {
            searchResults:[],
            invitedFighters: []
        }
    }

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

}