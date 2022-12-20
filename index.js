import express from 'express'
import { WebC } from '@11ty/webc'

let app = express()
let content = new WebC()

content.defineComponents('components/**.webc')
content.setBundlerMode(true)
content.setInputPath('components/page.webc')

let page = new WebC()
page.setInputPath('index.webc')

let {html: contentHtml, js, css} = await content.compile({
  data: {
    counters: [10, 20, 30]
  }
})

let {html} = await page.compile({
  data: {
    content: contentHtml,
    js: js.join("\n"),
    styles: css,
  }
})

app.get('/', (_, res) => {
  res.send(html)
})

app.listen(3000, () => {
  console.log(`ready at http://localhost:3000`)
})
