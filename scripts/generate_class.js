const path = require("path")
const fs = require("fs")

const colorObject = ["text", "decoration", "bg", "border"]

const colorNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const colors = [
    "inherit",
    "current",
    "transparent",
    "black",
    "white",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blueGray",
    "lightBlue",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose"
]

const textDecoration = ["underline", "overline", "line-through", "no-underline"]
const textStyle = ["decoration-solid", "decoration-double", "decoration-dotted", "decoration-dashed", "decoration-wavy"]
const textTransform = ["uppercase", "lowercase", "capitalize", "normal-case"]
const wordBreak = ["break-normal", "break-words", "break-all"]
const borderWidth = [
    "border-0",
    "border-2",
    "border-4",
    "border-8",
    "border",
    "border-x-0",
    "border-x-2",
    "border-x-4",
    "border-x-8",
    "border-x",
    "border-y-0",
    "border-y-2",
    "border-y-4",
    "border-y-8",
    "border-y",
    "border-t-0",
    "border-t-2",
    "border-t-4",
    "border-t-8",
    "border-t",
    "border-r-0",
    "border-r-2",
    "border-r-4",
    "border-r-8",
    "border-r",
    "border-b-0",
    "border-b-2",
    "border-b-4",
    "border-b-8",
    "border-b",
    "border-l-0",
    "border-l-2",
    "border-l-4",
    "border-l-8",
    "border-l"
]

const spacingObject = ["p", "m"]
const fullPosition = ["", "t", "r", "b", "l", "x", "y"]
const spacingNumber = [
    0,
    "px",
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    14,
    16,
    18,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    72,
    80,
    96
]
const sizeObject = ["rounded"]
const position = ["", "t", "r", "b", "l"]
const sizes = ["none", "sm", "", "md", "lg", "xl", "2xl", "3xl", "full"]
const specialSize = [
    ...spacingNumber,
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "2/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
    "1/6",
    "2/6",
    "3/6",
    "4/6",
    "5/6",
    "1/12",
    "2/12",
    "3/12",
    "4/12",
    "5/12",
    "6/12",
    "7/12",
    "8/12",
    "9/12",
    "10/12",
    "11/12",
    "full",
    "screen",
    "max",
    "min",
    "fit"
]

const fontSize = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl"
]

const fontWeight = [
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black"
]

const list = ["list-none", "list-disc", "list-decimal"]

module.exports = () => {
    const stylePaths = path.resolve(__dirname, "classes.js")

    const data = []

    for (const t of colorObject) {
        for (const color of colors) {
            for (const n of colorNumbers) {
                data.push(`${t}-${color}-${n}`)
                if (t === "text") {
                    data.push(`hover:${t}-${color}-${n}`)
                    data.push(`focus:${t}-${color}-${n}`)
                }
            }
        }
    }

    for (const t of sizeObject) {
        for (const p of position) {
            for (const s of sizes) {
                let a = t

                if (p !== "") {
                    a += `-${p}`
                }

                if (s !== "") {
                    a += `-${s}`
                }
                data.push(a)
            }
        }
    }

    for (const s of specialSize) {
        let a = "w"

        if (s !== "") {
            a += `-${s}`
        }
        data.push(a)
    }

    for (const s of specialSize) {
        let a = "h"

        if (s !== "") {
            a += `-${s}`
        }
        data.push(a)
    }

    for (const t of spacingObject) {
        for (const p of fullPosition) {
            for (const s of spacingNumber) {
                let a = t

                if (p !== "") {
                    a += p
                }

                if (s !== "") {
                    a += `-${s}`
                }
                data.push(a)
            }
        }
    }

    data.push(
        ...textDecoration,
        ...textStyle,
        ...textTransform,
        ...wordBreak,
        ...borderWidth,
        ...fontSize,
        ...fontWeight,
        ...list
    )

    let style = ""

    for (let p = 0; p < data.length; p++) {
        style += `"${data[p]}"`
        if (p !== data.length - 1) {
            style += ", "
        }
    }

    const content = `module.exports = [${style}]`

    fs.writeFileSync(stylePaths, content, "utf-8")
}
