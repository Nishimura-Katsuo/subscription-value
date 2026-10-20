// Run after report-code in a browser; throw if the comparison regresses.
(() => {
  const get = id => document.getElementById(id);
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const change = (id, value, event = 'change') => {
    get(id).value = value;
    get(id).dispatchEvent(new Event(event));
  };
  const mode = name => document.querySelector('[data-metric="' + name + '"]').click();
  const rowCount = () => get('rows').querySelectorAll('.model-button').length;
  assert(rowCount() === 26, 'Default task configurations');
  const taskFloors = [...get('floor').options].map(option => Number(option.value));
  const taskScores = [...new Set([0,46,...JSON.parse(get('comparison-data').textContent).filter(model => model.tasks20 !== null && model.intelligence !== null).map(model => model.intelligence)])].sort((a,b) => a-b);
  assert(taskFloors.join(',') === taskScores.join(','), 'AA floor covers every published task score in order');
  change('floor', '47');
  assert([...get('rows').querySelectorAll('tr')].every(row => Number(row.cells[3].textContent) >= 47), 'New AA floor cutoff filters configurations');
  change('floor', '50');
  mode('tasks');
  assert(get('floor').value === '50', 'Clicking the active metric preserves filters');
  get('reset').click();
  assert([...get('floor').options].map(option => Number(option.value)).join(',') === taskFloors.join(','), 'Reset restores generated AA floors');
  const initialValue = document.querySelector('.detail-value').textContent;
  change('budget', '40', 'input');
  assert(document.querySelector('.detail-value').textContent !== initialValue, 'Spend scales task estimates');
  const validValue = document.querySelector('.detail-value').textContent;
  for (const invalid of ['', '0', '1001', '2.5']) {
    change('budget', invalid, 'input');
    assert(!get('budget-error').hidden, 'Invalid spend has visible feedback: ' + invalid);
    assert(get('budget').getAttribute('aria-invalid') === 'true', 'Invalid spend is exposed to assistive technology');
    assert(document.querySelector('.detail-value').textContent === validValue, 'Invalid spend retains last valid estimate');
  }
  change('budget', '20', 'input');
  assert(get('budget-error').hidden, 'Valid spend clears feedback');
  mode('bugs');
  assert(rowCount() === 47 && get('floor').value === '0', 'Bug mode includes all rated configurations');
  assert(get('budget').closest('label').hidden, 'Spend is irrelevant in bug mode');
  assert(document.querySelector('[data-metric="bugs"]').getAttribute('aria-pressed') === 'true', 'Mode switch exposes selection');
  change('provider', 'Claude|ChatGPT');
  assert([...get('rows').querySelectorAll('.model-button')].every(button => /Claude|GPT/.test(button.textContent)), 'Combined subscription filter');
  change('search', 'no-such-configuration', 'input');
  assert(rowCount() === 0 && get('export').disabled, 'Empty results disable export');
  assert(get('detail').textContent.includes('No matching models'), 'Empty result guidance');
  get('reset').click();
  assert(rowCount() === 26 && get('metric').value === 'tasks' && get('budget').value === '20', 'Reset restores defaults');
  change('search', 'GPT-5.6 Sol', 'input');
  assert(rowCount() === 1 && get('rows').textContent.includes('Max'), 'Sol 5.6 Max clears the default intelligence floor');
  change('floor', '0');
  assert(rowCount() === 5 && document.querySelectorAll('.chart-point').length === 5, 'All five Sol 5.6 efforts plot with the floor lowered');
  mode('bugs');
  assert(rowCount() === 4 && document.querySelectorAll('#rows .caveat').length === 3, 'Four Sol 5.6 bug efforts, with three single-run labels');
  get('rows').querySelector('[data-id="sol-5-6-medium"]').click();
  assert(get('detail').textContent.includes('29 / 105') && get('detail').textContent.includes('repeatability unverified'), 'Single-run Sol 5.6 evidence is explicit');
  get('reset').click();
  const point = document.querySelector('.chart-point[data-id="opus-medium"]');
  point.focus();
  assert(document.activeElement === point && point.getAttribute('aria-pressed') === 'true', 'Keyboard selection preserves focus');
  assert(document.querySelector('#rows .selected button').dataset.id === 'opus-medium', 'Chart and table selection agree');
  const label = point.querySelector('.chart-label').getBBox();
  assert(label.x >= geometry().left && label.x + label.width <= geometry().right, 'Selected chart label stays in bounds');
  assert(point.querySelector('.point-hit').getBoundingClientRect().width >= 23.9, 'Chart targets are at least 24 CSS pixels');
  const axis = document.querySelector('.chart-axis');
  assert(parseFloat(getComputedStyle(axis).fontSize) * get('chart').getBoundingClientRect().width / 1000 >= 11.9, 'Chart type remains at least 12 CSS pixels');
  const urls = [], downloads = [];
  const createURL = URL.createObjectURL, revokeURL = URL.revokeObjectURL, click = HTMLAnchorElement.prototype.click;
  try {
    URL.createObjectURL = blob => { urls.push(blob); return 'blob:design-check'; };
    URL.revokeObjectURL = () => {};
    HTMLAnchorElement.prototype.click = function () { downloads.push(this.download); };
    get('export').click();
    mode('bugs');
    get('export').click();
    assert(urls.length === 2 && urls.every(blob => blob.size > 1000), 'Both CSV exports have content');
    assert(downloads[0].includes('tasks-20') && downloads[1].includes('bug-cost'), 'Mode-specific export filenames');
  } finally {
    URL.createObjectURL = createURL;
    URL.revokeObjectURL = revokeURL;
    HTMLAnchorElement.prototype.click = click;
  }
  document.querySelector('[data-open-method]').click();
  assert(get('method').open, 'Method shortcut opens disclosure');
  get('method').open = false;
  get('reset').click();
  document.activeElement.blur();
  window.scrollTo(0, 0);
  assert(document.documentElement.scrollWidth <= innerWidth, 'No page-level horizontal overflow');
  console.log('Browser checks passed: modes, combined filters, empty states, spend validation, reset, keyboard selection, label bounds, CSV exports, method disclosure, and responsive width.');
})();
