# Builds the browser bundle for aycraft
browserify ./browser-shim.js --standalone RS -o ./dist/aycraft.js -t babelify

# Copy the aycraft.js file to ./examples/browser
cp ./dist/aycraft.js ./browser/aycraft.js

# Copy the aycraft.js file to ../mantra/mantra-client/public
cp ./dist/aycraft.js ../mantra/mantra-client/public/aycraft.js

# Copy the aycraft.js file to ../yantra.gg/public/js
cp ./dist/aycraft.js ../yantra.gg/public/aycraft.js
# Copy the aycraft.min.js file to ../yantra.gg/public/js
cp ./dist/aycraft.min.js ../yantra.gg/public/aycraft.min.js

# Copy the ./examples/browser folder to ../yantra.gg/public/aycraft
# cp -r ./examples/browser/ ../yantra.gg/public/aycraft


# Minifies the generated bundle and creates a source map
uglifyjs ./dist/aycraft.js --compress --mangle --source-map "url='aycraft.min.js.map',root='../',includeSources" -o ./dist/aycraft.min.js
