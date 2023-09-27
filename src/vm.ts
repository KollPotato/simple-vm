import { INT32_BYTE_SIZE } from "./constants"
import { Opcode, Program, Value } from "./instructions"
import { Stack } from "./stack"

export function run(program: Program, stackFn: (size: number) => Stack<Value>): Stack<Value> {
    const stackSize =
        program.filter((instruction) => instruction.opcode === Opcode.PUSH)
            .length * INT32_BYTE_SIZE

    const stack = stackFn(stackSize)

    let pc = 0

    while (pc < program.length) {
        const instruction = program[pc]
        pc += 1

        if (instruction.opcode === Opcode.ADD) {
            stack.push(stack.pop() + stack.pop())
        } else if (instruction.opcode === Opcode.PUSH) {
            if (instruction.value === undefined) {
                throw TypeError("push instruction takes a value")
            }

            stack.push(instruction.value)
        } else if (instruction.opcode === Opcode.JUMP) {
            if (instruction.value === undefined) {
                throw TypeError("jump instruction takes a value")
            }

            pc = instruction.value
        } else if (instruction.opcode === Opcode.PRINT) {
            console.log(stack.peek())
        } else if (instruction.opcode === Opcode.POP) {
            stack.pop()
        }
    }

    return stack
}
