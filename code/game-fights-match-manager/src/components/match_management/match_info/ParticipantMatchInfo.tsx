import MatchInfoComponent from './MatchInfo'

import { LoadingComponentState } from '../../utility/LoadingComponent';

import { MatchData } from '../../../types/datatypes';

import './../../../style/MatchInfo.css'

/**
 * Shows the name, participants info, and dates of a match.
 */
class ParticipantMatchInfo extends MatchInfoComponent<LoadingComponentState<MatchData>> {

  protected determineInitialState(initialLoadingValue: boolean, initialMatchData: MatchData): LoadingComponentState<MatchData>{
    return new LoadingComponentState<MatchData>(initialLoadingValue, initialMatchData);
  }

  protected instantiateNewState(loading: boolean, data: MatchData): LoadingComponentState<MatchData> {
    return new LoadingComponentState<MatchData>(loading, data);
  }
  
}

export default ParticipantMatchInfo
