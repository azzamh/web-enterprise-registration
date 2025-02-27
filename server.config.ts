/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { defineEventInterceptor, defineServer } from '@privyid/nhp/core'
import { getQuery, type H3Event } from 'h3'
import { joinURL } from 'ufo'
import { env } from 'std-env'
import { v4 as uuidv4 } from 'uuid'

/**
 * Ensure have Meta Header
 * @param proxyEvent
 * @param event
 */
function ensureMetaHeader (proxyEvent: H3Event, event: H3Event) {
  if (!getHeader(event, 'X-Platform-Name'))
    setHeader(proxyEvent, 'X-Platform-Name', env.APP_PLATFORM_NAME || env.PLATFORM_NAME || '')

  if (!getHeader(event, 'X-Platform-Type'))
    setHeader(proxyEvent, 'X-Platform-Type', env.APP_PLATFORM_TYPE || env.PLATFORM_TYPE || '')

  if (!getHeader(event, 'X-Application-Name'))
    setHeader(proxyEvent, 'X-Application-Name', env.APP_NAME || '')

  if (!getHeader(event, 'X-Application-Version'))
    setHeader(proxyEvent, 'X-Application-Version', env.APP_VERSION || env.BUILD_VERSION || '1.0.0')

  setHeader(proxyEvent, 'X-Request-ID', uuidv4())
}


export default defineServer([
  {
    name      : 'streamer-carstensz',
    baseUrl   : '/api/public',
    targetUrl : joinURL(process.env.API_CARSTENSZ_GATEWAY ?? '', '/'),
    onProxyReq: defineEventInterceptor((proxyEvent, event) => {
      ensureMetaHeader(proxyEvent, event)
    }),
  },
  {
    name     : 'oauth',
    baseUrl  : '/api/oauth',
    targetUrl: process.env.OAUTH_HOST,
  },
  {
    name     : 'privypass-manage',
    baseUrl  : '/api/privypass-manage',
    targetUrl: process.env.API_PRIVYPASS_MANAGE,
  },
  {
    name     : 'branch-io',
    baseUrl  : '/api/branch-io',
    targetUrl: process.env.API_BRANCH_IO ?? 'https://api2.branch.io',
  },
  {
    name      : 'api',
    baseUrl   : '/api',
    targetUrl : process.env.API_CARSTENSZ_URL,
    onProxyReq: defineEventInterceptor((proxyEvent, event) => {
    }),
  },
])
