export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const url = 'https://api.tally.so/forms/mDj995/submissions'
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${config.tallyApiKey}` },
    body: undefined,
  }

  let count = 0

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    count = data.totalNumberOfSubmissionsPerFilter.all
    console.log(data)
  } catch (error) {
    console.error(error)
  }

  return {
    count,
  }
})
