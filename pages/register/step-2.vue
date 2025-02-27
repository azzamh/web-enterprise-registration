<template>
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full overflow-hidden">
      <!-- Bagian Kiri -->
      <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4">
          {{ t('register-step-2.title') }}
          <br />
          <span class="text-danger font-bold">
            {{ t('register-step-2.free-trial') }}
          </span>
        </h2>

        <!-- Bullet Points -->
        <ul class="space-y-6  mb-8 text-sm text-subtle mt-8">
          <div class="flex items-center gap-2">
            <pi-checkmark-circle-solid-16 class="text-info"/>
            {{ t('register-step-2.benefit-1') }}
          </div>
          <div class="flex items-center gap-2">
            <pi-checkmark-circle-solid-16 class="text-info"/>
            {{ t('register-step-2.benefit-2') }}
          </div>
          <div class="flex items-center gap-2">
            <pi-checkmark-circle-solid-16 class="text-info"/>
            {{ t('register-step-2.benefit-3') }}
          </div>
        </ul>

        <!-- Link Contact Us -->
        <div class="text-sm text-subtle">
          {{ t('register-step-2.found-any-problem') }}
          <a href="#" class="text-info underline font-semibold hover:underline text-cs">
            {{ t('register-step-2.contact-us') }}
          </a>
        </div>
      </div>

      <!-- Bagian Kanan (Form) -->
      <div class="p-8">
        <p-button
          version="primary"
          class="mb-4 px-0"
          size="sm"
          @click="navigateTo('/register/step-1')"
        >
        <pi-chevron-left-20 class="mr-0"/>
          {{ t('back') }}
        </p-button>
        <form @submit.prevent="submitForm">
          <div class="space-y-4">
            <!-- PrivyID of the enterprise owner -->
            <div>
              <p-form-group
                :label="t('register-step-2.label.privyid')"
                required
              >
                <p-input
                  type="text"
                  v-model="form.enterpriseOwner"
                  placeholder="F1X1000"
                  class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300"
                  required
                >
                  <template #append>
                    <pi-checkmark-circle-solid-16 v-if="isValid(form.enterpriseOwner, 5)" class="text-success" />
                  </template>
                </p-input>
                <a href="#" class="text-info underline hover:underline text-xs" @click="registerPrivy">
                  {{ t('register-step-2.dont-have-privyid') }}
                </a>
              </p-form-group>
            </div>

            <!-- Company NPWP -->
            <div v-if="!form.noNpwp">
              <p-form-group
                :label="t('register-step-2.label.npwp')"
                required
              >
                <p-input
                  type="text"
                  v-model="form.companyNpwp"
                  placeholder="123123123123123"
                  class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300"
                  required
                >
                  <template #append>
                    <pi-checkmark-circle-solid-16 v-if="isValid(form.companyNpwp, 4)" class="text-success" />
                  </template>
                </p-input>
              </p-form-group>
            </div>

            <!-- NPWP Document -->
            <div v-if="!form.noNpwp">
              <p-form-group
                :label="t('register-step-2.label.npwp-doc')"
                :required="!form.noNpwp"
              >
                <p-input
                  type="file"
                  v-model="form.npwpDocument"
                  class="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-red-300"
                />
              </p-form-group>
            </div>

            <!-- Checkbox: I don't have NPWP yet -->
            <div class="flex items-center space-x-2">
              <p-checkbox
                v-model="form.noNpwp"
                >
                <div>{{ t('register-step-2.check-title.no-npwp') }}</div>
                <p-caption>{{ t('register-step-2.check-subtitle.no-npwp') }}</p-caption>
              </p-checkbox>
            </div>

            <!-- Checkbox: Enable e-seal and stamp feature -->
            <div class="flex items-center space-x-2">
              <p-checkbox
                v-model="form.enableEseal"
              >
                <div>{{ t('register-step-2.check-title.enable-eseal') }}</div>
                <p-caption>{{ t('register-step-2.check-subtitle.enable-eseal') }}</p-caption>
              </p-checkbox>
            </div>

            <p-banner
              v-if="form.noNpwp"
              variant="warning"
              class="mt-4"
              no-icon
              :dismissable="false"
            >
              <div class="flex items-start">
              <div class="mr-3 text-warning w-[20px]">
                <pi-exclamation-triangle-solid-20/>
              </div>
              <div>
              {{ t('register-step-2.banner.npwp') }}
              </div>
              </div>
            </p-banner>

            <!-- Referral code (optional) + Check Button -->
            <div>
              <p-form-group
                :label="t('register-step-2.label.referral-code')"
              >
                <div class="flex items-center mt-1">
                  <p-input
                    type="text"
                    v-model="form.referralCode"
                    placeholder="e.g. 9283902928"
                    class="w-full p-3 border rounded-md focus:ring focus:ring-red-300"
                  >
                    <template #append>
                      <pi-checkmark-circle-solid-16 v-if="validReferral" class="text-success" />
                      <p-spinner v-else-if="isLoading"/>
                    </template>
                  </p-input>
                  <p-button
                    class="ml-2"
                    :disabled="isLoading"
                    @click.prevent="checkReferral"
                  >
                    {{ t('check') }}
                  </p-button>
                </div>
              </p-form-group>
            </div>

            <!-- Tombol Submit -->
            <p-button
              type="submit"
              class="w-full mt-4"
              version="primary"
              color="danger"
              :disabled="!isFormValid || isLoading"
            >
              {{ t('continue') }}
            </p-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Jika masih ingin menggunakan i18n
const { t } = useI18n({ useScope: 'global' })
const validReferral = ref(false)
const isLoading = ref(false)

// State form
const form = ref({
  enterpriseOwner: "",
  companyNpwp: "",
  npwpDocument: null,
  noNpwp: false,
  enableEseal: false,
  referralCode: "",
})

function isValid(value, minLength = 1) {
  return value.length >= minLength
}

async function cekReferral() {
  if (!form.value.referralCode) return
  console.log("Referral code checked:", form.value.referralCode)
}

// Contoh validasi sederhana (opsional, sesuaikan kebutuhan)
const isFormValid = computed(() => {
  if (form.value.noNpwp) {
    return isValid(form.value.enterpriseOwner, 5)
  }else{
    return isValid(form.value.enterpriseOwner, 5)
    && isValid(form.value.companyNpwp, 4)
    && form.value.npwpDocument
  }
})

// Handler tombol "Check" di referral code
const checkReferral = () => {
  if (!form.value.referralCode) return  
  isLoading.value = true
  setTimeout(() => {
    validReferral.value = true
    isLoading.value = false
  }, 3000)
  // Di sini Anda bisa memanggil API atau melakukan pengecekan kode referral
  // misal alert("Referral code checked!")
  console.log("Referral code checked:", form.value.referralCode)
}

// Handler submit form
const submitForm = () => {
  if (!isFormValid.value) return
  // Arahkan ke step selanjutnya atau kirim data
  // Contoh: navigateTo('/register/step-2')
  console.log("Form submitted", form.value)
}

function registerPrivy() {
}
</script>

<style scoped lang="postcss">
.container {
  @apply flex flex-row justify-center items-center;
  height: calc(100vh - 14rem);
}
</style>
