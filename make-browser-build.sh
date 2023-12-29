# Builds the browser bundle for ycraft
browserify ./browser-shim.js --standalone YC -o ./dist/ycraft.js -t babelify

# Copy the ycraft.js file to ./examples/browser
cp ./dist/ycraft.js ./browser/ycraft.js

# Copy the ycraft.js file to ../mantra/mantra-client/public
cp ./dist/ycraft.js ../mantra/mantra-client/public/ycraft.js

# Copy the ycraft.js file to ../yantra.gg/public/js
cp ./dist/ycraft.js ../yantra.gg/public/ycraft.js
# Copy the ycraft.min.js file to ../yantra.gg/public/js
cp ./dist/ycraft.min.js ../yantra.gg/public/ycraft.min.js

# Copy the ./examples/browser folder to ../yantra.gg/public/ycraft
# cp -r ./examples/browser/ ../yantra.gg/public/ycraft


# Minifies the generated bundle and creates a source map
uglifyjs ./dist/ycraft.js --compress --mangle --source-map "url='ycraft.min.js.map',root='../',includeSources" -o ./dist/ycraft.min.js
