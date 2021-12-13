import * as std from "std"
import * as os from "os"

const out = (msg) => {
    std.out.puts(msg);
    std.out.flush();
}
const bg_bar_color = "#000000";

const run = cmd => {
    const prog = std.popen(cmd, "r");
    let r, msg = "";
    while ((r = prog.getline()) != null) {
      msg += r
    }
    return msg;
}

out('{ "version": 1}\n[\n[]')

let order = [];
let prevBlockColor = bg_bar_color;
const sep = (color, bg) => order.push({
  "full_text": "",
  "separator": false,
  "separator_block_width": 0,
  "border": bg_bar_color,
  "border_left": 0,
  "border_right": 0,
  "border_top": 0,
  "border_bottom": 0,
  "color": color,
  "background": bg
})
const common = (block, useSep=true) => {
  if(block.color) {
    if(useSep) sep(block.background, prevBlockColor);
    prevBlockColor = block.background;
  }
  order.push(Object.assign({
    "border": bg_bar_color,
    "separator": false,
    "separator_block_width": 0,
    "border_top": 0,
    "border_bottom": 0,
    "border_left": 0,
    "border_right": 0
  }, block))
};

const sendOut = () => {
  prevBlockColor = bg_bar_color;
  for(let i = 0; i < 8; i++) common({
		name: "hiii" + i,
		full_text: `${run('date "+%l:%M %P"')}`,
    background: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
    color: "#000000"
	})
	out("," + JSON.stringify(order))
	order = [];
	os.setTimeout(sendOut, 5000);
}

sendOut();