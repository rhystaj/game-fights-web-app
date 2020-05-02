import React from 'react';

import FighterList from './FighterList';
import { FighterData } from '../../../types/datatypes';

import { ItemListProps } from '../../utility/ItemList';
import { FighterMatchStatus } from '../../../enums/statusEnums';

interface InvitationSearchResultsFighterListProps extends ItemListProps<FighterData>{
    onInviteFighter: (fighterData: FighterData) => () => void;
}

export default class InvitationSearchResultsFighterList extends FighterList<InvitationSearchResultsFighterListProps>{

    renderInteractionButton = (fighter: FighterData) => {
        
        if(fighter.status === FighterMatchStatus.ENGAGED){
            //If the fighter is already engaged, then we don't want to be able to invite them, so a button shouldn't 
            //be rendered.
            return <p className='fighterEngagedText'>Engaged</p>
        }
        else{
            return <button onClick={this.props.onInviteFighter(fighter)}>Invite</button>
        }

    }

}
