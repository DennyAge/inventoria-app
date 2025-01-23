import type { Order, UpdateOrderInput } from "~/types";

const defaultValues: {
  orders: Order[];
  order: Order | null;
  selectedOrder: Order | null;
} = {
  orders: [],
  order: null,
  selectedOrder: null,
};

export const useOrdersStore = defineStore("orders", {
  state: () => defaultValues,
  getters: {
    getOrderById: (state) => (orderId: string) => {
      return state.orders.find((order) => order._id === orderId);
    },
  },
  actions: {
    async getOrders() {
      try {
        const { orders } = await GqlGetAllOrders();
        this.$patch({ orders: orders || [] });
      } catch (error) {
        console.error("Get orders failed:", error);
        this.$patch({ orders: [] });
      }
    },
    setSelectedOrder(data: Order) {
      this.$patch({ selectedOrder: data });
    },
    async getOrder(orderId: string) {
      const { order } = await GqlGetOrderById({ orderId });
      if (order) {
        this.$patch({ order });
      } else {
        console.error("Order not found");
        this.$patch({ order: null });
      }
    },

    async updateOrder(orderId: string, input: UpdateOrderInput) {
      try {
        const { updateOrder } = await GqlUpdateOrder({
          orderId,
          input,
        });

        const index = this.orders.findIndex(
          (order) => order._id === updateOrder._id,
        );
        if (index !== -1) {
          this.orders.splice(index, 1, updateOrder);
        }
        if (this.order?._id === updateOrder._id) {
          this.$patch({ order: updateOrder });
        }
      } catch (error) {
        console.error("Update order failed:", error);
      }
    },

    async deleteOrder(orderId: string) {
      try {
        const { deleteOrder } = await GqlDeleteOrder({ orderId });

        if (deleteOrder?.message) {
          this.orders = this.orders.filter((order) => order._id !== orderId);

          if (this.order?._id === orderId) {
            this.$patch({ order: null });
          }

          return deleteOrder?.message;
        }
      } catch (error) {
        console.error("Delete order failed:", error);
      }
    },

    clearProductsStore() {
      this.$patch(defaultValues);
    },
  },
});
