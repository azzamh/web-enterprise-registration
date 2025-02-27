import {
  onRequest,
  onResponseError,
  getCode,
  getMessage,
  isCancel,
  isAxiosError,
} from '@privyid/nuapi/core'
import { getLang } from '@privyid/persona/core'


function isNonFatalError (error: unknown): boolean {
  return isAxiosError(error)
    && error.config?.errorPage === false
}

export default defineNuxtPlugin((nuxtApp) => {

  onRequest((config) => {
    if (process.server) {
      if (config.baseURL) {
        config.baseURL = config.baseURL
          .replace('localhost', '127.0.0.1')
          .replace('0.0.0.0', '127.0.0.1')
      }

      if (config.headers && !config.headers['X-Requested-With'])
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }

    return config
  })

  /**
   * set additional or custom header
   */
  onRequest((config) => {

    /**
    * check available language header
    * and set language header
    */
    if (config.headers && !config.headers['Accept-Language'])
      config.headers['Accept-Language'] = getLang()

    return config
  })

  /**
   * check unauthorize error response
   * cause of invalid or expired token
   */
  onResponseError(async (error) => {
    const errorCodes = [403, 500]

    const resErrorCode    = getCode(error)
    const resErrorMessage = getMessage(error)

    // whitelist 403 err
    if (resErrorMessage === 'sdk.sentinel.error.workflow.signer.your_certificate_is_expired')
      throw error


    if (!isCancel(error) && (errorCodes.includes(resErrorCode) || resErrorCode >= 500) && !isNonFatalError(error))
      showError({ statusCode: resErrorCode, message: resErrorMessage })

    throw error
  })
})
