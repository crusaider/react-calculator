import { KeyCode } from '../../store/stack/actions';
import {
  KeyboardComponent,
  KeyboardComponentProps
} from './Keyboard.component';
import { connect } from 'react-redux';
import { keyClicked } from '../../store/stack/actions';

function mapDispatchToProps(dispatch: any): KeyboardComponentProps {
  return {
    onKeyClick: (key: KeyCode) => {
      dispatch(keyClicked(key));
    }
  };
}

const KeyboardContainerComponent: React.FC = connect(
  undefined,
  mapDispatchToProps
)(KeyboardComponent);

export default KeyboardContainerComponent;
