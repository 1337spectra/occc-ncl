function convertToBBCode() {
  // Get the HTML input
  var html = document.getElementById("html-input").value;
  // Convert the HTML to BBCode
  var bbcode = html

      // Replace block-level elements
      .replace(/<h1(?:\s+id="([^"]*)")?>(.*?)<\/h1>/gs, function(match, id, content) {if (id) {return `[h1|${id}]${content}[/h1]`;}return `[h1]${content}[/h1]`;})
      .replace(/<h2(?:\s+id="([^"]*)")?>(.*?)<\/h2>/gs, function(match, id, content) {if (id) {return `[h2|${id}]${content}[/h2]`;}return `[h2]${content}[/h2]`;})
      .replace(/<h3(?:\s+id="([^"]*)")?>(.*?)<\/h3>/gs, function(match, id, content) {if (id) {return `[h3|${id}]${content}[/h3]`;}return `[h3]${content}[/h3]`;})
      .replace(/<h4(?:\s+id="([^"]*)")?>(.*?)<\/h4>/gs, function(match, id, content) {if (id) {return `[h4|${id}]${content}[/h4]`;}return `[h4]${content}[/h4]`;})
      .replace(/<h5(?:\s+id="([^"]*)")?>(.*?)<\/h5>/gs, function(match, id, content) {if (id) {return `[h5|${id}]${content}[/h5]`;}return `[h5]${content}[/h5]`;})
      .replace(/<h3 id='([^']+)'>/gs, "[h3|$1]")
      .replace(/<p>(.*?)<\/p>/gs, function (match, content){return `[p]${content}[/p]`})
      .replace(/<p class="([^"]+)">(.*?)<\/p>/gs, function (match, className, content){return `[container:${className}][p]${content}[/p][/container]`})
      .replace(/<div class="col">(.*?)<\/div>/gs, function (match, content){return `[col]${content}[/col]`;})
      .replace(/<div>(.*?)<\/div>/gs, function (match, content){return `[container:CLASS_HERE]${content}[/container]`})
      .replace(/<div class="([^"]+)">(.*?)<\/div>/gs, function (match, className, content){return `[container:${className}]${content}[/container]`})
      .replace(/<div class="/gs, "[container:")
      .replace(/<div>/gs, "[container:CLASS_HERE]")
      .replace(/<\/div>/gs, "[/container]")
      .replace(/<div class="row">(.*?)<\/div>/gs, function (match, content){return `[row]${content}[/row]`;})
      .replace(/<blockquote>(.*?)<\/blockquote>/gs, function (match, content){return `[quote]${content}[/quote]`})
      .replace(/<details>(.*?)<\/details>/gs, function (match, content){return `[spoiler]${content}[/spoiler]`})
      .replace(/<ul class="([^"]+)">(.*?)<\/ul>/gs, function (match, className, content){return `[container:${className}][ul]${content}[/ul][/container]`;})
      .replace(/<ul>(.*?)<\/ul>/gs, function (match, content){return `[ul]${content}[/ul]`})
      .replace(/<ol class="([^"]+)">(.*?)<\/ol>/gs, function (match, className, content){return `[container:${className}][ol]${content}[/ol][/container]`;})
      .replace(/<ol>(.*?)<\/ol>/gs, function (match, content){return `[ol]${content}[/ol]`})
      .replace(/<li class="([^"]+)">(.*?)<\/li>/gs, function (match, className, content){return `[section:${className}][li]${content}[/li][/section]`;})
      .replace(/<li>(.*?)<\/li>/gs, function (match, content){return `[li]${content}[/li]`})
      .replace(/<table>(.*?)<\/table>/gs, function (match, content){return `[table]${content}[/table]`;})
      .replace(/<tr>(.*?)<\/tr>/gs, function (match, content){return `[tr]${content}[/tr]`;})
      .replace(/<th style='width:(\d+)%'>/gs, function (match, content){return `[th:$1]${content}[/th]`;})
      .replace(/<th>(.*?)<\/th>/gs, function (match, content){return `[th]${content}[/th]`;})
      .replace(/<td style='width:(\d+)%'>/gs, function (match, content){return `[td:$1]${content}[/td]`;})
      .replace(/<td>(.*?)<\/td>/gs, function (match, content){return `[td]${content}[/td]`;})
    
      // Replace inline elements
      .replace(/<u>(.*?)<\/u>/gs, function (match, content){return `[u]${content}[/u]`})
      .replace(/<b>(.*?)<\/b>/gs, function (match, content){return `[b]${content}[/b]`})
      .replace(/<em>(.*?)<\/em>/gs, function (match, content){return `[i]${content}[/i]`})
      .replace(/<i>(.*?)<\/i>/gs, function (match, content){return `[i]${content}[/i]`})
      .replace(/<del>(.*?)<\/del>/gs, function (match, content){return `[s]${content}[/s]`})
      .replace(/<small>(.*?)<\/small>/gs, function (match, content){return `[small]${content}[/small]`})
      .replace(/<sup>(.*?)<\/sup>/gs, function (match, content){return `[sup]${content}[/sup]`})
      .replace(/<sub>(.*?)<\/sub>/gs, function (match, content){return `[sub]${content}[/sub]`})
      .replace(/<pre>(.*?)<\/pre>/gs, function (match, content){return `[noparse]${content}[/noparse]`})
      .replace(/<p style="text-align: left;">(.*?)<\/p>/gs, function (match, content){return `[left]${content}[/left]`;})
      .replace(/<p style="text-align: center;">(.*?)<\/p>/gs, function (match, content){return `[center]${content}[/center]`;})
      .replace(/<p style="text-align: right;">(.*?)<\/p>/gs, function (match, content){return `[right]${content}[/right]`;})
      .replace(/<p style="text-align: justify;">(.*?)<\/p>/gs, function (match, content){return `[justify]${content}[/justify]`;})
      .replace(/<dropcap>(.*?)<\/dropcap>/gs, function (match, content){return `[dc]${content}[/dc]`})
      .replace(/<span class="dropcap">(.*?)<\/span>/gs, function(match, content) {return `[dc]${content}[/dc]`;})
      .replace(new RegExp('<i class="(.*?)"></i>', "g"), "[section:$1] [/section]")
      .replace(/<img src="([^"]*)" style="width: ([\d\.]+)(em|rem|px); height: ([\d\.]+)(em|rem|px)">/gs, function (match, src, width, widthUnit, height, heightUnit){if (widthUnit !== "px"){width = width * 16;}return `[img:${src}|center|${width}]`;})
      .replace(/<span style="color:(\w+)">(.*?)<\/span>/gs, function (match, color, content){return `[color:${color}]${content}[/color]`;})
      .replace(/<a href="(.*?)">(.*?)<\/a>/gs, function(match, url, content) {return `[url:${url}]${content}[/url]`;})
      .replace(/<span id='([^']+)'>/gs, "[anchor|$1]")
      .replace(/<span class="/gs, "[section:")
      .replace(/<\/span>/gs, "[/section]")
      .replace(/<span>(.*?)<\/span>/gs, function (match, content){return `[section:CLASS_HERE]${content}[/section]`})
      .replace(/<span class="([^"]+)">(.*?)<\/span>/gs, function (match, className, content){return `[section:${className}]${content}[/section]`})
    
      // Replace attributes
      .replace(/<abbr title='([^']+)'>/g, "[tooltip:$1]")
      .replace(/<\/abbr>/gs, "[/tooltip]")
      .replace(/<br>/gs, "[br]")
      .replace(/<br \/>/gs, "[br]")
      .replace(/<hr>/gs, "[hr]")
    
      // Replace special characters
      .replace(/;">/gs, "]")
      .replace(/class="/gs, ":")
      .replace(/" \/>/gs, "]")
      .replace(/"\/>/gs, "]")
      .replace(/src="/gs, ":")
      .replace(/="/gs, ":")
      .replace(/">/gs, "]")
      .replace(/>/gs, "]")
      .replace(/</gs, "[")

  // Set the BBCode output
  document.getElementById("bbcode-output").value = bbcode;
}
