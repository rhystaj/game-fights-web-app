import React from 'react';

import SearchModal, { SearchModalProps } from '../../utility/SearchModal';

import InvitationSearchResultsFighterList from './InvitationSearchResultsFighterList';

import { FighterData } from '../../../types/datatypes';
import { whenUnassigned } from '../../../utility/functions/qolFunctions'

import InvitedFighterList from './InvitedFighterList';
import { FighterMatchStatus } from '../../../enums/statusEnums';
import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import { DataInterfacingComponentState } from '../../utility/DataInterfacingComponent';
import SearchInterface from '../../../backend_interface/lib/SearchInterface';

interface FighterInvitationSearchModalProps extends SearchModalProps<GameFightsDataInterfaceManager>{
    preInvitedFighters: FighterData[],
    onConfirmInvites: (invites: FighterData[]) => void;
};

interface FighterInvitationSearchModalState extends DataInterfacingComponentState<FighterData[]>{
    invitedFighters: FighterData[]
}

/**
 * [DES] A SearchModal that allows you to search for and invite fighters.
 */
export default class FighterInvitationSearchModal extends SearchModal<GameFightsDataInterfaceManager, FighterData, 
    SearchInterface<FighterData>, FighterInvitationSearchModalProps, FighterInvitationSearchModalState>{
    
    protected getDataInterface(): SearchInterface<FighterData> {
        return this.props.dataInterfaceManager.fighterDataInvitationInterface;
    }

    protected determineInitialComponentState(initialData: FighterData[]): FighterInvitationSearchModalState {
        return{
            data: initialData,
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

    protected getConfirmButtonText(): string {
        return "Confirm Invites";
    }

    protected getOnConfirmClickAction(): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            this.props.onConfirmInvites(this.state.invitedFighters);
        }
    }

}