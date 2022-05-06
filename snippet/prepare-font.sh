#!/bin/bash

pyftsubset rhr/ResourceHanRoundedSC-VF.otf \
	--text="Scythe of Elune" \
	--text="The weapon you now hold is a physical, tangible representation of both the divine and the savage, of serenity and untamed ferocity. The scythe is not only a weapon but a symbol. Perhaps its greatest lesson is that the traits of tranquility and furor exist within all living beings, and sometimes the best we can hope for... is to find balance. May the Scythe of Elune grant you the strength to destroy your enemies, and the wisdom to know when to stay your hand." \
	--text="你手中的这把武器既代表着圣洁，也体现了残暴，它是宁静与狂暴相结合的实体。这把镰刀不仅仅是武器，也是一种象征。或许它蕴含着这样的道理：所有生灵都拥有安宁与残暴这两种特质。而我们能做的，便是……在两者之间找到平衡。愿月神镰刀赐予你消灭强敌的力量，以及明白该何时停手的睿智。" \
	--output-file=rhr/ResourceHanRoundedSC-VF.preview.woff2 \
	--flavor=woff2 \
	--notdef-glyph --notdef-outline \
	--no-recommended-glyphs \
	--layout-features= --layout-scripts= \
	--no-hinting \
	--desubroutinize \
	--name-languages=0x0409 \
	--obfuscate-names \
	--no-glyph-names \
	--recalc-bounds \
	--no-recalc-timestamp \
	--no-canonical-order \
	--prune-unicode-ranges \
	--recalc-average-width \
	--recalc-max-context \
	--timing

node snippet/dump-blob.js rhr/ResourceHanRoundedSC-VF.preview.woff2 >src/rhr-preview.js

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
	--obfuscate-names \
	--no-glyph-names \
	--recalc-bounds \
	--no-recalc-timestamp \
	--no-canonical-order \
	--prune-unicode-ranges \
	--recalc-average-width \
	--recalc-max-context \
	--timing

zstd --ultra -22 --threads=0 --force rhr/ResourceHanRoundedSC-VF.WoWG.otf -o rhr/ResourceHanRoundedSC-VF.WoWG.otf.zst

node snippet/dump-blob.js rhr/ResourceHanRoundedSC-VF.WoWG.otf.zst >src/rhr-font.js
