import { PostHog } from 'posthog-node'
import { LoopsClient } from 'loops'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  interface Body {
    eventName: 'Interest' | 'Petition' | null
    eventProperties: {
      [key: string]: string | number | boolean
    }
    contact: {
      email: string
      firstName: string
      phoneNumber: string
      postcode: string
      houseNumber: string
      optin: boolean
    }
  }

  const body: Body = await readBody(event)

  // Input validation
  if (!body.contact.email || !body.contact.email.includes('@')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid email is required',
    })
  }

  if (!body.contact.postcode || !body.contact.houseNumber) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Postcode and house number are required',
    })
  }

  async function getAdressFromPostcodeAndNumber(
    postcode: string,
    houseNumber: string
  ) {
    // Transform the house number to extract just the numeric part
    const cleanHouseNumber = houseNumber.match(/^\d+/)?.[0] || houseNumber

    const url = `https://postcode.tech/api/v1/postcode/full?postcode=${postcode}&number=${cleanHouseNumber}`
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${config.postcodeApiKey}` },
      body: undefined,
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        console.error(
          'Postcode API error:',
          response.status,
          response.statusText
        )
        return null
      }

      const data = await response.json()

      if (
        data.street &&
        data.city &&
        data.province &&
        data.geo?.latitude &&
        data.geo?.longitude
      ) {
        return {
          street: data.street,
          city: data.city,
          province: data.province,
          latitude: data.geo?.latitude,
          longitude: data.geo?.longitude,
        }
      } else return null
    } catch (error) {
      console.error('Error fetching address:', error)
      return null
    }
  }

  const completeAddress = await getAdressFromPostcodeAndNumber(
    body.contact.postcode,
    body.contact.houseNumber
  )

  const contactProperties = {
    ...body.contact,
    ...completeAddress,
  }

  // CONTACT

  try {
    // Store contact in Loops
    const loops = new LoopsClient(config.loopsApiKey)

    const mailingLists = {
      cmewv6u5y05eu0i2beb1t7hvp: true /* Subscribe */,
      cmewz4mcn04g00i49193f5wot: true /* Subscribe */,
    }

    let loopsProperties = {
      email: contactProperties.email,
      properties: contactProperties,
      mailingLists: {},
    }

    if (contactProperties.optin) {
      loopsProperties.mailingLists = mailingLists
    }

    await loops.updateContact(loopsProperties)

    // Store contact in PostHog
    const posthog = new PostHog(config.posthogApiKey, {
      host: 'https://eu.i.posthog.com',
    })

    posthog.capture({
      distinctId: contactProperties.email,
      event: '$set',
      properties: {
        $set: contactProperties,
      },
    })

    // EVENT
    if (body.eventName) {
      // Register event in Loops
      await loops.sendEvent({
        email: contactProperties.email,
        eventName: body.eventName,
        eventProperties: body.eventProperties,
      })

      // Register event in PostHog
      posthog.capture({
        distinctId: contactProperties.email,
        event: `Server - ${body.eventName}`,
        properties: body.eventProperties,
      })
    }

    await posthog.shutdown()

    // Return success response
    return { success: true, message: 'Contact processed successfully' }
  } catch (error) {
    console.error('Error processing signup:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process signup',
    })
  }
})
