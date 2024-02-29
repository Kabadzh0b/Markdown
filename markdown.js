const fs = require('fs')
const path = require('path')

const markdownCloseCheck = ({ indexes, name }) => {
    if (indexes.length % 2 !== 0) {
        console.error(`Invalid markdown, ${name} not closed`)
        return false
    }
    return true
}

const markdownInsideOtherMarkdownCheck = (
    indexesInsideObject,
    indexesOutsideObject,
    deleteFlag = false
) => {
    const indexesInside = indexesInsideObject.indexes
    const indexesOutside = indexesOutsideObject.indexes
    for (let i = 0; i < indexesInside.length; i++) {
        for (let j = 0; j < indexesOutside.length; j += 2) {
            if (
                indexesInside[i] > indexesOutside[j] &&
                indexesInside[i] < indexesOutside[j + 1]
            ) {
                if (deleteFlag) {
                    indexesInside.splice(i, 1)
                    i--
                } else {
                    console.error(
                        `Invalid markdown, ${indexesInsideObject.name} inside ${indexesOutsideObject.name}`
                    )
                    return false
                }
            }
        }
    }
    return true
}

const tagsInsideOtherTagsCheck = (checkObjects) => {
    for (let i = 0; i < checkObjects.length; i++) {
        for (let j = 0; j < checkObjects.length; j++) {
            if (i !== j) {
                const x1 = markdownInsideOtherMarkdownCheck(
                    checkObjects[i],
                    checkObjects[j]
                )
                const x2 = markdownInsideOtherMarkdownCheck(
                    checkObjects[j],
                    checkObjects[i]
                )
                if (!x1 || !x2) {
                    return false
                }
            }
        }
    }
    return true
}

const deleteAllIndexesInsidePreformatted = (
    checkObjects,
    preformattedIndexes
) => {
    for (let i = 0; i < checkObjects.length; i++) {
        markdownInsideOtherMarkdownCheck(
            checkObjects[i],
            preformattedIndexes,
            true
        )
    }
}

const isMarkdownCorrect = (
    boldIndexes,
    italicIndexes,
    monospacedIndexes,
    preformattedIndexes
) => {
    const preformattedIndexesObject = {
        indexes: preformattedIndexes,
        name: 'preformatted',
    }

    const isPreformattedMarkdownCorrect = markdownCloseCheck(
        preformattedIndexesObject
    )

    const boldIndexesObject = {
        indexes: boldIndexes,
        name: 'bold',
    }
    const italicIndexesObject = {
        indexes: italicIndexes,
        name: 'italic',
    }
    const monospacedIndexesObject = {
        indexes: monospacedIndexes,
        name: 'monospaced',
    }

    const checkObjects = [
        boldIndexesObject,
        italicIndexesObject,
        monospacedIndexesObject,
    ]
    // Deleting all indexes that are inside preformatted
    deleteAllIndexesInsidePreformatted(checkObjects, preformattedIndexesObject)

    const correctLocated = tagsInsideOtherTagsCheck(checkObjects)

    const isBoldMarkdownCorrect = markdownCloseCheck(boldIndexesObject)
    const isItalicMarkdownCorrect = markdownCloseCheck(italicIndexesObject)
    const isMonospacesMarkdownCorrect = markdownCloseCheck(
        monospacedIndexesObject
    )
    if (
        !isBoldMarkdownCorrect ||
        !isItalicMarkdownCorrect ||
        !isMonospacesMarkdownCorrect ||
        !isPreformattedMarkdownCorrect
    ) {
        return false
    }
    return correctLocated
}

const markdownFunction = (markdown) => {
    const boldIndexes = []
    const italicIndexes = []
    const monospacedIndexes = []
    const preformattedIndexes = []
    const newParagraphIndexes = []
    const notTextSymbols = ['*', '_', '`', ' ', '\n', undefined]
    const notTextSymbolsCheck = (i) => {
        return notTextSymbols.includes(markdown[i])
    }
    for (let i = 0; i < markdown.length; i++) {
        if (
            markdown[i] === '*' &&
            markdown[i + 1] === '*' &&
            (notTextSymbolsCheck(i - 1) || notTextSymbolsCheck(i + 2))
        ) {
            boldIndexes.push(i)
            i++
        } else if (
            markdown[i] === '_' &&
            (notTextSymbolsCheck(i - 1) || notTextSymbolsCheck(i + 1))
        ) {
            italicIndexes.push(i)
        } else if (
            markdown[i] === '`' &&
            markdown[i + 1] === '`' &&
            markdown[i + 2] === '`' &&
            (notTextSymbolsCheck(i - 1) || notTextSymbolsCheck(i + 3))
        ) {
            preformattedIndexes.push(i)
            i += 2
        } else if (
            markdown[i] === '`' &&
            (notTextSymbolsCheck(i - 1) || notTextSymbolsCheck(i + 1))
        ) {
            monospacedIndexes.push(i)
        } else if (
            markdown[i] === '\n' &&
            markdown[i + 1] === '\n' &&
            (notTextSymbolsCheck(i - 1) || notTextSymbolsCheck(i + 2))
        ) {
            newParagraphIndexes.push(i)
        }
    }
    const isCorrect = isMarkdownCorrect(
        boldIndexes,
        italicIndexes,
        monospacedIndexes,
        preformattedIndexes
    )
    if (!isCorrect) {
        return false
    }
    let html = '<p>'
    let markdownPointer = 0
    let boldFlag = false
    let italicFlag = false
    let monospacedFlag = false
    let preformattedFlag = false
    while (markdownPointer < markdown.length) {
        if (boldIndexes.includes(markdownPointer)) {
            if (!boldFlag) {
                html += '<b>'
            } else {
                html += '</b>'
            }
            boldFlag = !boldFlag
            markdownPointer += 2
        } else if (italicIndexes.includes(markdownPointer)) {
            if (!italicFlag) {
                html += '<i>'
            } else {
                html += '</i>'
            }
            italicFlag = !italicFlag
            markdownPointer++
        } else if (monospacedIndexes.includes(markdownPointer)) {
            if (!monospacedFlag) {
                html += '<code>'
            } else {
                html += '</code>'
            }
            monospacedFlag = !monospacedFlag
            markdownPointer++
        } else if (preformattedIndexes.includes(markdownPointer)) {
            if (!preformattedFlag) {
                html += '<pre>'
            } else {
                html += '</pre>'
            }
            preformattedFlag = !preformattedFlag
            markdownPointer += 3
        } else if (newParagraphIndexes.includes(markdownPointer)) {
            html += '</p><p>'
            markdownPointer += 2
        } else {
            html += markdown[markdownPointer]
            markdownPointer++
        }
    }
    html += '</p>'
    return html
}

const getFullFilePath = (basicPath) => {
    return path.join(__dirname, basicPath)
}

const ARGS = process.argv

const OUT_INDEX = ARGS.indexOf('--out')
const OUTPUT_PATH = OUT_INDEX !== -1 ? ARGS[OUT_INDEX + 1] : null

const FROM_INDEX = ARGS.indexOf('--from')
const FROM_PATH = FROM_INDEX !== -1 ? ARGS[FROM_INDEX + 1] : null

const FULL_FROM_PATH = FROM_PATH !== null ? getFullFilePath(FROM_PATH) : null
const FULL_OUTPUT_PATH =
    OUTPUT_PATH !== null ? getFullFilePath(OUTPUT_PATH) : null

const readFile = () => {
    if (!FROM_PATH) {
        return 'Looks like you didn`t added a input file path\nBut it`s ok, you can get my test case:\n```**He_llo** ```_world_ `how` are you?'
    }
    return fs.readFileSync(FULL_FROM_PATH, {
        encoding: 'utf8',
    })
}

const MARKDOWN = readFile()

const HTML = markdownFunction(MARKDOWN)
if (!HTML) {
    return
}
console.log('result:', HTML)

if (OUTPUT_PATH) {
    fs.writeFileSync(FULL_OUTPUT_PATH, HTML)
}
