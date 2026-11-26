export default function Page() {


  const deepClone = <T,>(value: T): T => {

    if (typeof value !== "object" || value === null) {
      return value
    }

    if (Array.isArray(value)) {
      return value.map((item) => deepClone(item)) as T
    }


    const result: Record<string, unknown> = {}

    for (const key in value) {
      result[key] = deepClone((value as Record<string, unknown>)[key])
    }

    return result as T

  }

  return (
    <></>
  );
}