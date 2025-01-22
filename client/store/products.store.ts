import type { Product, UpdateProductInput } from "~/types";

const defaultValues: {
  products: Product[];
  selectedProducts: Product[];
  product: Product | null;
} = {
  products: [],
  selectedProducts: [],
  product: null,
};

export const useProductsStore = defineStore("products", {
  state: () => defaultValues,
  getters: {},
  actions: {
    async getProducts() {
      try {
        const { products } = await GqlGetAllProducts();
        this.$patch({ products });
      } catch (error) {
        console.error("Get products failed:", error);
        this.$patch({ products: [] });
      }
    },
    async getProduct(productId: string) {
      const { product } = await GqlGetProductById({ productId });
      if (product) {
        this.$patch({ product });
      } else {
        console.error("Product not found");
        this.$patch({ product: null });
      }
    },
    setSelectedProducts(data: Product[]) {
      this.$patch({ selectedProducts: data });
    },
    async updateProduct(productId: string, input: UpdateProductInput) {
      try {
        const { updateProduct } = await GqlUpdateProduct({
          productId,
          input,
        });

        const index = this.products.findIndex(
          (p) => p._id === updateProduct._id,
        );
        if (index !== -1) {
          this.products.splice(index, 1, updateProduct);
        }
        if (this.product?._id === updateProduct._id) {
          this.$patch({ product: updateProduct });
        }
      } catch (error) {
        console.error("Update product failed:", error);
      }
    },
    async deleteProduct(productId: string) {
      try {
        const { deleteProduct } = await GqlDeleteProduct({ productId });

        if (deleteProduct?.message) {
          this.products = this.products.filter((p) => p._id !== productId);

          if (this.product?._id === productId) {
            this.$patch({ product: null });
          }

          this.selectedProducts = this.selectedProducts.filter(
            (p) => p._id !== productId,
          );

          return deleteProduct?.message;
        }
      } catch (error) {
        console.error("Delete product failed:", error);
      }
    },
    clearProductsStore() {
      this.$patch(defaultValues);
    },
  },
});
