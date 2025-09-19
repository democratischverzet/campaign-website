export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const url = 'https://app.loops.so/api/v1/contacts/properties'
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${config.loopsApiKey}` },
    body: undefined,
  }

  interface Coordinates {
    id: string
    latitude: number
    longitude: number
  }

  let coordinates: Coordinates[] = []

  interface Contact {
    id: string
    latitude: number
    longitude: number
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    console.log('Fetched contacts:', data)
    data.forEach((element: Contact) => {
      if (element.latitude && element.longitude) {
        coordinates.push({
          id: element.id,
          latitude: element.latitude,
          longitude: element.longitude,
        })
      }
    })
  } catch (error) {
    console.error(error)
  }

  return { coordinates }
})
