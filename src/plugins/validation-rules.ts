export function required(v: string | number) {
  return !!v || "This field is required"
}

export function email(e: string) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(e);
  return isValid || "Email is not valid"
}

export function minLength(len: number) {
  return (s: string) => (s.length >= len) || `Value must be ${len} characters long`
}
