<template>
  <div>
    <div
      class="upload-container"
      @click="openFileInput"
      @dragover="handleDragOver"
      @drop="handleDrop"
      :class="{ 'has-images': uploadedFiles.length > 0 }"
    >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        multiple
        style="display: none"
      />

      <div v-if="uploadedFiles.length > 0" class="preview-container">
        <div
          v-for="(file, index) in uploadedFiles"
          :key="index"
          class="preview-item"
        >
          <Image :src="file.preview" alt="Preview" class="preview-image" />
          <button
            @click="(event) => removeImage(index, event)"
            class="remove-button"
          >
            <Icon name="ri:close-fill" size="15" />
          </button>
        </div>

        <div
          v-if="uploadedFiles.length < 4"
          class="upload-more"
          @click.stop="openFileInput"
        >
          <Icon name="ri:add-large-fill" size="40" />
        </div>
      </div>

      <div v-else class="upload-placeholder">
        <p>Click or drag and drop to upload images</p>
      </div>
    </div>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["upload-complete"]);
const fileInput = ref(null);
const uploadedFiles = ref([]);
const imageUrls = ref([]);
const error = ref("");
const isLoading = ref(false);

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

  isLoading.value = true;
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
    isLoading.value = false;
  }
};
defineExpose({
  uploadFiles,
});
</script>

<style>
.upload-container {
  border: 0.063rem solid var(--color-neutral-grey-25);
  border-radius: 0.5rem;
  background-color: var(--color-neutral-white);
  padding: 1.25rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  min-height: 9.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.preview-item {
  position: relative;
  border: 0.063rem solid var(--color-neutral-grey-75);
  padding: 0.313rem;
  border-radius: 0.313rem;
}

.preview-image {
  max-width: 6.25rem;
  max-height: 6.25rem;
  display: block;
}

.remove-button {
  position: absolute;
  top: 0.313rem;
  right: 0.313rem;
  background: var(--color-neutral-white);
  color: var(--color-neutral-black);
  box-shadow: var(--large-shadow);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.upload-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.063rem solid var(--color-neutral-grey-75);
  width: 6.25rem;
  height: 7rem;
  cursor: pointer;
  color: var(--color-neutral-grey-75);
}

.upload-more span {
  font-size: 1.5rem;
  font-weight: bold;
}

.upload-more p {
  margin: 0;
  font-size: 0.75rem;
}
</style>
