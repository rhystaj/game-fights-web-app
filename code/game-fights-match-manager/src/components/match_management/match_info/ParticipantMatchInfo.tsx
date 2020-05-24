import MatchInfoComponent from './MatchInfo'

import { LoadingComponentState } from '../../utility/LoadingComponent';

import { MatchData } from '../../../types/datatypes';

/**
 * Shows the name, participants info, and dates of a match.
 */
class ParticipantMatchInfo extends MatchInfoComponent<LoadingComponentState<MatchData>> {
  
  protected get matchInfoTypeClass(){
    return "participant";
  }

  protected determineNewStateFromData(data: MatchData): LoadingComponentState<MatchData> {
    return {
      loading: this.state.loading,
      data: data
    }
  }

  protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialMatchData: MatchData): LoadingComponentState<MatchData>{
    return {
      loading: initialLoadingValue,
      data: initialMatchData
    }
  }
  
}

export default ParticipantMatchInfo
