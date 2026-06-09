// Basic Base64 cookie payload helper
export function sign(payload: any): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

export function verify(token: string): any | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8")
    return JSON.parse(decoded)
  } catch {
    return null
  }
}
