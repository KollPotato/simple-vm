import { Program } from "./instruction";

export function encode(program: Program): Buffer {
    const size = program.length * 5
    const buffer = Buffer.alloc(size)

    let offset = 0

    for (const instruction of program) {
        offset = buffer.writeUInt8(instruction.opcode, offset)
        offset = buffer.writeInt32LE(instruction.value ?? 0, offset)
    }

    return buffer
}

export function decode(buffer: Buffer): Program {
    const program: Program = []

    for (let i = 0; i < buffer.byteLength; i += 5) {
        const opcode = buffer.readUInt8(i)
        const value = buffer.readInt32LE(i + 1)

        program.push({ opcode, value })
    }

    return program
}
