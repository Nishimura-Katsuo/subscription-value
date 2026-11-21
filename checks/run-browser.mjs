// Run checks/browser.js against docs/index.html in headless Chrome or Edge.
// Usage: node checks/run-browser.mjs [page.html] [script.js]; set CHROME to override the browser path.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const page = process.argv[2] ?? fileURLToPath(new URL('../docs/index.html', import.meta.url));
const script = process.argv[3] ?? fileURLToPath(new URL('./browser.js', import.meta.url));
const browser = [process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(path => path && existsSync(path));
if (!browser) throw new Error('No Chrome or Edge found; set CHROME to its executable path');

const port = 9333;
const profile = mkdtempSync(join(tmpdir(), 'subscription-value-browser-'));
const child = spawn(browser, ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + profile, 'about:blank'], {stdio: 'ignore'});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let exitCode = 1;
try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); } catch {}
    if (!target) await sleep(200);
  }
  if (!target) throw new Error('Browser did not expose a debugging target');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = event => { const message = JSON.parse(event.data); pending.get(message.id)?.(message); pending.delete(message.id); };
  const send = (method, params = {}) => new Promise(resolve => { pending.set(++id, resolve); ws.send(JSON.stringify({id, method, params})); });
  await send('Page.enable');
  await send('Runtime.enable');
  // Headless pages are unfocused by default, which breaks the keyboard-focus assertions.
  await send('Emulation.setFocusEmulationEnabled', {enabled: true});
  const loaded = new Promise(resolve => { const previous = ws.onmessage; ws.onmessage = event => { previous(event); if (JSON.parse(event.data).method === 'Page.loadEventFired') resolve(); }; });
  await send('Page.navigate', {url: pathToFileURL(page).href});
  await loaded;
  const {result} = await send('Runtime.evaluate', {expression: readFileSync(script, 'utf8'), awaitPromise: true, returnByValue: true});
  if (result.exceptionDetails) console.error('Browser checks failed: ' + (result.exceptionDetails.exception?.description ?? result.exceptionDetails.text));
  else { console.log('Browser checks passed.'); exitCode = 0; }
  ws.close();
} finally {
  child.kill();
  await sleep(500);
  try { rmSync(profile, {recursive: true, force: true}); } catch {}
}
process.exit(exitCode);
