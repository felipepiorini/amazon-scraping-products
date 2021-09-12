const controller = require('./controller');

jest.setTimeout(60000);

describe('Amazon scrape products data tests', () => {

    test('check if the parameters were entered correctly', async () => {
        const search = null;
        const pages = 1;
        const data = await controller.getDataSiteContent(search, pages)
        expect(data).toEqual('Inform the parameters');
    });

    test('check if the data return correctly', async () => {
        const search = 'headphone';
        const pages = 1;
        const data = await controller.getDataSiteContent(search, pages)

        const expected = {
            title: expect.any(String),
            link: expect.any(String),
            image: expect.any(String),
            isSponsored: expect.any(Boolean),
            price: expect.any(String),
            previousPrice: expect.anything(),
            rating: expect.any(String),
            numberOfReviews: expect.any(String),
            resultPosition: expect.any(Number),
        };

        expect(data).toMatchObject([expected]);
    });

});