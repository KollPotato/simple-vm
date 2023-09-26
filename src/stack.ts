import { INT32_BYTE_SIZE } from "./constants"
import { Value } from "./instruction"

export type Stack<T> = {
    pop(): T
    peek(): T
    push(value: T): void
}

export function createBufferStack(size: number): Stack<Value> {
    const buffer = Buffer.alloc(size)

    let offset = 0

    return {
        push(value) {
            if (offset >= size) {
                throw Error("stack overflow")
            }

            offset = buffer.writeInt32LE(value, offset)
        },
        peek() {
            return buffer.readInt32LE(offset - INT32_BYTE_SIZE)
        },
        pop() {
            offset -= INT32_BYTE_SIZE

            const value = buffer.readInt32LE(offset)
            buffer.writeInt32LE(0, offset)
            return value
        }
    }
}

export function createArrayStack(size: number): Stack<Value> {
    const values: Value[] = []

    return {
        push(value) {
            if (values.length >= size) {
                throw Error("stack overflow")
            }

            values.push(value)
        },
        peek() {
            const value = values[values.length - 1]

            if (value === undefined) {
                throw Error("stack underflow")
            }

            return value
        },
        pop() {
            const value = values.pop()

            if (value === undefined) {
                throw Error("stack underflow")
            }

            return value
        }
    }
}