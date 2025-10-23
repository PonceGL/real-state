import { act, renderHook } from "@testing-library/react";

import { useFormAction } from "./index";

describe("useFormAction", () => {
  it("should call onSuccess when action resolves without error", async () => {
    const action = jest.fn().mockResolvedValue({ success: true });
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useFormAction({ action, onSuccess, onError })
    );

    await act(async () => {
      await result.current.execute({ test: "data" });
    });

    expect(action).toHaveBeenCalledWith({ test: "data" });
    expect(onSuccess).toHaveBeenCalledWith({ success: true });
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it("should call onError and set error when action resolves with error", async () => {
    const action = jest.fn().mockResolvedValue({ error: "fail" });
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useFormAction({ action, onSuccess, onError })
    );

    await act(async () => {
      await result.current.execute({ test: "data" });
    });

    expect(action).toHaveBeenCalledWith({ test: "data" });
    expect(onError).toHaveBeenCalledWith("fail");
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.error).toBe("fail");
  });

  it("should clear previous error before executing action", async () => {
    const action = jest
      .fn()
      .mockResolvedValueOnce({ error: "fail" })
      .mockResolvedValueOnce({ success: true });
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useFormAction({ action, onSuccess, onError })
    );

    await act(async () => {
      await result.current.execute({ test: "data" });
    });
    expect(result.current.error).toBe("fail");

    await act(async () => {
      await result.current.execute({ test: "data2" });
    });
    expect(result.current.error).toBeNull();
  });

  it("should handle missing onSuccess and onError callbacks", async () => {
    const action = jest.fn().mockResolvedValue({ error: "fail" });
    const { result } = renderHook(() => useFormAction({ action }));

    await act(async () => {
      await result.current.execute({ test: "data" });
    });
    expect(result.current.error).toBe("fail");
  });

  it("should set isPending to true while executing", async () => {
  let resolve: (value: unknown) => void;
    const action = jest.fn().mockImplementation(
      () =>
        new Promise((res) => {
          resolve = res;
        })
    );
    const { result } = renderHook(() => useFormAction({ action }));

    act(() => {
      result.current.execute({ test: "data" });
    });
    expect(result.current.isPending).toBe(true);
    act(() => {
      resolve!({ success: true });
    });
  });
});
