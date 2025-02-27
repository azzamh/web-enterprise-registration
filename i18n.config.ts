import { getLang } from '@privyid/persona/core'

export default defineI18nConfig(() => {
  return {
    locale         : getLang(),
    datetimeFormats: {
      en: {
        date: {
          year : 'numeric',
          month: 'short',
          day  : 'numeric',
        },
        time: {
          hour     : '2-digit',
          minute   : '2-digit',
          hourCycle: 'h23',
        },
        datetime: {
          year     : 'numeric',
          month    : 'short',
          day      : 'numeric',
          hour     : '2-digit',
          minute   : '2-digit',
          hourCycle: 'h23',
        },
        timestamp: {
          year     : 'numeric',
          month    : 'short',
          day      : 'numeric',
          hour     : '2-digit',
          minute   : '2-digit',
          second   : '2-digit',
          hourCycle: 'h23',
        },
      },
      id: {
        date: {
          year : 'numeric',
          month: 'short',
          day  : 'numeric',
        },
        time: {
          hour     : '2-digit',
          minute   : '2-digit',
          hourCycle: 'h23',
        },
        datetime: {
          year     : 'numeric',
          month    : 'short',
          day      : 'numeric',
          hour     : '2-digit',
          minute   : '2-digit',
          hourCycle: 'h23',
        },
        timestamp: {
          year     : 'numeric',
          month    : 'short',
          day      : 'numeric',
          hour     : '2-digit',
          minute   : '2-digit',
          second   : '2-digit',
          hourCycle: 'h23',
        },
      },
    },
    numberFormats: {
      en: {
        decimal : { style: 'decimal' },
        currency: {
          style                : 'currency',
          currency             : 'IDR',
          currencyDisplay      : 'code',
          notation             : 'standard',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        },
        percent: { style: 'percent', useGrouping: false },
      },
      id: {
        decimal : { style: 'decimal' },
        currency: {
          style                : 'currency',
          currency             : 'IDR',
          currencyDisplay      : 'symbol',
          notation             : 'standard',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        },
        percent: { style: 'percent', useGrouping: false },
      },
    },
  }
})
