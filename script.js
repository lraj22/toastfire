var handlers = {
	"basic": function () {
		Toastfire.toast("Easy and simple.");
	},
	"error": function () {
		Toastfire.toast({
			"title": "Compile error",
			"message": "Unresolved compile error. Please try again.",
			"type": "error"
		});
	},
	"warning": function () {
		Toastfire.toast({
			"title": "Proceed with caution...",
			"message": "There are dangers up ahead!",
			"type": "warning",
			"position": "bottom-right"
		});
	},
	"info": function () {
		Toastfire.toast({
			"message": "HTML is <b>supported</b> in toasts!",
			"type": "info",
			"position": "bottom-middle",
			"timeout": 10000
		});
	},
	"custom": function () {
		var backdrop = document.getElementById("backdrop");
		backdrop.className = "fadein";
		var lines = [
			"Z2l2ZSB5b3UgdXAs",
			"bGV0IHlvdSBkb3duLg==",
			"cnVuIGFyb3VuZCBhbmQgZGVzZXJ0IHlvdS4=",
			"bWFrZSB5b3UgY3J5LA==",
			"c2F5IGdvb2RieWUu",
			"dGVsbCBhIGxpZSBhbmQgaHVydCB5b3Uu"
		];
		lines = lines.map(function (line) {
			return atob("TmV2ZXIgZ29ubmEg" + line);
		});
		var index = 0;
		var toastbase = new Toastfire({
			"position": "middle-middle",
			"timeout": 1500
		});
		var musictoastbase = new Toastfire({
			"timeout": 0,
			"message": "♪ ♪ ♪",
			"showClose": false,
			"transitionOut": "none",
			"type": "music",
			"extraClasses": ["backforth"],
			"transitionOut": "spinout"
		})
		var mltoast = musictoastbase.toast({
			"position": "middle-left"
		});
		var mrtoast = musictoastbase.toast({
			"position": "middle-right"
		});
		var rindex = setInterval(function () {
			if (index < lines.length) {
				toastbase.toast({
					"message": lines[index],
					"timeout": 11111 - (index * 1357)
				});
				index++;
			} else {
				clearInterval(rindex);
				mltoast.close();
				mrtoast.close();
				setTimeout(function () {
					backdrop.className = "fadeout";
				}, 3000);
			}
		}, 1500);
	}
};

var examples = [].slice.call(document.getElementsByClassName("example-btn"));
examples.forEach(function (example) {
	example.addEventListener("click", function () {
		var requestedHandler = example.getAttribute("data-handler");
		var handler = handlers[requestedHandler];
		if (typeof handler === "function") {
			handler();
		} else {
			alert("[ERROR] No valid handler was assigned to this button. Requested handler: " + requestedHandler);
		}
	});
});

var firer = document.getElementById("fire");
firer.addEventListener("click", function () {
	var options = {};
	var selections = document.getElementsByTagName("label");
	for (var i = 0; i < selections.length; i++) {
		var nextEl = selections[i].nextElementSibling;
		var value = nextEl.value;
		if (nextEl.type === "number") {
			value = parseFloat(value);
		}
		if (nextEl.type === "checkbox") {
			value = nextEl.checked;
		}
		if (value === "rndPageXY") {
			var randX = Math.floor(Math.random() * window.innerWidth);
			var randY = Math.floor(Math.random() * window.innerHeight);
			value = {
				"x": randX,
				"y": randY
			};
		}
		options[selections[i].getAttribute("data-opt")] = value;
	}
	Toastfire.toast(options);
});