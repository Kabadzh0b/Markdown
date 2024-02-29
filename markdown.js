const markdownCloseCheck = (indexes, indexesName) => {
    if (indexes.length % 2 !== 0) {
        console.error(`Invalid markdown, ${indexesName} not closed`)
        return false
    }
    return true
}

const markdownInsideOtherMarkdownCheck = (
    indexesInsideObject,
    indexesOutsideObject
) => {
    const indexesInside = indexesInsideObject.indexes
    const indexesOutside = indexesOutsideObject.indexes
    for (let i = 0; i < indexesInside.length; i++) {
        for (let j = 0; j < indexesOutside.length; j += 2) {
            if (
                indexesInside[i] > indexesOutside[j] &&
                indexesInside[i] < indexesOutside[j + 1]
            ) {
                console.error(
                    `Invalid markdown, ${indexesInsideObject.name} inside ${indexesOutsideObject.name}`
                )
                return false
            }
        }
    }
    return true
}

const tagsInsideOtherTagsCheck = (
    boldIndexes,
    italicIndexes,
    monospacedIndexes
) => {
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
}

const isMarkdownCorrect = (
    boldIndexes,
    italicIndexes,
    monospacedIndexes,
    preformattedIndexes
) => {
    const isBoldMarkdownCorrect = markdownCloseCheck(boldIndexes, 'bold')
    const isItalicMarkdownCorrect = markdownCloseCheck(italicIndexes, 'italic')
    const isMonospacesMarkdownCorrect = markdownCloseCheck(
        monospacedIndexes,
        'monospaced'
    )
    const isPreformattedMarkdownCorrect = markdownCloseCheck(
        preformattedIndexes,
        'preformatted'
    )
    if (
        !isBoldMarkdownCorrect ||
        !isItalicMarkdownCorrect ||
        !isMonospacesMarkdownCorrect ||
        !isPreformattedMarkdownCorrect
    ) {
        return false
    }

    const correctLocated = tagsInsideOtherTagsCheck(
        boldIndexes,
        italicIndexes,
        monospacedIndexes
    )
    return correctLocated
}

const markdownFunction = (markdown) => {
    const boldIndexes = []
    const italicIndexes = []
    const monospacedIndexes = []
    const preformattedIndexes = []
    const newParagraphIndexes = []
    const notTextSymbols = ['*', '_', '`', ' ', '\n']
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

    console.log(boldIndexes)
    console.log(italicIndexes)
    console.log(monospacedIndexes)
    console.log(preformattedIndexes)
    console.log(newParagraphIndexes)
    console.log(
        isMarkdownCorrect(
            boldIndexes,
            italicIndexes,
            monospacedIndexes,
            preformattedIndexes
        )
    )
}

markdownFunction('`**Hello\n\n**`')
