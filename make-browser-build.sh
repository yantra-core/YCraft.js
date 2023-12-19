# Builds the browser bundle for realstone
browserify ./browser-shim.js --standalone RS -o ./dist/realstone.js -t babelify

# Copy the realstone.js file to ./examples/browser
cp ./dist/realstone.js ./browser/realstone.js

# Copy the realstone.js file to ../mantra/mantra-client/public
cp ./dist/realstone.js ../mantra/mantra-client/public/realstone.js

# Copy the realstone.js file to ../yantra.gg/public/js
cp ./dist/realstone.js ../yantra.gg/public/realstone.js
# Copy the realstone.min.js file to ../yantra.gg/public/js
cp ./dist/realstone.min.js ../yantra.gg/public/realstone.min.js

# Copy the ./examples/browser folder to ../yantra.gg/public/realstone
# cp -r ./examples/browser/ ../yantra.gg/public/realstone


# Minifies the generated bundle and creates a source map
uglifyjs ./dist/realstone.js --compress --mangle --source-map "url='realstone.min.js.map',root='../',includeSources" -o ./dist/realstone.min.js
