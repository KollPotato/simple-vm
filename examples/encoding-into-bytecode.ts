import { Program, add, decode, encode, print, push, run } from "@package"
import * as fs from "fs/promises"

// Create a program that adds 2 + 3 and then prints it to stdout
const program: Program = [push(2), push(3), add, print]

// encode the program in binary
const buffer = encode(program)
const filename = "my-silly-program"

// save encoded program in a file
await fs.writeFile(filename, buffer)

// read, decode and execute the program
run(decode(await fs.readFile(filename)))
