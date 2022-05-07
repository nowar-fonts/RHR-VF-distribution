'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FontIo } from 'ot-builder';
import { decompress as zstdDecompress } from 'fzstd';

import InstancerWorker from './instancer.worker.js';

function loadSfnt() {
	const otfZstdA = require('./rhr-font');
	const otfZstdB = Buffer.from(otfZstdA, 'base64');
	const otfB = Buffer.from(zstdDecompress(
		Uint8Array.from(otfZstdB)
	));
	const sfnt = FontIo.readSfntOtf(otfB);
	return sfnt;
}
const sfnt = loadSfnt();

async function loadLivePreviewFont() {
	const woffA = require('./rhr-preview');
	const font = new FontFace('RHR SC', `url(data:font/woff2;base64,${woffA})`);
	await font.load();
	document.fonts.add(font);
}
loadLivePreviewFont();

const exports = {
	sfnt,
	InstancerWorker,
};
export default exports;
window.modMain = exports;
