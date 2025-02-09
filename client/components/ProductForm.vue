<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <CustomInput
      v-model="form.title"
      :label="$t('title')"
      placeholder="Title"
      type="text"
      name="title"
      id="title"
      maxlength="75"
      required
      :error="!form.title.trim() && showFormError ? 'Title is required' : ''"
    />
    <CustomSelect
      :options="productTypes"
      :label="$t('type')"
      v-model="form.type"
      placeholder="Type"
      required
      :error="!form.type.trim() && showFormError ? 'Type is required' : ''"
    />
    <CustomSelect
      :options="productSpecification"
      :label="$t('specification')"
      v-model="form.specification"
      placeholder="Specification"
      required
      :error="
        !form.specification.trim() && showFormError
          ? 'Specification is required'
          : ''
      "
    />
    <div class="flex flex-col gap-2">
      <label class="text-sm">{{ $t("guarantee") }}</label>
      <div class="flex gap-2 items-center">
        <DatePicker
          key="guaranteeStart"
          v-model="form.guaranteeStart"
          :error="
            !form.guaranteeStart && showFormError
              ? 'Start date is required'
              : ''
          "
        />
        <span> - </span>
        <DatePicker
          key="guaranteeEnd"
          v-model="form.guaranteeEnd"
          :error="
            !form.guaranteeEnd && showFormError ? 'End date is required' : ''
          "
        />
      </div>
    </div>

    <!--    TODO: refactor upload-input code to edit mode -->
    <div v-if="!editMode">
      <label class="sr-only mb-1"> {{ $t("image") }}:</label>
      <ImageInput @upload-complete="uploadFile" ref="uploader" />
    </div>
    <div>
      <label class="sr-only mb-1"> {{ $t("state") }}:</label>
      <div class="d-flex gap-5">
        <div class="form-check">
          <input
            class="form-check-input"
            v-model="form.state"
            type="radio"
            name="state"
            id="newState"
            :value="true"
          />
          <label class="form-check-label" for="newState">
            {{ $t("new") }}
          </label>
        </div>
        <div class="form-check">
          <input
            v-model="form.state"
            class="form-check-input"
            type="radio"
            name="state"
            id="usedState"
            :value="false"
          />
          <label class="form-check-label" for="usedState">
            {{ $t("used") }}
          </label>
        </div>
      </div>
    </div>
    <div>
      <label class="sr-only mb-1"> {{ $t("price") }}:</label>
      <div class="d-flex gap-5">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">UAH</div>
          </div>
          <input
            v-model="form.priceUAH"
            type="number"
            class="form-control"
            id="priceUAH"
            min="0"
            max="999999"
            :class="{ 'is-invalid': !form.priceUAH && showFormError }"
            @input="limitLength('priceUAH', 6)"
          />
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">USD</div>
          </div>
          <input
            v-model="form.priceUSD"
            type="number"
            class="form-control"
            id="priceUSD"
            min="0"
            max="999999"
            :class="{
              'is-invalid': !form.priceUSD && showFormError,
            }"
            @input="limitLength('priceUSD', 6)"
          />
        </div>
      </div>
      <span v-if="!form.priceUAH && showFormError" class="text-danger">
        Price is required
      </span>
    </div>
    <div class="flex justify-end gap-4">
      <button
        @click="onClose"
        :disabled="isLoading"
        type="button"
        class="btn btn-danger"
      >
        {{ $t("cancel") }}
      </button>
      <button
        v-if="isLoading"
        class="btn btn-success d-flex align-items-center gap-2"
        type="button"
        disabled
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </button>
      <button v-else @click="onSubmit" type="button" class="btn btn-success">
        {{ editMode ? $t("save") : $t("add") }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  productGuarantee,
  productSpecification,
  productTypes,
} from "~/constants";
import { Product } from "~/types";
import CustomInput from "~/components/ui/CustomInput.vue";
import CustomSelect from "~/components/ui/CustomSelect.vue";
import DatePicker from "~/components/ui/DatePicker.vue";
const emit = defineEmits(["close", "submit"]);

interface Props {
  orderId?: string;
  product?: Product | null;
  editMode?: boolean;
  isLoading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  editMode: false,
});

interface Form {
  title: string;
  type: string;
  specification: string;
  photo: string[];
  guaranteeStart: string | Date | null;
  guaranteeEnd: string | Date | null;
  state: boolean;
  priceUSD: number;
  priceUAH: number;
}

const form = reactive<Form>({
  title: props?.product?.title || "",
  type: props?.product?.type || "",
  specification: props?.product?.specification || "",
  guaranteeStart: props?.product?.guarantee?.start || null,
  guaranteeEnd: props?.product?.guarantee?.end || null,
  photo: props?.product?.photo || [],
  state: props?.product?.isUsed || false,
  priceUSD: props?.product?.price[0]?.value || 0,
  priceUAH: props?.product?.price[1]?.value || 0,
});

const showFormError = ref<boolean>(false);
const uploader = ref(null);

const limitLength = (field: keyof Form, maxLength: number) => {
  const value = form[field];
  const valueAsString = value.toString();
  if (valueAsString.length > maxLength) {
    (form[field] as number) = Number(valueAsString.slice(0, maxLength));
  }
};
const onClose = () => {
  emit("close");
};
const uploadFile = (images: string[]) => {
  form.photo = images;
};
const handleUpload = async () => {
  if (uploader.value) {
    await uploader.value.uploadFiles();
  }
};
const onSubmit = async () => {
  if (
    !form.title.trim() ||
    !form.type.trim() ||
    !form.specification.trim() ||
    !form.guaranteeStart ||
    !form.guaranteeEnd ||
    !form.priceUSD ||
    !form.priceUAH
  ) {
    showFormError.value = true;
    return;
  }
  await handleUpload();
  emit("submit", {
    title: form.title,
    type: form.type,
    specification: form.specification,
    guarantee: {
      start: form.guaranteeStart,
      end: form.guaranteeEnd,
    },
    photo: form.photo,
    price: [
      {
        value: form.priceUSD,
        symbol: "USD",
        isDefault: false,
      },
      {
        value: form.priceUAH,
        symbol: "UAH",
        isDefault: true,
      },
    ],
    isUsed: form.state,
    order: props.orderId,
  });
};
</script>
