const svgPlugin = {
    name: 'svg',
    setup(build) {
        build.onLoad({ filter: /\.svg$/ }, async args => {
            // Load the text from SVG file
            const src = await require('fs')
                .promises
                .readFile(args.path, { encoding: 'utf-8' });
            // Create an anonymous component for it
            return {
                contents: `
                import { Component } from "preact";
                export default class extends Component {
                    componentDidMount() {
                        for (let [name, val] of Object.entries(this.props)) {
                            name = (name === 'className') ? 'class' : name;
                            this.base.setAttribute(name, val);
                        }
                    }
                    render(props) {
                        return ${src}
                    }
                }`,
                loader: 'jsx',
            }
        });
    },
}
const opt = {
    entryPoints: ['src/index.jsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    inject: ['./inject.js'],
    loader: {
        '.png': 'file',
        '.jpg': 'file',
        '.mp3': 'file',
        '.wav': 'file',
        '.svg': 'file',
    },
    // plugins: [svgPlugin],
    // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outdir: 'out'
};

if (process.argv.includes("dev")) {
    require('esbuild')
        .serve({ servedir: 'out' }, opt)
        .then(s => console.log(`Serving on 127.0.0.1:${s.port}`))
}
else {
    require('esbuild').buildSync(opt);
}