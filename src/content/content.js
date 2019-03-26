/* global document */
import fs from 'fs';
import path from 'path';
import ext from '../utils/ext';

const inpageContent = fs.readFileSync(path.join(__dirname, '..', '..', 'dev' , 'chrome', 'inject', 'inject.js')).toString();
const inpageSuffix = `//# sourceURL=${ext.runtime.getURL('inject/inject.js')}\n`;
const inpageBundle = `${inpageContent}${inpageSuffix}`;

function injectInpageScript() {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', false);
    scriptTag.textContent = inpageBundle;
    container.insertBefore(scriptTag, container.children[0]);
    // After injecting the script, *run*, remove the script tag.
    container.removeChild(scriptTag);
  } catch (e) {
    // console.error('injection failed', e)
  }
}

injectInpageScript();
