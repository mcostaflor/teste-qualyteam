import { render, cleanup, waitForElement } from '@testing-library/react'

import NonConformities from './index';
import renderApp from '../../helpers/tests/renderApp';

afterEach(cleanup);

describe('Testing non conformities screen', () => {

    it("renders", async () => {
        const page = render(renderApp(NonConformities, "/nonconformities", "/nonconformities", {}));
        expect(page).toMatchSnapshot();
    });

    it("loads a nonConformity", async () => {
        const { getByText } = render(renderApp(NonConformities, "/nonconformities", "/nonconformities", {}));

        const id = await waitForElement(() => getByText('#1'));

        expect(id).toBeDefined();

    })

});