const { markdownFunction } = require('./markdown.js')

test('empty input', () => {
    const input = ''
    const expectedOutput = '<p></p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with no markdown symbols', () => {
    const input = 'some input'
    const expectedOutput = '<p>some input</p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with bold and italic symbols', () => {
    const input = '**bold** _italic_'
    const expectedOutput = '<p><b>bold</b> <i>italic</i></p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with monospaced symbols', () => {
    const input = '`monospaced`'
    const expectedOutput = '<p><code>monospaced</code></p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with preformatted symbols', () => {
    const input = '```preformatted```'
    const expectedOutput = '<p><pre>preformatted</pre></p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with new paragraphs', () => {
    const input = 'paragraph 1\n\nparagraph 2'
    const expectedOutput = '<p>paragraph 1</p><p>paragraph 2</p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with mixed markdown symbols', () => {
    const input = '**bold** _italic_ `monospaced` ```preformatted```'
    const expectedOutput =
        '<p><b>bold</b> <i>italic</i> <code>monospaced</code> <pre>preformatted</pre></p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('input with nested markdown symbols', () => {
    const input = '**_bold italic_**'
    const expectedOutput = false

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('tags inside preformatted', () => {
    const input = '```**_paragraph_**```'
    const expectedOutput = '<p><pre>**_paragraph_**</pre></p>'

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})

test('tags not closed', () => {
    const input = '**bold'
    const expectedOutput = false

    const result = markdownFunction(input)

    expect(result).toBe(expectedOutput)
})
