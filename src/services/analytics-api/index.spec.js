import analyticsApi from '.'
import testData from '../../../data/index.json'

describe('api', () => {
    describe('analytics', () => {
        beforeEach(() => fetch.resetMocks())

        it('should succeed on retriving data', async () => {
            fetch.mockResponseOnce(JSON.stringify(testData))

            const response = await analyticsApi.retrieveData()

            expect(response).toHaveLength(3)

            response.forEach(analytic => {
                expect(analytic.title).toBeTruthy()
                expect(analytic.data).toBeTruthy()
            })
        })
    })
})
