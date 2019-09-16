/**
 * Chart Test API
 * 
 * @version 0.0.1
 */
const analyticsApi = {
    url: `http://localhost:3000/data/index.json`,

    /**
     * 
     * Method to retrieve analytics data
     * 
     * @returns {Object} - With analytics
     * 
     */

    retrieveData() {
        return (async () => {
            const response = await fetch(`${this.url}`)

            if (response.status !== 200)
            {
                throw Error('could not retrieve data :(')   //Error Handling
            }

            const data = await response.json()

            return data
        })()
    }
}

export default analyticsApi