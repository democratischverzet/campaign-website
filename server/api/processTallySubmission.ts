export default defineEventHandler(async (event) => {
  interface TallyField {
    key: string
    label: string
    type: string
    value: string | string[]
    options?: Array<{
      id: string
      text: string
    }>
  }

  interface TallyFormResponse {
    responseId: string
    submissionId: string
    respondentId: string
    formId: string
    formName: string
    createdAt: string
    fields: TallyField[]
  }

  interface TallyWebhookEvent {
    eventId: string
    eventType: string
    createdAt: string
    data: TallyFormResponse
  }

  // Get the webhook payload
  const body = (await readBody(event)) as TallyWebhookEvent

  let trackEvent: 'Interest' | 'Petition' | null = null

  if (body.data.formName.includes('Interest')) trackEvent = 'Interest'
  if (body.data.formName.includes('Petition')) trackEvent = 'Petition'

  // Find the optin field and determine if user opted in
  const optinField = body.data.fields.find((field) => field.label === 'optin')
  let optinValue = false

  if (optinField && Array.isArray(optinField.value) && optinField.options) {
    // Find the selected option and check if it's the "Yes" option
    const selectedOptionId = optinField.value[0]
    const selectedOption = optinField.options.find(
      (option) => option.id === selectedOptionId
    )
    optinValue = selectedOption?.text.includes('Ja') || false
  }

  const signupBody = {
    eventName: trackEvent,
    eventProperties: {},
    contact: {
      email:
        (body.data.fields.find((field) => field.label === 'E-mail adres')
          ?.value as string) || '',
      firstName:
        (body.data.fields.find((field) => field.label === 'Voornaam')
          ?.value as string) || '',
      phoneNumber:
        (body.data.fields.find((field) => field.label === 'Telefoonnummer')
          ?.value as string) || '',
      postcode:
        (body.data.fields.find((field) => field.label === 'Postcode')
          ?.value as string) || '',
      houseNumber:
        (body.data.fields.find((field) => field.label === 'Huisnummer')
          ?.value as string) || '',
      optin: optinValue,
    },
  }

  // Call the signup api
  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body: signupBody,
    })

    return { success: true, message: 'Tally submission processed successfully' }
  } catch (error) {
    console.error('Error processing Tally submission:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process Tally submission',
    })
  }
})
