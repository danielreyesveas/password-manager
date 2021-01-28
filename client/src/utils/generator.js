import { phonetic } from "./phonetic";

const CharRanges = {
	upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
	lower: "abcdefghijkmnpqrstuvwxyz",
	digits: "123456789",
	special: "!@#$%^&*_+-=,./?;:`\"~'\\",
	brackets: "(){}[]<>",
	high:
		"¡¢£¤¥¦§©ª«¬®¯°±²³´µ¶¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ",
	ambiguous: "O0oIl",
};

const DefaultCharRangesByPattern = {
	A: CharRanges.upper,
	a: CharRanges.lower,
	1: CharRanges.digits,
	"*": CharRanges.special,
	"[": CharRanges.brackets,
	Ä: CharRanges.high,
	0: CharRanges.ambiguous,
};

const getBytes = (len) => {
	var Salsa20 = require("./salsa20"),
		CryptoEngine = require("./crypto-engine");

	var key = new Uint8Array(32),
		nonce = new Uint8Array(8);
	for (var q = 0; q < key.length; q++) {
		key[q] = Math.random() * 0xff;
	}
	for (var j = 0; j < nonce.length; j++) {
		nonce[q] = Math.random() * 0xff;
	}
	var algo = new Salsa20(key, nonce);
	if (!len) {
		return new Uint8Array(0);
	}
	algo.getBytes(Math.round(Math.random() * len) + 1);
	var result = algo.getBytes(len);
	var cryptoBytes = CryptoEngine.random(len);
	for (var i = cryptoBytes.length - 1; i >= 0; --i) {
		result[i] ^= cryptoBytes[i];
	}
	return result;
};

const PasswordGenerator = {
	generate(opts) {
		opts.length = Number(opts.length);
		if (!opts || typeof opts.length !== "number" || opts.length < 0) {
			return "";
		}
		if (opts.name === "Pronounceable") {
			return this.generatePronounceable(opts);
		}
		const ranges = Object.keys(CharRanges)
			.filter((r) => opts[r])
			.map((r) => CharRanges[r]);
		if (opts.include && opts.include.length) {
			ranges.push(opts.include);
		}
		if (!ranges.length) {
			return "";
		}
		const rangesByPatternChar = {
			...DefaultCharRangesByPattern,
			X: ranges.join(""),
			I: opts.include || "",
		};
		const pattern = opts.pattern || "X";
		const randomBytes = getBytes(opts.length);
		const chars = [];
		for (let i = 0; i < opts.length; i++) {
			const rand = Math.round(Math.random() * 1000) + randomBytes[i];
			const patternChar = pattern[i % pattern.length];
			const range = rangesByPatternChar[patternChar];
			const char = range ? range[rand % range.length] : patternChar;
			chars.push(char);
		}

		return chars.join("");
	},

	generatePronounceable(opts) {
		const pass = phonetic.generate({
			length: opts.length,
		});
		let result = "";
		const upper = [];
		let i;
		if (opts.upper) {
			for (i = 0; i < pass.length; i += 8) {
				upper.push(Math.floor(Math.random() * opts.length));
			}
		}
		for (i = 0; i < pass.length; i++) {
			let ch = pass[i];
			if (upper.indexOf(i) >= 0) {
				ch = ch.toUpperCase();
			}
			result += ch;
		}
		return result.substr(0, opts.length);
	},

	deriveOpts(password) {
		const opts = {};
		let length = 0;
		if (password) {
			const charRanges = CharRanges;
			password.forEachChar((ch) => {
				length++;
				ch = String.fromCharCode(ch);
				for (const [range, chars] of Object.entries(charRanges)) {
					if (chars.indexOf(ch) >= 0) {
						opts[range] = true;
					}
				}
			});
		}
		opts.length = length;
		return opts;
	},
};

export { PasswordGenerator, CharRanges };
