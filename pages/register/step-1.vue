<template>
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full">
      <!-- Left Section -->
      <div class="p-8">
        <img src="~/assets/images/img-enterprise.svg" alt="Company Building" class="mb-6" />
        <h2 class="text-2xl font-semibold">
          {{ t('register-step-1.title') }}
          <span class="text-danger font-bold">{{ t('register-step-1.privy-enterprise') }}</span>
        </h2>
      </div>

      <!-- Right Section (Form) -->
      <div class="p-8">
        <form @submit.prevent="submitForm">
          <div class="space-y-4">
            <!-- Full Name -->
            <div>
              <p-form-group
                :label="t('register-step-1.full-name')"
                required>
                <p-input type="text" v-model="form.fullName" placeholder="John Doe"
                class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300" required >
                  <template #append>
                    <pi-checkmark-circle-solid-16 v-if="form.fullName" class="text-success" />
                  </template>
                </p-input>
              </p-form-group>
            </div>

            <!-- Email -->
            <div>
              <p-form-group
                :label="t('register-step-1.email')"
                required>
                <p-input type="email" v-model="form.email" placeholder="example@email.com"
                  class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300" required >
                  <template #append>
                    <pi-checkmark-circle-solid-16 v-if="isValidEmail(form.email)" class="text-success" />
                  </template>
                </p-input>
              </p-form-group>
            </div>

            <!-- Phone Number -->
            <div>
              <p-form-group
                :label="t('register-step-1.phone-number')"
                required>
                <p-input type="tel" v-model="form.phoneNumber" placeholder="+6212312312312"
                  class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300" required >
                  <template #append>
                    <pi-checkmark-circle-solid-16 v-if="isValidPhoneNumber(form.phoneNumber)" class="text-success" />
                  </template>
                </p-input>
              </p-form-group>
            </div>

            <!-- Company Name -->
            <div>
              <p-form-group
                :label="t('register-step-1.company-name')"
                required>
                <p-input type="text" v-model="form.companyName" :placeholder="t('register-step-1.company-name-placeholder')"
                  class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300" required >
                  <template #append>
                    <pi-checkmark-circle-solid-16 v-if="form.companyName" class="text-success" />
                  </template>
                </p-input>
              </p-form-group>
            </div>

            <!-- Business Sector -->
            <div>
              <p-form-group
                :label="t('register-step-1.business-sector')"
                required>
                <p-select v-model="form.businessSector"
                  :options="options"
                  class="w-full mt-1" required >
                </p-select>
              </p-form-group>
            </div>

            <!-- Submit Button -->
            <p-button type="submit"
              class="w-full mt-4 text-white"
              version="primary"
              color="danger"
              :disabled="!isFormValid">
              {{ t('continue') }}
            </p-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const form = ref({
  fullName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  businessSector: "",
});

// Email validation function
const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

// Phone number validation function
const isValidPhoneNumber = (phoneNumber) => {
  // Accepts formats like:
  // - +62xxxxxxxxxxx (international format with + sign)
  // - 08xxxxxxxxxx (local format starting with 0)
  // - 123456 (any numeric format)
  // Min length 6 digits (excluding the + sign if present)
  const phonePattern = /^(\+\d{1,4}|\d+)$/;
  return phonePattern.test(phoneNumber) && 
         (phoneNumber.startsWith('+') ? phoneNumber.length >= 7 : phoneNumber.length >= 6);
};

const isFormValid = computed(() => {
  return (
    form.value.fullName &&
    form.value.email &&
    isValidEmail(form.value.email) &&
    form.value.phoneNumber &&
    isValidPhoneNumber(form.value.phoneNumber) && // Add phone format validation
    form.value.companyName &&
    form.value.businessSector
  );
});

const options = ref([
  { text: t('register-step-1.sectors.technology'), value: "technology" },
  { text: t('register-step-1.sectors.finance'), value: "finance" },
  { text: t('register-step-1.sectors.healthcare'), value: "healthcare" },
  { text: t('register-step-1.sectors.retail'), value: "retail" },
  { text: t('register-step-1.sectors.manufacturing'), value: "manufacturing" },
]);

const submitForm = () => {
  if (!isFormValid.value) return
  // Replace alert with a more user-friendly notification or action
  // alert("Form Submitted!");
  navigateTo('/register/step-2')
};
</script>

<style scoped lang="postcss">
.container{
  @apply flex flex-row justify-center items-center;
  /* height: calc(100vh - 14rem); */
}
:deep(sup) {
  top: -0.1em !important;
  font-size: 1.1em;
}
</style>