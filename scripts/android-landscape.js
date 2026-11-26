// Ajusta o projeto Android gerado pelo Capacitor: tela só na horizontal, tela cheia e tela sempre ligada.
const fs = require('fs'), path = require('path');
// 1) horizontal
const f = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(f, 'utf8');
if (!x.includes('screenOrientation')) x = x.replace('<activity', '<activity android:screenOrientation="sensorLandscape"');
fs.writeFileSync(f, x);
// 2) tela cheia pelo tema (windowFullscreen é um atributo de tema válido)
const sf = 'android/app/src/main/res/values/styles.xml';
if (fs.existsSync(sf)) {
  let s = fs.readFileSync(sf, 'utf8');
  if (!s.includes('windowFullscreen')) s = s.replace(/<style name="AppTheme\.NoActionBar"[^>]*>/, m => m + '\n        <item name="android:windowFullscreen">true</item>');
  fs.writeFileSync(sf, s);
}
// 3) tela sempre ligada: não existe atributo de tema para isso; vai como flag da janela na MainActivity
function find(dir, name) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { const r = find(p, name); if (r) return r; } else if (e.name === name) return p;
  }
  return null;
}
const ma = find('android/app/src/main/java', 'MainActivity.java');
if (ma) {
  const pkg = (fs.readFileSync(ma, 'utf8').match(/^package\s+([\w.]+);/m) || [])[1] || 'br.com.entusiasta.jogo';
  fs.writeFileSync(ma, `package ${pkg};

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
`);
}
console.log('Android ajustado: horizontal, tela cheia, tela ligada' + (ma ? '' : ' (MainActivity não encontrada)') + '.');
