var handlers = {
	"basic": function () {
		Toastfire.toast("Easy and simple.");
	},
	"error": function () {
		Toastfire.toast({
			"title": "Critical error!",
			"message": "A critical error (0x02d1) has occurred. Try refreshing.",
			"type": "error"
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
		options[selections[i].getAttribute("data-opt")] = nextEl.value;
	}
	Toastfire.toast(options);
});