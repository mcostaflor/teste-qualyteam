import { render, cleanup, waitForElement, fireEvent, getByText } from '@testing-library/react'

import NonConformitiesCreate from './index';
import renderApp from '../../helpers/tests/renderApp';

afterEach(cleanup);

describe('Testing new non conformity submit view', () => {

    it("renders", async () => {
        const page = render(renderApp(NonConformitiesCreate, '/nonconformities/new', '/nonconformities/new'));
        expect(page).toMatchSnapshot();
    });

    it("loads departments", async () => {
        const { getByTestId } = render(renderApp(NonConformitiesCreate, '/nonconformities/new', '/nonconformities/new', {}));
        const checkbox = await waitForElement(
            () => getByTestId('new-nonconformity-checkbox-0')
        )
        expect(checkbox).toBeDefined();
    });

    it("sends the nonconformity data", async () => {

        const { getByTestId, getByText } = render(renderApp(NonConformitiesCreate, '/nonconformities/new', '/nonconformities/new'));
        const description = getByTestId('new-nonconformity-description');
        const ocurrenceDate = getByTestId('new-nonconformity-ocurrence-date');
        const checkbox = await waitForElement(
            () =>
                getByTestId('new-nonconformity-checkbox-0')
        )

        expect(checkbox).toBeDefined();

        const submitButton = getByTestId('new-nonconformity-submit')

        fireEvent.change(description, {
            target: { value: 'Teste' }
        });

        fireEvent.change(ocurrenceDate, {
            target: { value: '2020-05-05' }
        });

        fireEvent.click(checkbox, {
            target: { checked: true }
        });

        fireEvent.click(submitButton);

        const snackbar = await waitForElement(
            () => getByText('Não conformidade criada com sucesso')
        )

        expect(snackbar).toBeDefined();

        expect(history.location)

    });

});