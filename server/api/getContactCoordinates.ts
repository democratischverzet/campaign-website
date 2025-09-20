// To parse this data:
//
//   import { Convert, Data } from "./file";
//
//   const data = Convert.toData(json);

export interface Data {
  cache_key: string
  cache_target_age: Date
  calculation_trigger: null
  clickhouse: string
  columns: string[]
  error: null
  explain: null
  hasMore: boolean
  hogql: string
  is_cached: boolean
  last_refresh: Date
  limit: number
  metadata: null
  modifiers: Modifiers
  next_allowed_client_refresh: Date
  offset: number
  query: null
  query_metadata: QueryMetadata
  query_status: null
  resolved_date_range: null
  results: Array<Array<number | null | string>>
  timezone: string
  timings: null
  types: Array<string[]>
}

export interface Modifiers {
  bounceRateDurationSeconds: null
  bounceRatePageViewMode: string
  convertToProjectTimezone: boolean
  customChannelTypeRules: null
  dataWarehouseEventsModifiers: null
  debug: null
  formatCsvAllowDoubleQuotes: null
  inCohortVia: string
  materializationMode: string
  optimizeJoinedFilters: boolean
  personsArgMaxVersion: string
  personsJoinMode: null
  personsOnEventsMode: string
  propertyGroupsMode: string
  s3TableUseInvalidColumns: null
  sessionTableVersion: string
  sessionsV2JoinMode: string
  timings: null
  useMaterializedViews: boolean
  usePreaggregatedTableTransforms: null
  usePresortedEventsTable: boolean
  useWebAnalyticsPreAggregatedTables: null
}

export interface QueryMetadata {
  events: any[]
  updated_at: Date
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const url = 'https://eu.posthog.com/api/projects/82272/query/'

  const payload = {
    query: {
      kind: 'HogQLQuery',
      query: `SELECT properties.city, properties.latitude, properties.longitude, properties.$geoip_latitude, properties.$geoip_longitude, created_at >= now() - INTERVAL 7 DAY AS added_last_7_days FROM persons`,
    },
    name: 'get people coordinates',
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.posthogPrivateKey}`,
  }

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }

  interface Coordinates {
    city: string | null
    latitude: number
    longitude: number
    new: boolean
  }

  let coordinates: Coordinates[] = []

  try {
    const response = await fetch(url, options)
    const data = (await response.json()) as Data

    coordinates = data.results
      .map((item) => {
        let latitude = item[1] as number | null
        let longitude = item[2] as number | null

        // Fallback to geoip properties if latitude or longitude is null
        if (latitude === null) {
          latitude = item[3] as number | null
        }
        if (longitude === null) {
          longitude = item[4] as number | null
        }

        // Round for privacy protection
        if (latitude !== null) {
          // ~2 km precision
          latitude = Math.round(latitude * 52) / 52

          // Random offset of ~500m
          const offset = (Math.random() - 0.5) / 52
          latitude += offset
        }
        if (longitude !== null) {
          // ~2 km precision in the Netherlands
          longitude = Math.round(longitude * 34) / 34

          // Random offset of ~500m
          const offset = (Math.random() - 0.5) / 34
          longitude += offset
        }

        const isNew: boolean = Boolean(item[5]) || false

        return {
          city: item[0],
          latitude: latitude,
          longitude: longitude,
          new: isNew,
        }
      })
      .filter(
        (item): item is Coordinates =>
          item.latitude !== null && item.longitude !== null
      )

    return {
      coordinates,
      newCount: coordinates.filter((coord) => coord.new).length,
    }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get contact coordinates',
    })
  }
})
