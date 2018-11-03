import * as React from 'react';
import { IPickerItemProps } from './PickerItem.types';
import { IPersonaProps } from '../Persona/Persona.types';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { ISuggestionModel } from './Suggestions/SuggestionsController';
import { BaseAutoFill } from './AutoFill/BaseAutoFill';
import { ICalloutProps } from '../../Callout';

export interface IBasePicker<T> {
  /** Gets the current value of the input. */
  items: T[] | undefined;

  /** Sets focus to the focus zone. */
  focus: () => void;

  /** Set focus to the input */
  focusInput: () => void;
}

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IBasePickerProps<T> extends React.Props<any> {
  componentRef?: IRefObject<IBasePicker<T>>;

  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;
  /**
   * Function that specifies how an individual suggestion item will appear.
   */
  onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
  /**
   * A callback for what should happen when a person types text into the input.
   * Returns the already selected items so the resolver can filter them out.
   * If used in conjunction with resolveDelay this will ony kick off after the delay throttle.
   */
  onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  /**
   * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
   * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
   * Only until after the timer completes will onResolveSuggestions be called.
   */
  resolveDelay?: number;
  /**
   * A callback for what should happen when a user clicks the input.
   */
  onEmptyInputFocus?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  defaultSelectedItems?: T[];
  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;

  /**
   * A callback for when the user put focus on the picker
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;

  /**
   * A callback for when the user moves the focus away from the picker
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;

  /**
   * A callback to get text from an item. Used to autofill text in the pickers.
   */
  getTextFromItem?: (item: T, currentValue?: string) => string;
  /**
   * A callback that gets the rest of the results when a user clicks get more results.
   */
  onGetMoreResults?: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  /**
   * ClassName for the picker.
   */
  className?: string;
  /**
   * The properties that will get passed to the Suggestions component.
   */
  pickerSuggestionsProps?: IBasePickerSuggestionsProps;
  /**
   * The properties that will get passed to the Callout component.
   */
  pickerCalloutProps?: ICalloutProps;
  /**
   * AutoFill input native props
   * @defaultvalue undefined
   */
  inputProps?: IInputProps;
  /**
   * A callback for when a persona is removed from the suggestion list
   */
  onRemoveSuggestion?: (item: IPersonaProps) => void;
  /**
   * A function used to validate if raw text entered into the well can be added into the selected items list
   */
  onValidateInput?: (input: string) => ValidationState;
  /**
   * The text to display while searching for more results in a limited suggestions list
   */
  searchingText?: ((props: { input: string }) => string) | string;
  /**
   * Flag for disabling the picker.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Restrict the amount of selectable items.
   * @defaultvalue undefined
   */
  itemLimit?: number;
  /**
   * Function that specifies how arbitrary text entered into the well is handled.
   */
  createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T> | T;
  /**
   * Aria label for the "X" button in the selected item component.
   * @defaultvalue ''
   */
  removeButtonAriaLabel?: string;
  /**
   * A callback to process a selection after the user selects something from the picker. If the callback returns null,
   * the item will not be added to the picker.
   */
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T> | null;
  /**
   * The items that the base picker should currently display as selected.
   * If this is provided then the picker will act as a controlled component.
   */
  selectedItems?: T[];
  /**
   * A callback used to modify the input string.
   */
  onInputChange?: (input: string) => string;
  /**
   * A callback to override the default behavior of adding the selected suggestion on dismiss.
   */
  onDismiss?: (ev?: any, selectedItem?: T) => void;
  /**
   * Adds an additional alert for the currently selected suggestion. This prop should be set to true for IE11 and below, as it
   * enables proper screen reader behavior for each suggestion (since aria-activedescendant does not work with IE11).
   * It should not be set for modern browsers (Edge, Chrome).
   * @defaultvalue false
   */
  enableSelectedSuggestionAlert?: boolean;
}

export interface IBasePickerSuggestionsProps {
  /**
   * Function that specifies what to render when no results are found.
   */
  onRenderNoResultFound?: IRenderFunction<void>;
  /**
   * The text that should appear at the top of the suggestion box.
   */
  suggestionsHeaderText?: string;
  /**
   * The text that should appear at the top of the most recently used box.
   */
  mostRecentlyUsedHeaderText?: string;
  /**
   * the text that should appear when no results are returned.
   */
  noResultsFoundText?: string;
  /**
   * Suggestions root className.
   */
  className?: string;
  /**
   * Suggestions List className.
   */
  suggestionsClassName?: string;
  /**
   * ClassName for suggestion items.
   */
  suggestionsItemClassName?: string;
  /**
   * The text that should appear on the button to search for more.
   */
  searchForMoreText?: string;
  /**
   * The text that appears indicating to the use to force resolve the input
   */
  forceResolveText?: string;
  /**
   * The text to display while the results are loading.
   */
  loadingText?: string;
  /**
   * The text to display while searching for more results in a limited sugesstions list.
   */
  searchingText?: string;
  /**
   * A renderer that adds an element at the end of the suggestions list it has more items than resultsMaximumNumber.
   */
  resultsFooterFull?: () => JSX.Element;
  /**
   * A renderer that adds an element at the end of the suggestions list when there are fewer than resultsMaximumNumber.
   */
  resultsFooter?: () => JSX.Element;
  /**
   * Maximum number of suggestions to show in the full suggestion list.
   */
  resultsMaximumNumber?: number;
  /**
   * Indicates whether to show a button with each suggestion to remove that suggestion.
   */
  showRemoveButtons?: boolean;
  /**
   * Screen reader message to read when there are suggestions available.
   */
  suggestionsAvailableAlertText?: string;
  /**
   * An ARIA label for the container that is the parent of the suggestions.
   */
  suggestionsContainerAriaLabel?: string;
}

export enum ValidationState {
  valid,
  warning,
  invalid
}

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Screen reader label to apply to an input element.
   */
  'aria-label'?: string;
  /**
   * The default value to be visible when the autofill first created.
   * This is different than placeholder text because the placeholder text will disappear and re-appear. This
   * text persists until deleted or changed.
   */
  defaultVisibleValue?: string;
}