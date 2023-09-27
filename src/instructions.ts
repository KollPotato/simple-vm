export type Instruction<
    TOpcode extends Opcode,
    TValue extends Value | never = never
> = Readonly<{
    opcode: TOpcode
    value?: TValue
}>

export type Program = Array<Instruction<Opcode, Value>>

export enum Opcode {
    PUSH,
    ADD,
    JUMP,
    POP,
    PRINT
}

export type Value = number

export const push = <T extends Value>(
    value: T
): Instruction<Opcode.PUSH, T> => ({
    opcode: Opcode.PUSH,
    value
})

export const jump = (address: number): Instruction<Opcode.JUMP, number> => ({
    opcode: Opcode.JUMP,
    value: address
})

export const print: Instruction<Opcode.PRINT, never> = {
    opcode: Opcode.PRINT
}

export const pop: Instruction<Opcode.POP, never> = {
    opcode: Opcode.POP
}

export const add: Instruction<Opcode.ADD> = {
    opcode: Opcode.ADD
}