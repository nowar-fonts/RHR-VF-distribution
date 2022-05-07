'use strict';

const isBrowser = (typeof document == 'object' && typeof window == 'object');

isBrowser && require('bootstrap/dist/css/bootstrap.min.css');

const { Ot, FontIo, Rectify } = require('ot-builder');
const fzstd = require('fzstd');

async function loadLivePreviewFont() {
	const woffA = require('./rhr-preview');
	const font = new FontFace('RHR SC', `url(data:font/woff2;base64,${woffA})`);
	await font.load();
	document.fonts.add(font);
}

isBrowser && loadLivePreviewFont();

function loadSfnt() {
	const otfZstdA = require('./rhr-font');
	const otfZstdB = Buffer.from(otfZstdA, 'base64');
	const otfB = Buffer.from(fzstd.decompress(
		Uint8Array.from(otfZstdB)
	));
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

const config = {
	version: {
		head: 1.910,
		name: "1.910",
	},
	vendor: {
		id: 'NOWR',
		name: 'Nowar Typeface',
		url: 'https://github.com/nowar-fonts',
	},
	designer: 'Cyano Hao (round all glyphs); Ryoko NISHIZUKA 西塚涼子 (kana, bopomofo & ideographs); Paul D. Hunt (Latin, Greek & Cyrillic); Sandoll Communications 산돌커뮤니케이션, Soo-young JANG 장수영 & Joo-yeon KANG 강주연 (hangul elements, letters & syllables)',
	copyright: "Copyright © 2018—2022 Cyano Hao. Portions © 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'.",
	license: {
		description: 'This Font Software is licensed under the SIL Open Font License, Version 1.1. This Font Software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the SIL Open Font License for the specific language, permissions and limitations governing your use of this Font Software.',
		url: 'https://scripts.sil.org/OFL',
	},
};

function makeNameEntry(nameId, value) {
	return {
		platformID: 3,
		encodingID: 1,
		languageID: 0x0409,
		nameID: nameId,
		value: value,
	}
}

function makeInstanceNameTable(weight, roundness) {
	const nameId = Ot.Name.NameID;

	const family = `Resource Han Rounded SC (Nowar Distribution)`;
	const psFamily = `Nowar-ResourceHanRoundedSC`;
	const fullname = `${family} R${roundness} W${weight}`;
	const result = [
		makeNameEntry(nameId.Copyright, config.copyright),
		makeNameEntry(nameId.LegacyFamily, fullname),
		makeNameEntry(nameId.LegacySubfamily, 'Regular'),
		makeNameEntry(nameId.UniqueFontId, `${config.vendor.id}: ${fullname}`),
		makeNameEntry(nameId.FullFontName, fullname),
		makeNameEntry(nameId.VersionString, `Version ${config.version.name}`),
		makeNameEntry(nameId.PostscriptName, `${psFamily}-R${roundness}W${weight}`),
		makeNameEntry(nameId.Manufacturer, config.vendor.name),
		makeNameEntry(nameId.Designer, config.designer),
		makeNameEntry(nameId.UrlVendor, config.vendor.url),
		makeNameEntry(nameId.LicenseDescription, config.license.description),
		makeNameEntry(nameId.LicenseInfoUrl, config.license.url),
		makeNameEntry(nameId.PreferredFamily, family),
		makeNameEntry(nameId.PreferredSubfamily, `R${roundness} W${weight}`),
		makeNameEntry(nameId.WwsFamily, `${family} R${roundness}`),
		makeNameEntry(nameId.WwsSubfamily, `W${weight}`),
	];
	return result;
}

function buildInstanceMetaData(font, param) {
	const { weight, roundness } = param;

	font.head.fontRevision = config.version.head;
	font.head.macStyle = weight == 700 ? Ot.Head.MacStyle.Bold : 0;

	font.os2.achVendID = config.vendor.id;
	font.os2.usWeightClass = weight;
	font.os2.fsSelection = Ot.Os2.FsSelection.USE_TYPO_METRICS | (weight == 700 ? Ot.Os2.FsSelection.BOLD : 0) | (weight == 400 ? Ot.Os2.FsSelection.REGULAR : 0);

	font.name.records = makeInstanceNameTable(weight, roundness);
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
	progressPane.innerHTML = '<p>Loading Resource Han Rounded...<br>正在加载 Resource Han Rounded……</p>';
	const font = fontFromSfnt();
	progressPane.innerHTML += '<p>Instancing Resource Han Rounded...<br>正在抽取单一样式……</p>';
	instanceFont(font, [['wght', normaliseWeight(weight)], ['ROND', normaliseRoundness(roundness)]], progressPane);
	progressPane.innerHTML += '<p>Generating metadata for your instance...<br>正在生成元数据……</p>';
	convertToCff1(font);
	buildInstanceMetaData(font, { weight, roundness });
	return font;
}

function saveToDataUrl(font, progressPane) {
	progressPane.innerHTML += '<p>Generating OTF file...<br>正在生成 OTF 文件……</p>';
	const sfnt = FontIo.writeFont(font);
	const otfB = FontIo.writeSfntOtf(sfnt);
	const otfA = otfB.toString('base64');
	progressPane.innerHTML += '<p>Done.<br>完成。</p>';
	return 'data:font/otf;base64,' + otfA;
}

module.exports = {
	generateRhrInstance,
	saveToDataUrl,
};

isBrowser && (window.modMain = module.exports);
