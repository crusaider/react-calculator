import { AppState } from '../../store';
import { connect } from 'react-redux';
import { DisplayComponent, DisplayComponentProps } from './Display.component';

function mapStateToProps(state: AppState): DisplayComponentProps {
  const res = { elements: state.stack.elements };
  return res;
}

const DisplayContainerComponent: React.FC = connect(mapStateToProps)(
  DisplayComponent
);

export default DisplayContainerComponent;
