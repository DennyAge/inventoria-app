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
    <div class="flex flex-col gap-1">
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
    <div v-if="!editMode" class="flex flex-col gap-1">
      <label class="text-sm"> {{ $t("image") }}</label>
      <ImageInput @upload-complete="uploadFile" ref="uploader" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm"> {{ $t("state") }}</label>
      <div class="flex gap-4">
        <RadioInput
          v-model="form.state"
          id="newState"
          :value="true"
          :label="$t('new')"
        />
        <RadioInput
          v-model="form.state"
          id="usedState"
          :value="false"
          :label="$t('used')"
        />
      </div>
    </div>
    <div class="flex flex-col gap-1 w-full">
      <label class="text-sm"> {{ $t("price") }}:</label>
      <div class="flex gap-4 w-full">
        <CustomInput
          v-model="form.priceUAH"
          type="number"
          name="priceUAH"
          id="priceUAH"
          min="0"
          max="999999"
          required
          :error="!form.priceUAH && showFormError ? 'Price is required' : ''"
          @input="limitLength('priceUAH', 6)"
          right-icon
        >
          <template v-slot:right-icon>
            <nuxt-img src="/icons/uah.png" class="w-6 h-6" />
          </template>
        </CustomInput>
        <CustomInput
          v-model="form.priceUSD"
          type="number"
          name="priceUSD"
          id="priceUSD"
          min="0"
          max="999999"
          required
          :error="!form.priceUSD && showFormError ? 'Price is required' : ''"
          @input="limitLength('priceUSD', 6)"
          right-icon
        >
          <template v-slot:right-icon>
            <nuxt-img src="/icons/usd.png" class="w-6 h-6" />
          </template>
        </CustomInput>
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <Button @click="onClose" type="button" variant="outline">
        {{ $t("cancel") }}
      </Button>

      <Button @click="onSubmit" type="button">
        {{ editMode ? $t("save") : $t("add") }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
//helpers
import { productSpecification, productTypes } from "~/constants";
//types
import { Product } from "~/types";
//components
import CustomInput from "~/components/ui/CustomInput.vue";
import CustomSelect from "~/components/ui/CustomSelect.vue";
import DatePicker from "~/components/ui/DatePicker.vue";
import RadioInput from "~/components/ui/RadioInput.vue";
import Button from "~/components/ui/Button.vue";

const emit = defineEmits(["close", "submit"]);

interface Props {
  orderId?: string;
  product?: Product | null;
  editMode?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  editMode: false,
});

interface Form {
  title: string;
  type: string;
  specification: string;
  photo: string[];
  guaranteeStart: string | null;
  guaranteeEnd: string | null;
  state: boolean;
  priceUSD: number;
  priceUAH: number;
}

const form = reactive<Form>({
  title: props?.product?.title || "",
  type: props?.product?.type || "",
  specification: props?.product?.specification || "",
  guaranteeStart:
    props?.product?.guarantee?.start || new Date().getTime().toString(),
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
