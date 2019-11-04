import { connect } from 'react-redux';
import {
  AboutComponent,
  AboutComponentOutputProps,
  AboutComponentInputProps
} from './About.component';
import { toggleAbout } from '../../store/about/actions';
import { AppState } from '../../store';

function mapDispatchToProps(dispatch: any): AboutComponentOutputProps {
  return {
    onToggleAbout: () => {
      dispatch(toggleAbout());
    }
  };
}

function mapStateToProps(state: AppState): AboutComponentInputProps {
  const res = { show: state.about.show };
  return res;
}

export const AboutContainerComponent: React.FC = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutComponent);
