
export function assert(cond, ...args) {
  if (!cond) {
    if (typeof console !== undefined) {
      if (console.assert) {
        // https://developer.mozilla.org/de/docs/Web/API/Console/assert
        console.assert(cond, ...args)
      } else {
        console.error(`Assert did fail with: ${cond}`, ...args)
      }
    }
    try {
      if (typeof expect !== undefined) {
        expect(cond).toBeTruthy()
      }
    } catch (err) {
      console.warn("assert err", err)
      // console.error('Exception:', err)
    }
  }
  // log(`Assert: ${cond}`, ...args)
}

export function assert_equal(value, expected, ...args) {
  if (value !== expected) {
    assert(false, `Expected ${expected} got ${value}`, ...args)
  } else {
    console.log(`Passed equal check with value ${value}`, ...args)
  }
}
