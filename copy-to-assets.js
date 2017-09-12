var cpx = require("cpx");

var deps = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/**'
];

var dest = './src/assets';

for (var i in deps) {
    cpx.copy(deps[i], dest);
}

console.log("Done copy external");
