import React, { Component } from 'react'
import Loading from './Loading'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**
 * A component that displays data they may need to be loaded.
 */
class LoadingComponent extends Component {

    determineNewState(result){ 
        //Override in subclass to add additional behaviours. 
        return result;
    }

    renderLoaded(){ 
        //Override in subclass.
        return null; 
    }

    constructor(props, query){
        super(props);

        this.query = query;

        //Assume data will take time to load. If it loads instantly the component will be updated
        //instantly like it never showed a loading screen.
        this.state = {
            loading: true,
        }

        //Load the data using the query, updating the state based on the result when done.
        this.query(queryResult => {
        
            let newState = this.determineNewState(queryResult);
            if(newState.loading !== undefined){
                throw new Error('The loading flag should not be set outsideof the LoadingComponent object!');
            }

            newState.loading = false;
            this.setState(newState);

        });
    }

    render(){
        if(this.state.loading){
            return <Loading />
        } 
        else {
            return this.renderLoaded();
        }
    }
}

export default LoadingComponent
