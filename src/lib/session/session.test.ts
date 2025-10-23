

jest.mock("next/headers", () => ({
	cookies: jest.fn(),
}));

import { cookies } from "next/headers";

import { createSession } from "./index";

describe("createSession", () => {
	const mockSet = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(cookies as jest.Mock).mockReturnValue({ set: mockSet });
	});

	it("should set the session cookie with correct options", async () => {
		const sessionValue = "test-session";
		await createSession(sessionValue);
		expect(cookies).toHaveBeenCalled();
		expect(mockSet).toHaveBeenCalledWith(
			"session",
			sessionValue,
			expect.objectContaining({
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				path: "/",
				expires: expect.any(Date),
			})
		);
	});

	it("should set expires to about 1 day from now", async () => {
		const now = Date.now();
		jest.spyOn(Date, "now").mockReturnValue(now);
		await createSession("session-value");
		const expiresArg = mockSet.mock.calls[0][2].expires;
		expect(expiresArg.getTime()).toBeGreaterThanOrEqual(now + 24 * 60 * 60 * 1000 - 1000);
		expect(expiresArg.getTime()).toBeLessThanOrEqual(now + 24 * 60 * 60 * 1000 + 1000);
		jest.spyOn(Date, "now").mockRestore();
	});
});
