import React from 'react';

import ItemList, { ItemListProps } from '../../utility/ItemList';
import { FighterData } from '../../../types/datatypes';

/**
 * Displays a list of fighters that you can interact with.
 */
export default class FighterList<P extends ItemListProps<FighterData>> extends ItemList<FighterData, P>{

    /**
     * Render the button that accompanies each fighter that can be used to interact with the fighter item.
     * @param fighter The data for the fighter whose rendered list item the data is being added to.
     */
    renderInteractionButton(fighter: FighterData){
        return {}; //To be overridden.
    }

    renderItem = (fighter: FighterData) => {
        return(
            <div key={fighter.id} className='fighterListItem'>
                <img src={fighter.profileImageURL} alt={fighter.name} />
                <p>{fighter.name}</p>
                {this.renderInteractionButton(fighter)}    
            </div>
        );
    }

}