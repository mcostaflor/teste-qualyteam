import React from 'react';

import { render, cleanup } from '@testing-library/react'
import { SnackbarProvider } from 'notistack';

import NonConformitiesCreate from './index';

jest.mock('axios');

afterEach(cleanup);

describe('Testing new non conformity submit view', () => {

    it("renders", async () => {
        
        const page = render(<SnackbarProvider><NonConformitiesCreate /></SnackbarProvider>);
        expect(page).toMatchSnapshot();
    });

});