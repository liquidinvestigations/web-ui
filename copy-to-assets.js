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
        from: './node_modules/bootstrap-notify/bootstrap-notify.min.js',
        to: assetsPath + '/bootstrap-notify/'
    },
    {
        from: './node_modules/animate.css/animate.min.css',
        to: assetsPath + '/animate.css/'
    },
    {
        from: './node_modules/vanilla-text-mask/dist/vanillaTextMask.js',
        to: assetsPath + '/vanillaTextMask'
    },
    {
        from: './node_modules/font-awesome/css/font-awesome.min.css',
        to: assetsPath + '/font-awesome/css/'
    },
    {
        from: './node_modules/font-awesome/fonts/**',
        to: assetsPath + '/font-awesome/fonts/'
    }
];


for (var i in deps) {
    cpx.copy(deps[i].from, deps[i].to);
}

console.log("Done copy external");
