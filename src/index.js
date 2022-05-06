'use strict';

const { Ot, FontIo, Rectify } = require('ot-builder');

function loadSfnt() {
	const otfA = require('./rhr-font');
	const otfB = Buffer.from(otfA, 'base64');
	const sfnt = FontIo.readSfntOtf(otfB);
	return sfnt;
}

const sfnt = loadSfnt();

function fontFromSfnt() {
	const font = FontIo.readFont(sfnt, Ot.ListGlyphStoreFactory);
	return font;
}

function ValueRectifier(instance) {
	const instanceValue = x => Math.round(Ot.Var.Ops.evaluate(x, instance));
	return { coord: instanceValue, cv: instanceValue };
}

function instanceFont(font, parameters) {
	const dims = {};
	for (const axis of font.fvar.axes) {
		const dim = axis.dim;
		const tag = dim.tag;
		dims[tag] = dim;
	}
	const instance = new Map(parameters.map(([tag, value]) => [dims[tag], value]));
	Rectify.inPlaceRectifyFontCoords(
		ValueRectifier(instance),
		Rectify.IdPointAttachRectifier,
		font
	);
	font.fvar = font.avar = font.stat = null;
}

function convertToCff1(font) {
	const oldCff = font.cff;
	const cff = new Ot.Cff.Table(1);
	font.cff = cff;
	cff.postScriptFontName = "CFF2Font"; // fontTools use `CFF2Font` by default, so do we.
	const cid = new Ot.Cff.CID;
	cff.cid = cid;
	cid.registry = 'Adobe';
	cid.ordering = 'Identity';
	cid.supplement = 0;
	cff.topDict.cidCount = font.glyphs.items.length;
	cff.fdArray = oldCff.fdArray;
	cff.fdSelect = oldCff.fdSelect;
}

function normaliseWeight(weight) {
	if (weight <= 200)
		return 0;
	if (weight <= 300)
		return (weight - 200) / 100 * 0.16;
	if (weight <= 400)
		return (weight - 300) / 100 * (0.39 - 0.16) + 0.16;
	if (weight <= 500)
		return (weight - 400) / 100 * (0.56 - 0.39) + 0.39;
	if (weight <= 900)
		return (weight - 500) / 400 * (1 - 0.56) + 0.56;
	return 1;
}

function normaliseRoundness(roundness) {
	return Math.sqrt(roundness / 100) - 1;
}

function generateRhrInstance(weight, roundness, progressPane) {
	progressPane.innerHTML = '<p>Loading Resource Han Rounded...</p>';
	const font = fontFromSfnt();
	progressPane.innerHTML += '<p>Instancing Resource Han Rounded...</p>';
	instanceFont(font, [['wght', normaliseWeight(weight)], ['ROND', normaliseRoundness(roundness)]], progressPane);
	progressPane.innerHTML += '<p>Generating metadata for your instance...</p>';
	convertToCff1(font);
	return font;
}

module.exports = {
	generateRhrInstance
};

if (typeof window == 'object')
	window.modMain = module.exports;
