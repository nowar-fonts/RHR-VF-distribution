'use strict';

import './bs-custom.scss';

import InstancerWorker from './instancer.worker.js';

async function loadLivePreviewFont() {
	const woffA = require('./rhr-preview');
	const font = new FontFace('RHR SC', `url(data:font/woff2;base64,${woffA})`);
	await font.load();
	document.fonts.add(font);
}
loadLivePreviewFont();

const exports = {
	InstancerWorker,
};
export default exports;
window.modMain = exports;
