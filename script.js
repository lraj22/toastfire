var handlers = {
	"basic": function () {
		alert("(a basic toast appears. this isn't it...)");
	},
	"error": function () {
		alert("(an error toast appears. this isn't it...)");
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
			alert("No valid handler was assigned to this button. Requested handler: " + requestedHandler);
		}
	});
});

var firer = document.getElementById("fire");
firer.addEventListener("click", function () {
	alert("(a toast fires. this isn't it...)");
});