const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()
const grid = new contrib.grid({
  rows: 1,
  cols:2,
  screen: screen
})
const lineConfig = { 
  style: { 
    line: "yellow",
    text: "green",
    baseline: "black"
  },
  xLabelPadding: 3,
  xPadding: 5,
  label: 'Title',
}
const line = grid.set(0,0,1,1, contrib.line, lineConfig)
const line2 = grid.set(0,1,1,1, contrib.line, lineConfig)
const lineData = {
  x: ['t1', 't2', 't3', 't4'],
  y: [5, 1, 7, 5]
}
line.setData([lineData])
line2.setData([lineData])

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render()
