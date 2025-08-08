const components = {
  datePicker: {
    invokeCalendar: 'qa_datepicker-inner',
    getDateCellId: (date: string) => `qa_calendar-day-${date}`
  },
  dropdowns: {
    cities: {
      parent: 'qa_city-picker-name', //should be 'qa_open-cities-list' but is intercepted by another element
      options: 'qa_cities-list',
      getCityNameId: (cityName: string) => `qa_city-${cityName}`
    }
  },
  cookies: {
    acceptAllBtn: 'uc-accept-all-button'
  }
};

const pages = {
  home: {
    searchButton: 'qa_search-button'
  },
  property: {
    suiteTitle: 'suite__title',
    suiteAddress: 'suite__address',
    suitesCells: 'qa-pdp-suite',
    suites: {
      selectBtn: 'qa-pdp-select-suite-btn',
      changeDateBtn: 'qa-pdp-select-suite-btn' //yes its the same as then select button
    },
    cart: {
      guestInfo: 'qa-pdp-cart-guests-info'
    }
  },
  cart: {
    addModal: 'qa-add-room-modal',
    detailsModal: 'qa-cart-details-modal',
    removeUnitBtn: 'qa-remove-from-cart',
    hackCartSummarySuiteTitle: '.flex.space-x-4.items-center.mt-4'
  },
  checkout: {
    cartTotal: 'qa_checkout_price_total_amount',
    buttons: {
      gotoRatesBtn: 'qa-checkout-go-to-rates',
      nextToPaymentStepBtn: 'qa_continue_to_next_step',
      confirmAndPayBtn: 'qa-checkout-payment-button'
    },
    forms: {
      voucher: {
        voucherField: 'qa-checkout-preferred-rate-voucher-code'
      },
      userDetailsFields: {
        guestFirstName: 'checkout-guest-info-first-name',
        lastName: 'checkout-guest-info-last-name',
        email: 'checkout-guest-info-email',
        phoneNumber: 'checkout-guest-info-telephone',
        password: 'checkout-signup-create-password',
        street: 'checkout-guest-info-street-address',
        postCode: 'checkout-guest-info-postal-code',
        city: 'checkout-guest-info-city',
        country: 'checkout-guest-info-country-list',
        receiveNewsletter: 'checkout-guest-info-first-name'
      }
    }
  }
};

/**
 * Some values are test-id, others are id or classes. Please check for proper resolution
 */
export const ui = {
  ...components,
  ...pages
};
