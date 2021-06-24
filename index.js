const moment = require('moment')
const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()
const grid = new contrib.grid({
  rows: 6,
  cols:2,
  screen: screen
})
const lineConfig = (title) => ({ 
  style: { 
    line: "yellow",
    text: "green",
    baseline: "black"
  },
  xLabelPadding: 3,
  xPadding: 5,
  label: title,
})
const line = grid.set(1,0,3,1, contrib.line, lineConfig('line1'))
const line2 = grid.set(1,1,3,1, contrib.line, lineConfig('line2'))
let lineData = {
  x: [1, 2, 3, 4],
  y: [5, 1, 7, 5]
}
let lineData2 = {
  x: [1, 2, 3, 4],
  y: [5, 1, 7, 10]
}
line.setData([lineData])
line2.setData([lineData2])

setInterval(() => {
  lineData = _updateLineData(lineData)
  lineData2 = _updateLineData(lineData2)
  line.setData(lineData)
  line2.setData(lineData2)
  screen.render()
}, 500)

const _updateLineData = (lineData) => {
  const maxLength = 100 
  const x = lineData.x[lineData.x.length - 1]
  lineData.x.push(x + 1)
  lineData.y.push(Math.random()*10+1)
  if(lineData.x.length > maxLength) {
    lineData.x.shift()
    lineData.y.shift()
  }
  return lineData
}

const logConfig = (title) => ({
  fg: "green",
  selectedFg: "blue",
  label: title 
})
const log = grid.set(4,0,2,2, contrib.log, logConfig('LOG'))

setInterval(() => {
  const now = moment().format('YYYY/MM/DD HH:mm:ss')
  const msg = `now is ${now}`
  log.log(msg)
}, 1000)

const markdown = grid.set(0,0,1,2, contrib.markdown, null)
setInterval(() => {
  const price = parseInt(Math.random() * 20000 + 3500000).toLocaleString()
  const rate = (Math.random() * 1 + 3).toFixed(2)
  const spread = parseInt(Math.random() * 2000 + 50).toLocaleString()
  const msg = `PRICE: \`${price}\` RATE: \`${rate}\` SPREAD: \`${spread}\``
  markdown.setMarkdown(msg)
})

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render()
