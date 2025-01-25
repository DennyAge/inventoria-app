import { mount } from "@vue/test-utils";
import EmptyContent from "@/components/EmptyContent.vue";
import { describe, expect, it } from "vitest";

describe("EmptyContent.vue", () => {
  it("show title", () => {
    const title = "Test Title";
    const wrapper = mount(EmptyContent, {
      props: { title },
    });

    expect(wrapper.find(".empty-content__title").text()).toBe(title);
  });
});
