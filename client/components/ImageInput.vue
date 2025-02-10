<template>
  <div>
    <div
      class="border border-gray-200 bg-gray-100/50 rounded-md text-center p-5 relative flex items-center justify-center cursor-pointer h-40"
      @click="openFileInput"
      @dragover="handleDragOver"
      @drop="handleDrop"
      :class="
        cn(
          { 'has-images': uploadedFiles.length > 0 },
          { 'border-red-500': error },
        )
      "
    >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        multiple
        style="display: none"
      />

      <div v-if="uploadedFiles.length > 0" class="flex flex-wrap gap-2.5">
        <div
          v-for="(file, index) in uploadedFiles"
          :key="index"
          class="relative border border-gray-200 bg-white rounded-sm"
        >
          <nuxt-img
            :src="file.preview"
            alt="Preview"
            class="max-w-24 max-h-24"
          />
          <button
            @click="(event) => removeImage(index, event)"
            class="absolute top-1.5 right-1.5 bg-white text-black shadow-lg border-0 rounded-full cursor-pointer w-5 h-5 flex items-center justify-center text-xs"
          >
            <Icon name="ri:close-fill" />
          </button>
        </div>

        <button
          v-if="uploadedFiles.length < 4"
          type="button"
          @click.stop="openFileInput"
          class="border border-gray-200 bg-white rounded-sm p-1.5 w-24"
        >
          <Icon name="ri:add-large-fill" />
        </button>
      </div>

      <div v-else class="flex flex-col items-center gap-2.5">
        <p>Click or drag and drop to upload images</p>
      </div>
    </div>
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
//helpers
import { cn } from "~/lib/utils.js";
//store
import { useLoadingStore } from "~/stores/loading.store.js";

const emit = defineEmits(["upload-complete"]);
const loadingStore = useLoadingStore();

//data
const fileInput = ref(null);
const uploadedFiles = ref([]);
const imageUrls = ref([]);
const error = ref("");

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  processFiles(files);
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  processFiles(files);
};

const processFiles = (files) => {
  if (files.length + uploadedFiles.value.length > 4) {
    error.value = "Max 4 images";
    return;
  }

  error.value = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedFiles.value.push({
          file: file,
          preview: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      error.value = "select image";
    }
  }
};

const removeImage = (index, event) => {
  event.stopPropagation();
  uploadedFiles.value.splice(index, 1);
};

const uploadFiles = async () => {
  if (uploadedFiles.value.length === 0) {
    error.value = "File is empty";
    return;
  }

  loadingStore.setLoading(true);
  error.value = "";

  const formData = new FormData();
  uploadedFiles.value.forEach((fileObj) => {
    formData.append("images", fileObj.file);
  });

  const config = useRuntimeConfig();

  try {
    const response = await fetch(`${config.public.apiBaseUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error uploading image");
    }

    imageUrls.value = data.fileUrls || [];
    emit("upload-complete", imageUrls.value);
  } catch (err) {
    error.value = err.message;
  } finally {
    loadingStore.setLoading(false);
  }
};
defineExpose({
  uploadFiles,
});
</script>
