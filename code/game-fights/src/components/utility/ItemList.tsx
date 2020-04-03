import React, { Component } from 'react';

import { whenUnassigned } from './../../utility/qolFunctions';

export interface ItemListProps<T>{
    items: T[]
}

/**
 * A component that renders a list of a sepcified type of item.
 */
export default class ItemList<T, P extends ItemListProps<T>> extends Component<P>{

    constructor(props: P){
        super(props)
    }

    /**
     * Render the single item from the list.
     * @param item The item to be rendered.
     */
    renderItem = (item: T) => {
        return {}; //To be overridden.
    }
    
    render(){
        return whenUnassigned(this.props.items, []).map((item: T) => this.renderItem(item));
    }

}