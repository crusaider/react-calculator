import React from 'react';
import DisplayContainerComponent from './Display/DisplayContainer.component';
import KeyboardContainerComponent from './Keyboard/KeyboardContainer.component';
import './Calculator.component.css';
import { AboutContainerComponent } from './About/AboutContainer.component';

const CalculatorComponent: React.FC = () => {
  return (
    <div className="CalculatorComponent">
      <h1>React Calculator</h1>
      <div>
        <div className="CalcBody">
          <div className="header">
            <img alt="HP Logo" src="hewlett-packard.svg" />
            <div>
              <span>57KX</span>
              <span>SCIENTIFIC EXTREME</span>
            </div>
          </div>
          <DisplayContainerComponent />
          <KeyboardContainerComponent />
        </div>
        <AboutContainerComponent />
      </div>
    </div>
  );
};

export default CalculatorComponent;
