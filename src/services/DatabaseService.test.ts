/** @jest-environment node */
import { BloodSampleContainer } from 'react-canvas-draw'
import { GetBloodSampleContainers } from './DatabaseService'

describe.skip('DatabaseService', () => {
 
    it('should get a sample image', async () => {
        try {
            const images: BloodSampleContainer[] = await GetBloodSampleContainers('sample')
            expect(images.length).toBe(1)
        } catch (error) {
            console.log(error)
        }
    })
})