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