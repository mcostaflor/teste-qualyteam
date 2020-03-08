import { render, cleanup, waitForElement } from '@testing-library/react'

import NonConformitiesDetail from './index';
import renderApp from '../../helpers/tests/renderApp';

afterEach(cleanup);

describe('Testing non conformity details screen', () => {

    it("renders", async () => {
        const page = render(renderApp(NonConformitiesDetail, "/nonconformities/:id", "/nonconformities/1", {}));
        expect(page).toMatchSnapshot();
    });

    it("loads nonconformity data", async () => {
        const { getByText } = render(renderApp(NonConformitiesDetail, "/nonconformities/:id", "/nonconformities/1", { match: { params: { id: 1 } } }));

        const id = await waitForElement(() => getByText('#1'))

        expect(id).toBeDefined();
    })

});