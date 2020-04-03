import React from 'react';

import SearchModal, { SearchModalState } from '../../utility/SearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import beInterface from './../../../backend_interface/interface';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/qolFunctions'

import InvitedFighterList from './InvitedFighterList';

interface FighterInvitationSearchModalState extends SearchModalState<FighterData>{
    invitedFighters: FighterData[]
}

/**
 * [DES] A SerachModal that allows you to search for and invite fighters.
 */
export default class FighterInvitationSearchModal extends SearchModal<FighterData, FighterInvitationSearchModalState>{

    constructor(props: {}){
        super(props);
    }

    getDerivedStateFromProps = (props: {}, state: FighterInvitationSearchModalState) => {
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
        beInterface.fetchFightersByName(searchString)(searchCallback);
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