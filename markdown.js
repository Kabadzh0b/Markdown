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
    const x1 = markdownInsideOtherMarkdownCheck(
        boldIndexesObject,
        italicIndexesObject
    )
    const x2 = markdownInsideOtherMarkdownCheck(
        italicIndexesObject,
        boldIndexesObject
    )
    const x3 = markdownInsideOtherMarkdownCheck(
        monospacedIndexesObject,
        boldIndexesObject
    )
    const x4 = markdownInsideOtherMarkdownCheck(
        boldIndexesObject,
        monospacedIndexesObject
    )
    const x5 = markdownInsideOtherMarkdownCheck(
        italicIndexesObject,
        monospacedIndexesObject
    )
    const x6 = markdownInsideOtherMarkdownCheck(
        monospacedIndexesObject,
        italicIndexesObject
    )
    return x1 && x2 && x3 && x4 && x5 && x6
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
    for (let i = 0; i < markdown.length; i++) {
        if (markdown[i] === '*' && markdown[i + 1] === '*') {
            boldIndexes.push(i)
            i++
        } else if (
            markdown[i] === '_' &&
            (markdown[i + 1] === ' ' || markdown[i - 1] === ' ')
        ) {
            italicIndexes.push(i)
        } else if (
            markdown[i] === '`' &&
            markdown[i + 1] === '`' &&
            markdown[i + 2] === '`'
        ) {
            preformattedIndexes.push(i)
            i += 2
        } else if (markdown[i] === '`') {
            monospacedIndexes.push(i)
        }
    }

    console.log(boldIndexes)
    console.log(italicIndexes)
    console.log(monospacedIndexes)
    console.log(preformattedIndexes)
    console.log(
        isMarkdownCorrect(
            boldIndexes,
            italicIndexes,
            monospacedIndexes,
            preformattedIndexes
        )
    )
}

markdownFunction('`** Hello ** **`')
