import { MediaType, TestCheckboxItem, TestColumn } from './lib-cy-types';

export {};
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            /* Parent commands - Parent command are invoked by the cy object. They can chain child commands.
             * Usage: cy.getHeadline() */

            /**
             * Custom command to select Headline by h1 selector.
             * @type parent command
             * @example cy.getHeadline()
             */
            getHeadline(): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom command to select DOM element by data-qa attribute.
             * @type parent command
             * @example cy.dataQa('greeting')
             */
            getByDataQa(selector: string): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom command to set CSS Media.
             * @type parent command
             * @param media the selected media type 'print' | 'screen'
             * @example cy.dataQa('greeting')
             */
            setCSSMedia(media: MediaType): void;

            /* Child commands - Child commands can only be chained by other parent commands and can chain other child commands
             * Usage: cy.getHeadline().containsExactly(<value>)*/

            /**
             * Custom command to get the vertical position of ng-dropdown-panel.
             * @type child command
             * @param key the object key for the position to select. 'top' | 'bottom'.
             * @example cy.getDropdownPanelPosition()
             */
            getDropdownPanelPosition(key: keyof DOMRect): Cypress.Chainable<number>;

            /**
             * Custom command to test if the width of ng-dropdown-panel is wider than the given parent element.
             * @type child command
             * @param parentSelector the selector for the parent element
             * @example cy.checkDropDownPanelWidthRelativeToParentElement('.sidebar')
             */
            checkDropDownPanelWidthRelativeToParentElement(parentSelector: string): Cypress.Chainable<number>;

            /**
             * Custom command to test if the width of ng-dropdown-panel is wider than the given parent element.
             * @type child command
             * @param parentSelector the selector for the parent element
             * @example cy.checkDropDownPanelWidthRelativeToParentElement('.sidebar')
             */
            checkFileUpload(fileType: string, mimetype: string, inputId: string): void;

            /* Child commands - Child commands can only be chained by other parent commands and can chain other child commands
             * Usage: cy.getHeadline().containsExactly(<value>)*/
            /**
             * Custom child command which returns the result item of a multiselect result list.
             * @type child command
             * @param multiSelectIndex the index of the multiselect field in container
             * @param ngResultItemsIdx the index for the specific result item
             * @example cy.get('dui-field-multiselect').getMultiSelectResultItem(1, 1)
             */
            getMultiSelectResultItem(multiSelectIndex: number, ngResultItemsIdx: number): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom child command which clicks on a multiselect option and checks if option is selected
             * @type child command
             * @param multiSelectIndex the index of the multiselect field in container
             * @param ngOptionItemsIndecies an array of indecies for selects to check (will be clicked and checked if selected)
             * @param minLength the min length of selects in the field
             * @param maxLength the max length of selects in the field
             * @example cy.get('dui-field-multiselect').openMultiSelectClickOptionAtIndexAndCheckResult(testField)
             */
            openMultiSelectClickOptionAtIndexAndCheckResult(
                multiSelectIndex: number,
                ngOptionItemsIndecies: number[],
                minLength: number,
                maxLength?: number,
            ): void;


            /** Checks a column at an index or a relative position.
             * @type child command
             * @param column the expected column params to test.
             * @param rowIndex the expected row index  in the table to test.
             * @example
             * if you want to test the relative position, the given index must be from type string in the following convention:
             * <after | before>:<specific column name>:<relative column distance as string> or <length - distance>
             * for a simple index it must be from type number. The colons between the values are mandatory.
             * Head over to description for the method checkHeaderColumnPositionAndValueRelativeToIndex() for more information.
             * @example cy.get('table').checkColumnValues(<testColumnObject>)
             * */
            checkColumnValues(column: TestColumn, rowIndex: number): void;

            /**
             * Checks column Position relative to a given Index
             * @type child command
             * @param columnName the columns header
             * @param indexAsString a description of the relative Position
             * @param columnValue the expected column value
             * @example
             * if you want to test the relative position to the right end for example second to the last:  'length-2'
             *
             * if you want to test the relative position of the column to a specific column:
             * <after | before>:<specific column name>:<relative column distance as string>
             * 'after:TUI Ref. Nr.:2''
             *
             * @example cy.get('table').checkHeaderColumnPositionAndValueRelativeToIndex('foo', 'after:TUI Ref. Nr.:2'', 'bar')
             * */
            checkHeaderColumnPositionAndValueRelativeToIndex(columnName: string, indexAsString: string, columnValue: string): void;

            /**
             * Custom child command which checks a columns value in a table.
             * @type child command
             * @param columnIndex the index of the column
             * @param value the expected column value
             * @param rowNumber the row number where to find the column
             * @example cy.get('table tr').checkColumnAtIndexInRowWithNumber(1, 'foo', 1)
             */
            checkColumnValueAtIndexInRowWithNumber(columnIndex: number, value: string, rowNumber: number): void;

            /**
             * Custom child command which checks a columns value at the index.
             * @type child command
             * @param columnIndex the index of the column
             * @param value the expected column value
             * @example cy.get('thead th').checkHeaderColumnAtIndex(1, 'foo')
             */
            checkHeaderColumnAtIndex(columnIndex: number, value: string): void;

            /**
             * Custom child command which returns the result item of a multiselect result list.
             * @type child command
             * @param multiSelectIndex the index of the multiselect field in container
             * @param ngResultItemsIdx the index for the specific result item
             * @example cy.get('dui-field-multiselect').getMultiSelectResultItem(1, 1)
             */
            getMultiSelectResultItem(multiSelectIndex: number, ngResultItemsIdx: number): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom child command which clicks on a multiselect option and checks if option is selected
             * and the result matches the value.
             * @type child command
             * @param multiSelectIndex the index of the multiselect field in container
             * @param ngOptionItemsIndecies an array of indecies for selects to check (will be clicked and checked if selected)
             * @param minLength the min length of selects in the field
             * @param maxLength the max length of selects in the field
             * @example cy.get('dui-field-multiselect').openMultiSelectClickOptionAtIndexAndCheckResult(testField)
             */
            openMultiSelectClickOptionAtIndexAndCheckResult(
                multiSelectIndex: number,
                ngOptionItemsIndecies: number[],
                minLength: number,
                maxLength?: number,
            ): void;

            /**
             * Custom command to get the vertical position of ng-dropdown-panel.
             * @type child command
             * @example cy.getVerticalDropdownPanelPosition()
             */
            getVerticalDropdownPanelPosition(): Cypress.Chainable<number>;

            /**
             * Custom command to get the vertical position of ng-dropdown-panel.
             * @type child command
             * @param key the object key for the position to select. 'top' | 'bottom'.
             * @example cy.getDropdownPanelPosition()
             */
            getDropdownPanelPosition(key: keyof DOMRect): Cypress.Chainable<number>;

            /**
             * Custom command to test if the width of ng-dropdown-panel is wider than the given parent element.
             * @type child command
             * @param parentSelector the selector for the parent element
             * @example cy.checkDropDownPanelWidthRelativeToParentElement('.sidebar')
             */
            checkDropDownPanelWidthRelativeToParentElement(parentSelector: string): Cypress.Chainable<number>;

            /**
             * Custom command to check a checkbox Item weather it exist and is selected.
             * @type child command
             * @param item the testCheckbox item to test
             * @example cy.get(<elementSelector>).checkCheckboxItem(item)
             */
            checkCheckboxItem(item: TestCheckboxItem): void;

            /**
             * Custom command to .
             * @type child command
             * @example cy.get(<elementSelector>).checkCheckboxItem(item)
             */
            checkIsInViewPort(): Cypress.Chainable<void>;


            /* Parent commands - Parent command are invoked by the cy object. They can chain child commands.
 * Usage: cy.getHeadline() */

            /**
             * Custom command to select Headline by h1 selector.
             * @type parent command
             * @example cy.getHeadline()
             */
            getHeadline(): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom command to select DOM element by data-qa attribute.
             * @type parent command
             * @example cy.dataQa('greeting')
             */
            getByDataQa(selector: string): Cypress.Chainable<JQuery<HTMLElement>>;
            /**
             * Custom command to get the vertical position of ng-dropdown-panel.
             * @type child command
             * @param key the object key for the position to select. 'top' | 'bottom'.
             * @example cy.getDropdownPanelPosition()
             */
            getDropdownPanelPosition(key: keyof DOMRect): Cypress.Chainable<number>;

            /**
             * Custom command to test if the width of ng-dropdown-panel is wider than the given parent element.
             * @type child command
             * @param parentSelector the selector for the parent element
             * @example cy.checkDropDownPanelWidthRelativeToParentElement('.sidebar')
             */
            checkDropDownPanelWidthRelativeToParentElement(parentSelector: string): Cypress.Chainable<number>;

            /* Child commands - Child commands can only be chained by other parent commands and can chain other child commands
             * Usage: cy.getHeadline().containsExactly(<value>)*/
            /**
             * Custom child command which returns the result item of a multiselect result list.
             * @type child command
             * @param multiSelectIndex the index of the multiselect field in container
             * @param ngResultItemsIdx the index for the specific result item
             * @example cy.get('dui-field-multiselect').getMultiSelectResultItem(1, 1)
             */
            getMultiSelectResultItem(multiSelectIndex: number, ngResultItemsIdx: number): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom child command which clicks on a multiselect option and checks if option is selected
             * @type child command
             * @param multiSelectIndex the index of the multiselect field in container
             * @param ngOptionItemsIndecies an array of indecies for selects to check (will be clicked and checked if selected)
             * @param minLength the min length of selects in the field
             * @param maxLength the max length of selects in the field
             * @example cy.get('dui-field-multiselect').openMultiSelectClickOptionAtIndexAndCheckResult(testField)
             */
            openMultiSelectClickOptionAtIndexAndCheckResult(
                multiSelectIndex: number,
                ngOptionItemsIndecies: number[],
                minLength: number,
                maxLength?: number,
            ): void;

            /**
             * Custom child command which checks the relative Position of the ng-dropdown-panel to the upper to another element.
             * The Element should be right above the dropdown panel in GUI.
             * @type child command
             * @param panelPosition the object key for the position to select. 'top' | 'bottom'.
             * @param elementPosition the object key for the position to select. 'top' | 'bottom'.
             * @param tollerance the gap between both elements in px
             * @example cy.get('dui-field-multiselect')
             * .checkVerticalRelativePositionOfDropDownPanelToElement('top', 'bottom', 10)
             */
            checkVerticalRelativePositionOfDropDownPanelToElement(
                panelPosition: keyof DOMRect,
                elementPosition: keyof DOMRect,
                tollerance: number,
            ): Cypress.Chainable<number>;

            /**
             * Custom child command which returns the remove Icon from an multiselect item within the result set.
             * This command can be used with the click() command to remove an multiselect item from the result set.
             * @type child command
             * @param resultItemIndex the index of the multiselect item in the result set.
             * @example cy.get('dui-field-multiselect').getRemoveIconForResultItem.click(); -> Item will be removed
             */
            getRemoveIconForResultItem(resultItemIndex: number): Cypress.Chainable<JQuery<HTMLElement>>;

            /**
             * Custom child command which checks an element text if it matches the exact value.
             * ###Please be aware of
             * * Child commands can only be chained by other parent commands.
             * * This is only an example command which should show how to use child commands.
             * * cy.get(<element>).should('have.text') is doing exactly the same,
             * this is why this command is obsolete and can be removed in the future.
             * @type child command
             * @param pattern the pattern to check for,
             * @example cy.getHeadline().containsExactly('greeting')
             */
            containsExactly(pattern: string): Cypress.Chainable<void>;
        }
    }
}
