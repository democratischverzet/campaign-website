export default defineEventHandler(async (event) => {
  interface TallyField {
    key: string
    label: string
    type: string
    value: string
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

  const signupBody = {
    eventName: trackEvent,
    eventProperties: {},
    contact: {
      email:
        body.data.fields.find((field) => field.key === 'email')?.value || '',
      firstName:
        body.data.fields.find((field) => field.key === 'firstName')?.value ||
        '',
      phoneNumber:
        body.data.fields.find((field) => field.key === 'phoneNumber')?.value ||
        '',
      postcode:
        body.data.fields.find((field) => field.key === 'postcode')?.value || '',
      houseNumber:
        body.data.fields.find((field) => field.key === 'houseNumber')?.value ||
        '',
      optin:
        body.data.fields.find((field) => field.key === 'optin')?.value ===
        'Yes',
    },
  }

  // Call the signup api
  await $fetch('/api/signup', {
    method: 'POST',
    body: signupBody,
  })
})
