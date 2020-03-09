import { render, cleanup, waitForElement, fireEvent, act } from '@testing-library/react'

import NonConformitiesDetail from './index';
import renderApp from '../../helpers/tests/renderApp';

afterEach(cleanup);

describe('Testing non conformity details screen', () => {

    it("renders", async () => {
        const page = render(renderApp(NonConformitiesDetail, "/nonconformities/:id", "/nonconformities/1", { match: { params: { id: 1 } } }));
        expect(page).toMatchSnapshot();
    });

    it("loads nonconformity data", async () => {
        const { getByText } = render(renderApp(NonConformitiesDetail, "/nonconformities/:id", "/nonconformities/1", { match: { params: { id: 1 } } }));

        const id = await waitForElement(() => getByText('#1'))

        expect(id).toBeDefined();
    });

    it("submits new corrective action", async () => {
        const page = render(renderApp(NonConformitiesDetail, "/nonconformities/:id", "/nonconformities/1", { match: { params: { id: 1 } } }));

        const openDialog = await waitForElement(() => page.getByTestId('new-correctiveaction-open-dialog'));

        expect(openDialog).toBeDefined();

        act(() => {
            fireEvent.click(openDialog);
        });

        const whatInput = await waitForElement(() => page.getByTestId('new-correctiveaction-whatinput'));
        const howInput = await waitForElement(() => page.getByTestId('new-correctiveaction-howinput'));
        const whyInput = await waitForElement(() => page.getByTestId('new-correctiveaction-whyinput'));
        const whereInput = await waitForElement(() => page.getByTestId('new-correctiveaction-whereinput'));
        const untilInput = await waitForElement(() => page.getByTestId('new-correctiveaction-untilinput'));

        fireEvent.change(whatInput, { target: { value: 'O que' } });
        fireEvent.change(howInput, { target: { value: 'Como' } });
        fireEvent.change(whyInput, { target: { value: 'Porque' } });
        fireEvent.change(whereInput, { target: { value: 'Onde' } });
        fireEvent.change(untilInput, { target: { value: '2020-05-20' } });

        const submitButton = page.getByTestId('new-correctiveaction-submit');

        fireEvent.click(submitButton);

        // nonConformity do componente está vazio neste momento, verificar
        const snackbar = await waitForElement(() => page.getByText('Ação não pode ser criada. Tente novamente.'));

    });

});