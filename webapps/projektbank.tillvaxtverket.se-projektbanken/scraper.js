/*

 http://projektbank.tillvaxtverket.se/projektbanken#page=eruf

 json data via POST in Browser to http://projektbank.tillvaxtverket.se/projektbanken/req/page-render

 */

var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./manual.json'));

var cols = json.columns;
var result = json.rows.map(function (row, i) {
	var o = {_source: 'http://projektbank.tillvaxtverket.se/projektbanken#page=eruf'};
	row.forEach(function (cell, j) {
		var cat = cols[j].name.toLowerCase().replace(':', '').replace(/\//g, '_').replace(/ /g, '_');
		if (cell.v)
			o[cat] = cell.o;
		else
			o[cat] = cell;
	});
	o._source = 'http://projektbank.tillvaxtverket.se/projektbanken';
	return o;
}).filter(function (o) {
	return o["ärende-id"] !== 'Totaler';
});

fs.writeFileSync('data.json', JSON.stringify(result, null, '\t'));
console.log('done');