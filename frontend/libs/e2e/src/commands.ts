/*
 * parent commands can chain child commands */
import { TestCheckboxItem, TestColumn } from './lib-cy-types';
Cypress.Commands.add('checkFileUpload',
        { prevSubject: 'element' },
        (subject: JQuery<HTMLElement>,
          fileType: string, mimetype: string, inputId: string): void => {
        cy.wrap(subject).within(() => {
        cy.get('input[type=file]').invoke('show').selectFile({
            contents: Cypress.Buffer.from('file contents'),
            fileName: `file.${ fileType }`,
            mimeType: mimetype,
            lastModified: Date.now(),
        }, {force: true})
        cy.getByDataQa('file-text').should('contain.text', `file.${ fileType }`);

        /*
        * We have to check that for seperate signed Urls are provided from the different filehandler instances and we check that
          each  signed url matches the handler id. This is implemented here
        * */

        /* give the file handler one specific Id. The mocked server will pass back one matching secure id */

        cy.get('input[type=file]').then((el) => {
            /* set a new static ipput id to match the test secure id */
            el[0].setAttribute('id', inputId || '');
        });
    })
})
Cypress.Commands.add('getByDataQa', (selector: string) => cy.get(`[data-qa="${selector}"]`));
Cypress.Commands.add('getVerticalDropdownPanelPosition', (): Cypress.Chainable<number> => {
    return cy.get('ng-dropdown-panel').then(element => {
        const valueAsString =
            element[0].attributes
                .getNamedItem('style')
                ?.nodeValue?.split(';')
                .filter(i => i.includes('top'))[0]
                .split(':')[1]
                .split('p')[0] ?? '';
        return +valueAsString;
    });
});
Cypress.Commands.add('setCSSMedia', media => {
    cy.log(`Setting CSS media to ${media}`);
    Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: {
            media,
        },
    });
});
/*
 * child commands can be chained by parent commands and can chain other child commands
 * @Example: cy.getHeadline().exactly() */

Cypress.Commands.add(
    'checkColumnValueAtIndexInRowWithNumber',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, columnIndex: number, value: string, rowNumber?: number): void => {
        cy.wrap(subject)
            .get('tr')
            .eq(rowNumber ?? 1)
            .within(() => cy.get('td').checkHeaderColumnAtIndex(columnIndex, value));
    },
);

Cypress.Commands.add(
    'checkHeaderColumnAtIndex',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, columnIndex: number, value: string): void => {
        cy.wrap(subject).eq(columnIndex).should('contain.text', value);
    },
);

Cypress.Commands.add(
    'checkColumnValues',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, column: TestColumn, rowIndex: number): void => {
        if (typeof column.index === 'string') {
            cy.wrap(subject).checkHeaderColumnPositionAndValueRelativeToIndex(column.name, column.index as string, column.value);
        }
        if (typeof column.index === 'number') {
            cy.wrap(subject).checkColumnValueAtIndexInRowWithNumber(+column.index, column.value, rowIndex);
        }
    },
);
Cypress.Commands.add(
    'checkHeaderColumnPositionAndValueRelativeToIndex',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, columnName: string, indexAsString: string, columnValue: string): void => {
        if (indexAsString.includes(':')) {
            cy.wrap(subject)
                .get('thead th')
                .each((res, index) => {
                    let columnIndex = 0;
                    const [direction, name, distance] = indexAsString.split(':');
                    if (name === res.text()) {
                        columnIndex = direction === 'after' ? index + +distance : index - +distance;
                        cy.wrap(res).get('thead th').checkHeaderColumnAtIndex(columnIndex, columnName);
                        cy.wrap(res).checkColumnValueAtIndexInRowWithNumber(columnIndex, columnValue, 1);
                    }
                });
            return;
        }
        if (indexAsString.includes('-')) {
            cy.wrap(subject)
                .get('thead th')
                .its('length')
                .then((length: number) => {
                    const columnIndex = length - +indexAsString.split('-')[1];
                    cy.wrap(subject).get('thead th').checkHeaderColumnAtIndex(columnIndex, columnName);
                    cy.wrap(subject).checkColumnValueAtIndexInRowWithNumber(columnIndex, columnValue, 1);
                });
            return;
        }
        throw `This child command is only for relative Position Checks.
        If you want to check a simple Index please use child command "checkColumnAtIndex()" instead
        and make sure that your given index is of type number.`;
    },
);

Cypress.Commands.add(
    'openMultiSelectClickOptionAtIndexAndCheckResult',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, multiSelectIndex: number, ngOptionItemsIdx: number[], minLength: number, maxLength?: number): void => {
        cy.wrap(subject)
            .eq(multiSelectIndex)
            .click()
            .then(() => {
                if (minLength) {
                    cy.get('.ng-dropdown-panel-items .ng-option').should('have.length.gt', minLength);
                }
                if (maxLength) {
                    cy.get('.ng-dropdown-panel-items .ng-option').should('have.length.lt', maxLength);
                }
                ngOptionItemsIdx.forEach(index => {
                    cy.get('.ng-dropdown-panel-items .ng-option').eq(index).click().should('have.attr', 'aria-selected');
                });
            });
    },
);

Cypress.Commands.add(
    'getMultiSelectResultItem',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, multiSelectIndex: number, ngResultItemsIdx: number): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.wrap(subject).eq(multiSelectIndex).get('.ng-value').eq(ngResultItemsIdx);
    },
);

Cypress.Commands.add('containsExactly', { prevSubject: 'element' }, (subject: JQuery<HTMLElement>, pattern: string) => {
    cy.wrap(subject).contains(new RegExp(`^ *${pattern} *$`));
});

Cypress.Commands.add('checkCheckboxItem', { prevSubject: 'element' }, (subject: JQuery<HTMLElement>, item: TestCheckboxItem): void => {
    cy.wrap(subject)
        .eq(item.index)
        .should(res => expect(res.attr('ng-reflect-model')).eq(item.shouldBeChecked.toString()))
        .contains(item.value);
});

Cypress.Commands.add('checkIsInViewPort', { prevSubject: 'element' }, (subject: JQuery<HTMLElement>): void => {
    cy.wrap(subject).then((element: JQuery<HTMLElement>): void => {
        const rect = element[0]?.getBoundingClientRect();
        const document = element?.closest('html');
        const documentHeight = document.height() || 0;
        if (documentHeight && documentHeight > 0) {
            expect(rect.top < documentHeight);
        }
    });
});


/**
 * parent commands can chain child commands */
Cypress.Commands.add('getHeadline', () => cy.get(`[data-qa="headline"]`));
Cypress.Commands.add('getByDataQa', (selector: string) => cy.get(`[data-qa="${selector}"]`));
Cypress.Commands.add('getDropdownPanelPosition', (key: keyof DOMRect): Cypress.Chainable<number> => {
    return cy.get('ng-dropdown-panel').then(element => {
        const rect = JSON.stringify(element[0].getBoundingClientRect());
        console.log(key, JSON.parse(rect)[key]);
        if (rect) {
            return JSON.parse(rect)[key];
        }
        const valueAsString = element[0].attributes
        .getNamedItem('style')
        ?.nodeValue?.split(';')
        .filter(i => {
            if (typeof key === 'string') {
                return i.includes(key);
            }
            return undefined;
        })[0];
        if (valueAsString) {
            valueAsString.split(':')[1].split('p')[0] ?? '';
            return +valueAsString;
        }
        throw 'Error! Can not find any specs.';
    });
});

/*
 * child commands can be chained by parent commands and can chain other child commands
 * @Example: cy.getHeadline().exactly() */

Cypress.Commands.add(
    'openMultiSelectClickOptionAtIndexAndCheckResult',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, multiSelectIndex: number, ngOptionItemsIdx: number[], minLength: number, maxLength?: number): void => {
        cy.wrap(subject)
        .eq(multiSelectIndex)
        .click()
        .then(() => {
            if (minLength) {
                cy.get('.ng-dropdown-panel-items .ng-option').should('have.length.gt', minLength);
            }
            if (maxLength) {
                cy.get('.ng-dropdown-panel-items .ng-option').should('have.length.lt', maxLength);
            }
            ngOptionItemsIdx.forEach(index => {
                cy.get('.ng-dropdown-panel-items .ng-option').eq(index).click().should('have.attr', 'aria-selected');
            });
        });
    },
);

Cypress.Commands.add(
    'getMultiSelectResultItem',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, multiSelectIndex: number, ngResultItemsIdx: number): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.wrap(subject).eq(multiSelectIndex).get('.ng-value').eq(ngResultItemsIdx);
    },
);

Cypress.Commands.add(
    'checkDropDownPanelWidthRelativeToParentElement',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, parentSelector: string): void => {
        cy.wrap(subject)
        .should('be.visible')
        .then(element => {
            const containerElement = element.closest('body').find(parentSelector);
            if (!containerElement) {
                throw 'Cannot find container. Please consider changing the test expectations';
            }
            expect(element[0].clientWidth).gt(containerElement[0].clientWidth);
        });
    },
);

Cypress.Commands.add(
    'getRemoveIconForResultItem',
    { prevSubject: 'element' },
    (subject: JQuery<HTMLElement>, resultItemIndex: number): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.wrap(subject).getMultiSelectResultItem(0, resultItemIndex).get('.result-entry').get('mpp-icon').eq(1);
    },
);
Cypress.Commands.add(
    'checkVerticalRelativePositionOfDropDownPanelToElement',
    { prevSubject: 'element' },
    // eslint-disable-next-line max-len
    (
        subject: JQuery<HTMLElement>,
        panelPosition: keyof DOMRect,
        elementPosition: keyof DOMRect,
        tollerance: number,
    ): Cypress.Chainable<number> => {
        const position = subject[0].getBoundingClientRect()[elementPosition];
        return cy.getDropdownPanelPosition(panelPosition).should('be.closeTo', +position, tollerance);
    },
);
Cypress.Commands.add('containsExactly', { prevSubject: 'element' }, (subject: JQuery<HTMLElement>, pattern: string) => {
    cy.wrap(subject).contains(new RegExp(`^ *${pattern} *$`));
});
