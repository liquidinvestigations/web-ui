var cpx = require("cpx");

var assetsPath = './src/assets';

var deps = [
    {
        from: './node_modules/jquery/dist/jquery.min.js',
        to: assetsPath + '/jquery/'
    },
    {
        from: './node_modules/bootstrap/dist/**',
        to: assetsPath + '/bootstrap/'
    },
    {
        from: './node_modules/vanilla-text-mask/dist/vanillaTextMask.js',
        to: assetsPath + '/vanillaTextMask'
    }
];


for (var i in deps) {
    cpx.copy(deps[i].from, deps[i].to);
}

console.log("Done copy external");
