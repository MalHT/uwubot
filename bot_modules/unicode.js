/**
 * UNICODE - Replaces letters with letterlike symbols
 *
 * To add new mangling modes, add a new object to the charsets array.
 * Make sure the order of characters in the alpha/numeric/punctuation arrays is the same as in the reference arrays
 * Characters in new mangling modes that aren't supported should be "skipped" by making them empty strings
 *
 * TODO: Implement initialization method that makes sure no charset aliases are defined twice
 */

let help = "**Unicode**\n";
help += "Replaces letters with letterlike symbols.\n";
help += "*!mangle `<mode>` `<message>`* - prints `<message>` using letterlike symbols according to `<mode>`.\n";
help += "*!listmanglers* - list all mangler modes.\n";

let reDigits = /^\d+$/;
let reAlpha = /^([a-zA-z])+$/;
let rePunc = /[!\"#\$%&'\(\)\*\+\-\.\/:;<=>\?@\[\\\]\^_`{\|}~]/;

let reference = {
	"alpha": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
	"numeric": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	"punctuation": ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]
};

let charsets = [
	{
		name: "Serif",
		aliases: ["s"],
		variants: [
			{
				name: "Bold",
				aliases: ["", "r", "rg", "b", "bd"],
				charset: {
					"alpha": ["𝐀", "𝐁", "𝐂", "𝐃", "𝐄", "𝐅", "𝐆", "𝐇", "𝐈", "𝐉", "𝐊", "𝐋", "𝐌", "𝐍", "𝐎", "𝐏", "𝐐", "𝐑", "𝐒", "𝐓", "𝐔", "𝐕", "𝐖", "𝐗", "𝐘", "𝐙", "𝐚", "𝐛", "𝐜", "𝐝", "𝐞", "𝐟", "𝐠", "𝐡", "𝐢", "𝐣", "𝐤", "𝐥", "𝐦", "𝐧", "𝐨", "𝐩", "𝐪", "𝐫", "𝐬", "𝐭", "𝐮", "𝐯", "𝐰", "𝐱", "𝐲", "𝐳"],
					"numeric": ["𝟎", "𝟏", "𝟐", "𝟑", "𝟒", "𝟓", "𝟔", "𝟕", "𝟖", "𝟗"],
				}
			},
			{
				name: "Italic",
				aliases: ["i", "it"],
				charset: {
					"alpha": ["𝐴", "𝐵", "𝐶", "𝐷", "𝐸", "𝐹", "𝐺", "𝐻", "𝐼", "𝐽", "𝐾", "𝐿", "𝑀", "𝑁", "𝑂", "𝑃", "𝑄", "𝑅", "𝑆", "𝑇", "𝑈", "𝑉", "𝑊", "𝑋", "𝑌", "𝑍", "𝑎", "𝑏", "𝑐", "𝑑", "𝑒", "𝑓", "𝑔", "ℎ", "𝑖", "𝑗", "𝑘", "𝑙", "𝑚", "𝑛", "𝑜", "𝑝", "𝑞", "𝑟", "𝑠", "𝑡", "𝑢", "𝑣", "𝑤", "𝑥", "𝑦", "𝑧"],
				}
			},
			{
				name: "Bold Italic",
				aliases: ["bi"],
				charset: {
					"alpha": ["𝑨", "𝑩", "𝑪", "𝑫", "𝑬", "𝑭", "𝑮", "𝑯", "𝑰", "𝑱", "𝑲", "𝑳", "𝑴", "𝑵", "𝑶", "𝑷", "𝑸", "𝑹", "𝑺", "𝑻", "𝑼", "𝑽", "𝑾", "𝑿", "𝒀", "𝒁", "𝒂", "𝒃", "𝒄", "𝒅", "𝒆", "𝒇", "𝒈", "𝒉", "𝒊", "𝒋", "𝒌", "𝒍", "𝒎", "𝒏", "𝒐", "𝒑", "𝒒", "𝒓", "𝒔", "𝒕", "𝒖", "𝒗", "𝒘", "𝒙", "𝒚", "𝒛"],
				}
			}
		]
	},
	{
		name: "Sans Serif",
		aliases: ["sans", "ss"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["𝖠", "𝖡", "𝖢", "𝖣", "𝖤", "𝖥", "𝖦", "𝖧", "𝖨", "𝖩", "𝖪", "𝖫", "𝖬", "𝖭", "𝖮", "𝖯", "𝖰", "𝖱", "𝖲", "𝖳", "𝖴", "𝖵", "𝖶", "𝖷", "𝖸", "𝖹", "𝖺", "𝖻", "𝖼", "𝖽", "𝖾", "𝖿", "𝗀", "𝗁", "𝗂", "𝗃", "𝗄", "𝗅", "𝗆", "𝗇", "𝗈", "𝗉", "𝗊", "𝗋", "𝗌", "𝗍", "𝗎", "𝗏", "𝗐", "𝗑", "𝗒", "𝗓"],
					"numeric": ["𝟢", "𝟣", "𝟤", "𝟥", "𝟦", "𝟧", "𝟨", "𝟩", "𝟪", "𝟫"]
				}
			},
			{
				name: "Bold",
				aliases: ["b", "bd"],
				charset: {
					"alpha": ["𝗔", "𝗕", "𝗖", "𝗗", "𝗘", "𝗙", "𝗚", "𝗛", "𝗜", "𝗝", "𝗞", "𝗟", "𝗠", "𝗡", "𝗢", "𝗣", "𝗤", "𝗥", "𝗦", "𝗧", "𝗨", "𝗩", "𝗪", "𝗫", "𝗬", "𝗭", "𝗮", "𝗯", "𝗰", "𝗱", "𝗲", "𝗳", "𝗴", "𝗵", "𝗶", "𝗷", "𝗸", "𝗹", "𝗺", "𝗻", "𝗼", "𝗽", "𝗾", "𝗿", "𝘀", "𝘁", "𝘂", "𝘃", "𝘄", "𝘅", "𝘆", "𝘇"],
					"numeric": ["𝟬", "𝟭", "𝟮", "𝟯", "𝟰", "𝟱", "𝟲", "𝟳", "𝟴", "𝟵"]
				}
			},
			{
				name: "Italic",
				aliases: ["i", "it"],
				charset: {
					"alpha": ["𝘈", "𝘉", "𝘊", "𝘋", "𝘌", "𝘍", "𝘎", "𝘏", "𝘐", "𝘑", "𝘒", "𝘓", "𝘔", "𝘕", "𝘖", "𝘗", "𝘘", "𝘙", "𝘚", "𝘛", "𝘜", "𝘝", "𝘞", "𝘟", "𝘠", "𝘡", "𝘢", "𝘣", "𝘤", "𝘥", "𝘦", "𝘧", "𝘨", "𝘩", "𝘪", "𝘫", "𝘬", "𝘭", "𝘮", "𝘯", "𝘰", "𝘱", "𝘲", "𝘳", "𝘴", "𝘵", "𝘶", "𝘷", "𝘸", "𝘹", "𝘺", "𝘻"]
				}
			},
			{
				name: "Bold Italic",
				aliases: ["bi"],
				charset: {
					"alpha": ["𝘼", "𝘽", "𝘾", "𝘿", "𝙀", "𝙁", "𝙂", "𝙃", "𝙄", "𝙅", "𝙆", "𝙇", "𝙈", "𝙉", "𝙊", "𝙋", "𝙌", "𝙍", "𝙎", "𝙏", "𝙐", "𝙑", "𝙒", "𝙓", "𝙔", "𝙕", "𝙖", "𝙗", "𝙘", "𝙙", "𝙚", "𝙛", "𝙜", "𝙝", "𝙞", "𝙟", "𝙠", "𝙡", "𝙢", "𝙣", "𝙤", "𝙥", "𝙦", "𝙧", "𝙨", "𝙩", "𝙪", "𝙫", "𝙬", "𝙭", "𝙮", "𝙯"]
				}
			}
		]
	},
	{
		name: "Script",
		aliases: ["scr"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["𝒜", "ℬ", "𝒞", "𝒟", "ℰ", "ℱ", "𝒢", "ℋ", "ℐ", "𝒥", "𝒦", "ℒ", "ℳ", "𝒩", "𝒪", "𝒫", "𝒬", "ℛ", "𝒮", "𝒯", "𝒰", "𝒱", "𝒲", "𝒳", "𝒴", "𝒵", "𝒶", "𝒷", "𝒸", "𝒹", "ℯ", "𝒻", "ℊ", "𝒽", "𝒾", "𝒿", "𝓀", "𝓁", "𝓂", "𝓃", "ℴ", "𝓅", "𝓆", "𝓇", "𝓈", "𝓉", "𝓊", "𝓋", "𝓌", "𝓍", "𝓎", "𝓏"]
				}
			},
			{
				name: "Bold",
				aliases: ["b", "bd"],
				charset: {
					"alpha": ["𝓐", "𝓑", "𝓒", "𝓓", "𝓔", "𝓕", "𝓖", "𝓗", "𝓘", "𝓙", "𝓚", "𝓛", "𝓜", "𝓝", "𝓞", "𝓟", "𝓠", "𝓡", "𝓢", "𝓣", "𝓤", "𝓥", "𝓦", "𝓧", "𝓨", "𝓩", "𝓪", "𝓫", "𝓬", "𝓭", "𝓮", "𝓯", "𝓰", "𝓱", "𝓲", "𝓳", "𝓴", "𝓵", "𝓶", "𝓷", "𝓸", "𝓹", "𝓺", "𝓻", "𝓼", "𝓽", "𝓾", "𝓿", "𝔀", "𝔁", "𝔂", "𝔃"]
				}
			},
		]
	},
	{
		name: "Fraktur",
		aliases: ["fr", "f"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["𝔄", "𝔅", "ℭ", "𝔇", "𝔈", "𝔉", "𝔊", "ℌ", "ℑ", "𝔍", "𝔎", "𝔏", "𝔐", "𝔑", "𝔒", "𝔓", "𝔔", "ℜ", "𝔖", "𝔗", "𝔘", "𝔙", "𝔚", "𝔛", "𝔜", "ℨ", "𝔞", "𝔟", "𝔠", "𝔡", "𝔢", "𝔣", "𝔤", "𝔥", "𝔦", "𝔧", "𝔨", "𝔩", "𝔪", "𝔫", "𝔬", "𝔭", "𝔮", "𝔯", "𝔰", "𝔱", "𝔲", "𝔳", "𝔴", "𝔵", "𝔶", "𝔷"]
				}
			},
			{
				name: "Bold",
				aliases: ["b", "bd"],
				charset: {
					"alpha": ["𝕬", "𝕭", "𝕮", "𝕯", "𝕰", "𝕱", "𝕲", "𝕳", "𝕴", "𝕵", "𝕶", "𝕷", "𝕸", "𝕹", "𝕺", "𝕻", "𝕼", "𝕽", "𝕾", "𝕿", "𝖀", "𝖁", "𝖂", "𝖃", "𝖄", "𝖅", "𝖆", "𝖇", "𝖈", "𝖉", "𝖊", "𝖋", "𝖌", "𝖍", "𝖎", "𝖏", "𝖐", "𝖑", "𝖒", "𝖓", "𝖔", "𝖕", "𝖖", "𝖗", "𝖘", "𝖙", "𝖚", "𝖛", "𝖜", "𝖝", "𝖞", "𝖟"]
				}
			},
		]
	},
	{
		name: "Monospace",
		aliases: ["mono", "m"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["𝙰", "𝙱", "𝙲", "𝙳", "𝙴", "𝙵", "𝙶", "𝙷", "𝙸", "𝙹", "𝙺", "𝙻", "𝙼", "𝙽", "𝙾", "𝙿", "𝚀", "𝚁", "𝚂", "𝚃", "𝚄", "𝚅", "𝚆", "𝚇", "𝚈", "𝚉", "𝚊", "𝚋", "𝚌", "𝚍", "𝚎", "𝚏", "𝚐", "𝚑", "𝚒", "𝚓", "𝚔", "𝚕", "𝚖", "𝚗", "𝚘", "𝚙", "𝚚", "𝚛", "𝚜", "𝚝", "𝚞", "𝚟", "𝚠", "𝚡", "𝚢", "𝚣"], 
					"numeric": ["𝟶", "𝟷", "𝟸", "𝟹", "𝟺", "𝟻", "𝟼", "𝟽", "𝟾", "𝟿"]
				}
			}
		]
	},
	{
		name: "Doublestruck",
		aliases: ["double", "ds"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄", "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ", "𝕒", "𝕓", "𝕔", "𝕕", "𝕖", "𝕗", "𝕘", "𝕙", "𝕚", "𝕛", "𝕜", "𝕝", "𝕞", "𝕟", "𝕠", "𝕡", "𝕢", "𝕣", "𝕤", "𝕥", "𝕦", "𝕧", "𝕨", "𝕩", "𝕪", "𝕫"],
					"numeric": ["𝟘", "𝟙", "𝟚", "𝟛", "𝟜", "𝟝", "𝟞", "𝟟", "𝟠", "𝟡"]
				}
			}
		]
	},
	{
		name: "Fullwidth",
		aliases: ["full", "fw"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ"],
					"numeric": ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"],
					"punctuation": ["！", "＂", "＃", "＄", "％", "＆", "＇", "（", "）", "＊", "＋", "，", "－", "．", "／", "：", "；", "＜", "＝", "＞", "？", "＠", "［", "＼", "］", "＾", "＿", "｀", "｛", "｜", "｝", "～"]
				}
			}
		]
	},
	{
		name: "Circled",
		aliases: ["circ", "c"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["Ⓐ", "Ⓑ", "Ⓒ", "Ⓓ", "Ⓔ", "Ⓕ", "Ⓖ", "Ⓗ", "Ⓘ", "Ⓙ", "Ⓚ", "Ⓛ", "Ⓜ", "Ⓝ", "Ⓞ", "Ⓟ", "Ⓠ", "Ⓡ", "Ⓢ", "Ⓣ", "Ⓤ", "Ⓥ", "Ⓦ", "Ⓧ", "Ⓨ", "Ⓩ", "ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ", "ⓛ", "ⓜ", "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ"],
					"numeric": ["⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"]
				}
			},
			{
				name: "Negative",
				aliases: ["neg", "n"],
				charset: {
					"alpha": ["🅐", "🅑", "🅒", "🅓", "🅔", "🅕", "🅖", "🅗", "🅘", "🅙", "🅚", "🅛", "🅜", "🅝", "🅞", "🅟", "🅠", "🅡", "🅢", "🅣", "🅤", "🅥", "🅦", "🅧", "🅨", "🅩", "🅐", "🅑", "🅒", "🅓", "🅔", "🅕", "🅖", "🅗", "🅘", "🅙", "🅚", "🅛", "🅜", "🅝", "🅞", "🅟", "🅠", "🅡", "🅢", "🅣", "🅤", "🅥", "🅦", "🅧", "🅨", "🅩"],
					"numeric": ["⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾"]
				}
			}
		]
	},
	{
		name: "Squared",
		aliases: ["sq"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄻", "🄼", "🄽", "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉", "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄻", "🄼", "🄽", "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉"]
				}
			},
			{
				name: "Negative",
				aliases: ["neg", "n"],
				charset: {
					"alpha": ["🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉", "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉"]
				}
			}
		]
	},
	{
		name: "Parenthesized",
		aliases: ["paren", "p"],
		variants: [
			{
				name: "Regular",
				aliases: ["", "r", "rg"],
				charset: {
					"alpha": ["🄐", "🄑", "🄒", "🄓", "🄔", "🄕", "🄖", "🄗", "🄘", "🄙", "🄚", "🄛", "🄜", "🄝", "🄞", "🄟", "🄠", "🄡", "🄢", "🄣", "🄤", "🄥", "🄦", "🄧", "🄨", "🄩", "⒜", "⒝", "⒞", "⒟", "⒠", "⒡", "⒢", "⒣", "⒤", "⒥", "⒦", "⒧", "⒨", "⒩", "⒪", "⒫", "⒬", "⒭", "⒮", "⒯", "⒰", "⒱", "⒲", "⒳", "⒴", "⒵"], 
					"numeric": ["0", "⑴", "⑵", "⑶", "⑷", "⑸", "⑹", "⑺", "⑻", "⑼"]
				}
			}
		]
	}
];

//** Command handlers

let commandHandlers = {};

commandHandlers.listmanglers = function (message, args) {
	if (!message.guild) {
		message.channel.send("This command must be run in a server.");
		return false;
	}

	let exampleText = "ABC abc 123456 !?*";

	var listMessage = "Mangler Modes and Variants:\n(Called with `!mangle <mode>[-variant] <message>`)\n";
	for (var i = 0; i < charsets.length; i++) {
		let cs = charsets[i];

		var csAliasesMessage = `(\`${cs.name.replace(/\s/g, "").toLowerCase()}\``;
		if (cs.aliases.length > 0) {
			csAliasesMessage += " or `" + cs.aliases.join("` or `") + "`";
		}
		csAliasesMessage += ")";
		listMessage += `${cs.name} ${csAliasesMessage}:\n`;

		for (var j = 0; j < cs.variants.length; j++) {
			let variant = cs.variants[j];

			var varAliasesMessage = `(\`${variant.name.replace(/\s/g, "").toLowerCase()}\``;
			variant.aliases.forEach(alias => {
				if (alias === "")
					alias = "<empty string>";

				varAliasesMessage += ` or \`${alias}\``;
			});
			varAliasesMessage += ")";

			let modeString = `${cs.name.replace(/\s/g, "").toLowerCase()}-${variant.name.replace(/\s/g, "").toLowerCase()}`;

			listMessage += `\t${variant.name}  ${varAliasesMessage}: \n`;
			listMessage += "\t\t" + mangleText(modeString, exampleText) + "\n";
		}
		listMessage += "\n";
	}

	message.member.send(listMessage);
};

commandHandlers.mangle = function (message, args) {;

	let argsSplit = args.split(" ");
	if (argsSplit.length === 1 && argsSplit[0] === "") {
		message.channel.send("You must specify a mode and a message.");
		return false;
	}

	let mode = argsSplit[0];

	let messageArgs = argsSplit.slice(1);
	let messageContent = messageArgs.join(" ");

	if (messageContent === "") {
		message.channel.send("You must specify a message.");
		return false;
	}

	console.info("Mode/Content:", mode, messageContent);

	let mangledText = mangleText(mode, messageContent);
	if (mangledText === null) {
		message.channel.send(`Charset "${mode}" not found. :pensive:`);
		return false;
	}

	message.channel.send(mangledText);

};

//** Functions for unicode command

let mangleText = function (mode, text) {

	let modeSplit = mode.split("-");

	let modeName = modeSplit[0].toLowerCase();
	var modeVariant = "";
	if (modeSplit.length > 1)
		modeVariant = modeSplit[1].toLowerCase();

	// console.info("Mode split", modeSplit);

	var selectedCharset = null;

	outerLoop:
	for (var i = 0; i < charsets.length; i++) {
		let cs = charsets[i];
		let charsetName = cs.name.replace(/\s/g, "").toLowerCase();


		for (var j = 0; j < cs.variants.length; j++) {
			let variant = cs.variants[j];
			let variantName = variant.name.replace(/\s/g, "").toLowerCase();

			let charsetMatches = charsetName === modeName || cs.aliases.includes(modeName);
			let variantMatches = variantName === modeVariant || variant.aliases.includes(modeVariant);

			if (charsetMatches && variantMatches) {
				selectedCharset = variant.charset;
				break outerLoop;
			}
		}
	}

	if (selectedCharset === null) {
		console.error("Charset not found.")
		return null;
	}

	var newStr = "";

	for(var i = 0; i < text.length; i++) {
		var c = text.charAt(i);
		var newChar = c;

		if (reDigits.test(c)) {
			if ("numeric" in selectedCharset) {
				var idx = reference["numeric"].indexOf(c);
				if (idx > -1 && idx in selectedCharset["numeric"] && selectedCharset["numeric"][idx] != "")
					newChar = selectedCharset["numeric"][idx];
			}
		} else if (reAlpha.test(c)) {
			if ("alpha" in selectedCharset) {
				var idx = reference["alpha"].indexOf(c);
				if (idx > -1 && idx in selectedCharset["alpha"] && selectedCharset["alpha"][idx] != "")
					newChar = selectedCharset["alpha"][idx];
			}
		} else if (rePunc.test(c)) {
			if ("punctuation" in selectedCharset) {
				var idx = reference["punctuation"].indexOf(c);
				if (idx > -1 && idx in selectedCharset["punctuation"] && selectedCharset["punctuation"][idx] != "")
					newChar = selectedCharset["punctuation"][idx];
			}
		}

		newStr += newChar;
	}
		
	return newStr;

};

//** Module Exports

module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};
