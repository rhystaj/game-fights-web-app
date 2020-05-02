import React from 'react';

import { ItemListProps } from '../../utility/ItemList';
import FighterList from './FighterList';

import { FighterData } from '../../../types/datatypes';
import { FighterMatchStatus } from '../../../enums/statusEnums';

interface InvitedFighterListProps extends ItemListProps<FighterData>{
    onUninviteFighter: (fighter: FighterData) => () => void;
}

/**
 * [DES/PRE] Renders a list of invited fighters that can be unininvited.
 */
export default class InvitedFighterList extends FighterList<InvitedFighterListProps>{

    constructor(props: InvitedFighterListProps){
        super(props)
    }

    renderInteractionButton = (fighter: FighterData) => {
        
        switch(fighter.status){

            case FighterMatchStatus.PARTCIPATING:
                return <p>Accepted</p>

            case FighterMatchStatus.DECLINED:
                return <p>Delclined</p>

            default:
                return <button 
                            className='uninviteFighterButton'
                            onClick={this.props.onUninviteFighter(fighter)}
                       >
                            Uninvite
                       </button>

        }
            
    }

}