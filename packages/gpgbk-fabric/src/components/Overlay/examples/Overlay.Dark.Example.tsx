import * as React from 'react';
import { IStyleFunction, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Overlay } from '../Overlay';
import { getStyles, IOverlayExampleStyles } from './Overlay.Example.styles';

export interface IOverlayDarkExampleProps {
  getStyles?: IStyleFunction<{}, IOverlayExampleStyles>;
}

export class OverlayDarkExample extends React.Component<
  {},
  {
    isOverlayVisible: boolean;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = { isOverlayVisible: false };
  }

  public render(): JSX.Element {
    const { isOverlayVisible } = this.state;
    const getClassNames = classNamesFunction<{}, IOverlayExampleStyles>();
    const classNames = getClassNames(getStyles, {});

    return (
      <div>
        <DefaultButton onClick={this._toggleOverlay} text="Show the overlay" />
        {isOverlayVisible && (
          <Overlay isDarkThemed={true} onClick={this._setVisibilityFalse}>
            <div className={classNames.root}>
              <p>I am content within the overlay.</p>
            </div>
          </Overlay>
        )}
      </div>
    );
  }

  private _setVisibilityFalse = (): void => {
    this.setState({ isOverlayVisible: false });
  };

  private _toggleOverlay = (): void => {
    this.setState({ isOverlayVisible: !this.state.isOverlayVisible });
  };
}