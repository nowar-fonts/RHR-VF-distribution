#!/bin/bash

pyftsubset rhr/ResourceHanRoundedSC-VF.otf \
	--unicodes-file=charset/adobe-latin-3.uni --unicodes-file=charset/adobe-cyrillic-1.uni --unicodes-file=charset/adobe-greek-1.uni \
	--unicodes-file=charset/uro.uni --unicodes-file=charset/hangul.uni \
	--unicodes-file=charset/adobe-gb1-2.uni --unicodes-file=charset/adobe-cns1-0.uni --unicodes-file=charset/adobe-japan1-2.uni --unicodes-file=charset/adobe-korea1-1.uni \
	--unicodes-file=charset/cn-general-8105.uni --text-file=charset/jp-freq-2136.txt --text-file=charset/jp-name-863.txt \
	--output-file=rhr/ResourceHanRoundedSC-VF.WoWG.otf \
	--notdef-glyph --notdef-outline \
	--no-recommended-glyphs \
	--layout-features= --layout-scripts= \
	--no-hinting \
	--desubroutinize \
	--name-languages=0x0409 \
	--no-glyph-names \
	--recalc-bounds \
	--no-recalc-timestamp \
	--no-canonical-order \
	--prune-unicode-ranges \
	--recalc-average-width \
	--recalc-max-context \
	--timing

node snippet/dump-rhr-otf.js rhr/ResourceHanRoundedSC-VF.WoWG.otf >src/rhr-font.js
