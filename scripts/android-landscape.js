// Ajusta o projeto Android gerado pelo Capacitor: tela só na horizontal, tela cheia e tela sempre ligada.
const fs = require('fs');
const f = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(f, 'utf8');
if (!x.includes('screenOrientation')) x = x.replace('<activity', '<activity android:screenOrientation="sensorLandscape"');
fs.writeFileSync(f, x);
const sf = 'android/app/src/main/res/values/styles.xml';
if (fs.existsSync(sf)) {
  let s = fs.readFileSync(sf, 'utf8');
  s = s.replace(/<style name="AppTheme\.NoActionBar"[^>]*>/, m => m + '\n        <item name="android:windowFullscreen">true</item>\n        <item name="android:windowKeepScreenOn">true</item>');
  fs.writeFileSync(sf, s);
}
console.log('Android ajustado: horizontal, tela cheia, tela ligada.');
