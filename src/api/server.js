const { summaryScreenMock } = require('../redux/mocks');
const { rest, setupWorker } = require('msw');

const ARTIFICIAL_DELAY_MS = 2000;

export const handlers = [
  rest.get('/fakeAPI/subscriptions', function (req, res, ctx) {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(summaryScreenMock));
  }),
];

export const worker = setupWorker(...handlers);
