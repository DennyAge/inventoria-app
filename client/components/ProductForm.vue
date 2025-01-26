<template>
  <form class="product-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="title">{{ $t("title") }}:</label>
      <input
        v-model="form.title"
        type="text"
        class="form-control"
        id="title"
        aria-describedby="title"
        required
        maxlength="75"
        :class="{ 'is-invalid': !form.title.trim() && showFormError }"
      />
      <span v-if="!form.title.trim() && showFormError" class="text-danger">
        Title is required
      </span>
    </div>
    <div class="form-group">
      <label for="type">{{ $t("type") }}:</label>
      <select
        class="form-control"
        id="type"
        :class="{ 'is-invalid': !form.type.trim() && showFormError }"
        v-model="form.type"
      >
        <option v-for="option in productTypes" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <span v-if="!form.type.trim() && showFormError" class="text-danger">
        Type is required
      </span>
    </div>
    <div class="form-group">
      <label for="specification">{{ $t("specification") }}:</label>
      <select
        class="form-control"
        :class="{ 'is-invalid': !form.specification.trim() && showFormError }"
        id="specification"
        v-model="form.specification"
      >
        <option
          v-for="option in productSpecification"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <span
        v-if="!form.specification.trim() && showFormError"
        class="text-danger"
      >
        Specification is required
      </span>
    </div>
    <div class="form-group" v-if="!editMode">
      <label for="guarantee">{{ $t("guarantee") }}:</label>
      <select
        class="form-control"
        :class="{ 'is-invalid': !form.guarantee && showFormError }"
        id="guarantee"
        v-model="form.guarantee"
      >
        <option
          v-for="option in productGuarantee"
          :key="option.title"
          :value="option.value"
        >
          {{ option.title }}
        </option>
      </select>
      <span v-if="!form.guarantee && showFormError" class="text-danger">
        Guarantee is required
      </span>
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
    <div class="form-footer">
      <button @click="onClose" type="button" class="btn btn-danger">
        {{ $t("cancel") }}
      </button>
      <button @click="onSubmit" type="button" class="btn btn-success">
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
  guarantee: string;
  state: boolean;
  priceUSD: number;
  priceUAH: number;
}

const form = reactive<Form>({
  title: props?.product?.title || "",
  type: props?.product?.type || "",
  specification: props?.product?.specification || "",
  guarantee: props?.product?.guarantee || "",
  state: props?.product?.isUsed || false,
  priceUSD: props?.product?.price[0]?.value || 0,
  priceUAH: props?.product?.price[1]?.value || 0,
});

const showFormError = ref<boolean>(false);

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
const onSubmit = () => {
  console.log(form);
  if (
    !form.title.trim() ||
    !form.type.trim() ||
    !form.specification.trim() ||
    !form.guarantee ||
    !form.priceUSD ||
    !form.priceUAH
  ) {
    showFormError.value = true;
    return;
  }
  emit("submit", {
    title: form.title,
    type: form.type,
    specification: form.specification,
    guarantee: form.guarantee,
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

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.text-danger {
  font-size: 0.8rem;
}
</style>
