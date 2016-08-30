(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.app = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/app.js":[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

//const test_url = "https://medium.com/playwell/no-mans-sky-and-the-beautiful-return-to-the-weird-81343f2aad37/";

var SuperSearchLine = (function () {
	function SuperSearchLine(superSearchLineNode) {
		_classCallCheck(this, SuperSearchLine);

		this.remote = "http://super-analytics.com/";

		this.id = superSearchLineNode.getAttribute("id");
		this.baseClass = "super-search-line";
		this.baseClassSelector = "." + this.baseClass;
		this.urlPattern = new RegExp(/(https?:\/\/)?((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

		this.superSearchLineForm = superSearchLineNode.querySelector(this.baseClassSelector + "__form");
		this.superSearchLineInput = superSearchLineNode.querySelector(this.baseClassSelector + "__input");
		this.superSearchLineReset = superSearchLineNode.querySelector(this.baseClassSelector + "__reset");
		this.superSearchLineButton = superSearchLineNode.querySelector(this.baseClassSelector + "__button");

		this.superSearchLineInput.addEventListener("change", this.superSearchLineInputHandler.bind(this));
		this.superSearchLineInput.addEventListener("input", this.superSearchLineInputHandler.bind(this));
		this.superSearchLineReset.addEventListener("click", this.superSearchLineResetValue.bind(this));
		this.superSearchLineButton.addEventListener("click", this.superSearchLineSubmit.bind(this));
		this.superSearchLineForm.addEventListener("submit", this.superSearchLineSubmit.bind(this));
	}

	_createClass(SuperSearchLine, {
		parseUrl: {
			value: function parseUrl(url) {
				return this.urlPattern.test(url);
			}
		},
		superSearchLineResetValue: {
			value: function superSearchLineResetValue() {
				this.superSearchLineInput.value = null;
				this.superSearchLineReset.classList.add("hidden");
				this.superSearchLineButton.setAttribute("disabled", "disabled");
				var result = this.superSearchLineForm.querySelector(this.baseClassSelector + "__result");
				result && this.superSearchLineForm.removeChild(result);
				//console.log(this.superSearchLineInput.value);
			}
		},
		superSearchLineSubmit: {
			value: function superSearchLineSubmit(e) {
				e.preventDefault();
				var r = new XMLHttpRequest();
				var data = {
					formId: this.id,
					query: this.superSearchLineInput.value
				};
				r.open("POST", this.remote);
				r.setRequestHeader("Content-Type", "text/json");
				r.send(data);
			}
		},
		superSearchLineResultGenerator: {
			value: function superSearchLineResultGenerator(protocol, domain, query) {
				var superSearchLineResult = document.createElement("div");
				superSearchLineResult.setAttribute("class", this.baseClass + "__result");
				var superSearchLineItems = "<div class=\"" + this.baseClass + "__item\">\n\t\t\t\t<a href=\"" + this.remote + "?suggestionType=phrase&query=" + (protocol + domain + query) + "\" target=\"_blank\" class=\"" + this.baseClass + "__link\">\n\t\t\t\t\t" + (protocol + domain + query) + "\n\t\t\t\t</a>\n\t\t\t\t<div class=\"" + this.baseClass + "__helper\">in \n\t\t\t\t\t<span class=\"" + this.baseClass + "__helper-type\">Phrase Overview</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"" + this.baseClass + "__item\">\n\t\t\t\t<a href=\"" + this.remote + "?suggestionType=domain&query=" + domain + "\" target=\"_blank\" class=\"" + this.baseClass + "__link\">\n\t\t\t\t\t" + domain + "\n\t\t\t\t</a>\n\t\t\t\t<div class=\"" + this.baseClass + "__helper\">in \n\t\t\t\t\t<span class=\"" + this.baseClass + "__helper-type\">Domain Overview</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"" + this.baseClass + "__item\">\n\t\t\t\t<a href=\"" + this.remote + "?suggestionType=url&query=" + (domain + query) + "\" target=\"_blank\" class=\"" + this.baseClass + "__link\">\n\t\t\t\t\t" + (domain + query) + "\n\t\t\t\t</a>\n\t\t\t\t<div class=\"" + this.baseClass + "__helper\">in \n\t\t\t\t\t<span class=\"" + this.baseClass + "__helper-type\">URL Overview</span>\n\t\t\t\t</div>\n\t\t\t</div>";
				superSearchLineResult.innerHTML = superSearchLineItems;
				return superSearchLineResult;
			}
		},
		superSearchLineInputHandler: {
			value: function superSearchLineInputHandler(e) {
				var value = e.target.value;
				var result = this.superSearchLineForm.querySelector(this.baseClassSelector + "__result");
				result && this.superSearchLineForm.removeChild(result);
				if (value !== null && value !== "") {
					this.superSearchLineReset.classList.remove("hidden");
					this.superSearchLineButton.removeAttribute("disabled");
					if (this.parseUrl(value)) {
						var _result = value.match(this.urlPattern);
						var protocol = _result[1];
						var domain = _result[2];
						var query = _result[3];
						var superSearchLineResult = this.superSearchLineResultGenerator(protocol, domain, query);
						console.log(true);
						this.superSearchLineForm.appendChild(superSearchLineResult);
					}
				} else {
					this.superSearchLineReset.classList.add("hidden");
					this.superSearchLineButton.setAttribute("disabled", "disabled");
				}
			}
		}
	});

	return SuperSearchLine;
})();

var init = (function () {
	var superSearchLines = document.querySelectorAll(".super-search-line");
	var i = 0;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = superSearchLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var superSearchLine = _step.value;

			superSearchLine.setAttribute("id", "superSeachLine" + i++);
			new SuperSearchLine(superSearchLine);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator["return"]) {
				_iterator["return"]();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
})(function () {
	document.addEventListener("DOMContentLoaded", init);
});

},{}]},{},["./src/js/app.js"])("./src/js/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOi9Vc2Vycy9hbGV4ZXkvRG9jdW1lbnRzL0dpdEh1Yi9zZW1ydXNoX3Rlc3Qvc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7Ozs7SUFLUCxlQUFlO0FBRVQsVUFGTixlQUFlLENBRVIsbUJBQW1CLEVBQUU7d0JBRjVCLGVBQWU7O0FBSW5CLE1BQUksQ0FBQyxNQUFNLEdBQUcsNkJBQTZCLENBQUM7O0FBRTVDLE1BQUksQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELE1BQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7QUFDckMsTUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzVDLE1BQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsb0dBQW9HLENBQUMsQ0FBQzs7QUFHbkksTUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUYsTUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEcsTUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEcsTUFBSSxDQUFDLHFCQUFxQixHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWxHLE1BQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLDJC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SSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLENBQUMsQ0FBQztBQUN2RixhQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztNQUM1RDtLQUNELE1BQUk7QUFDSixTQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsRCxTQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQztLQUMvRDtJQUNEOzs7O1FBdEdJLGVBQWU7OztBQXlHckIsSUFBTSxJQUFJLEdBQUcsQ0FBQSxZQUFNO0FBQ2xCLEtBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDdkUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFDVix1QkFBMkIsZ0JBQWdCO09BQW5DLGVBQWU7O0FBQ3RCLGtCQUFlLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxnQkFBZ0IsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELE9BQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0dBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7Q0FDRCxDQUFBLENBRUEsWUFBVTtBQUNWLFNBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNwRCxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vY29uc3QgdGVzdF91cmwgPSBcImh0dHBzOi8vbWVkaXVtLmNvbS9wbGF5d2VsbC9uby1tYW5zLXNreS1hbmQtdGhlLWJlYXV0aWZ1bC1yZXR1cm4tdG8tdGhlLXdlaXJkLTgxMzQzZjJhYWQzNy9cIjtcblxuXG5jbGFzcyBTdXBlclNlYXJjaExpbmUge1xuXG5cdGNvbnN0cnVjdG9yKHN1cGVyU2VhcmNoTGluZU5vZGUpIHtcblx0XHRcblx0XHR0aGlzLnJlbW90ZSA9IFwiaHR0cDovL3N1cGVyLWFuYWx5dGljcy5jb20vXCI7XG5cblx0XHR0aGlzLmlkID0gc3VwZXJTZWFyY2hMaW5lTm9kZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcblx0XHR0aGlzLmJhc2VDbGFzcyA9ICdzdXBlci1zZWFyY2gtbGluZSc7XG5cdFx0dGhpcy5iYXNlQ2xhc3NTZWxlY3RvciA9IFwiLlwiK3RoaXMuYmFzZUNsYXNzO1xuXHRcdHRoaXMudXJsUGF0dGVybiA9IG5ldyBSZWdFeHAoLyhodHRwcz86XFwvXFwvKT8oKD86d3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDZ9XFxiKShbLWEtekEtWjAtOUA6JV9cXCsufiM/Ji8vPV0qKS8pO1xuXG5cdFx0XG5cdFx0dGhpcy5zdXBlclNlYXJjaExpbmVGb3JtID0gc3VwZXJTZWFyY2hMaW5lTm9kZS5xdWVyeVNlbGVjdG9yKHRoaXMuYmFzZUNsYXNzU2VsZWN0b3IrXCJfX2Zvcm1cIik7XG5cdFx0dGhpcy5zdXBlclNlYXJjaExpbmVJbnB1dCA9IHN1cGVyU2VhcmNoTGluZU5vZGUucXVlcnlTZWxlY3Rvcih0aGlzLmJhc2VDbGFzc1NlbGVjdG9yK1wiX19pbnB1dFwiKTtcblx0XHR0aGlzLnN1cGVyU2VhcmNoTGluZVJlc2V0ID0gc3VwZXJTZWFyY2hMaW5lTm9kZS5xdWVyeVNlbGVjdG9yKHRoaXMuYmFzZUNsYXNzU2VsZWN0b3IrXCJfX3Jlc2V0XCIpO1xuXHRcdHRoaXMuc3VwZXJTZWFyY2hMaW5lQnV0dG9uID0gc3VwZXJTZWFyY2hMaW5lTm9kZS5xdWVyeVNlbGVjdG9yKHRoaXMuYmFzZUNsYXNzU2VsZWN0b3IrXCJfX2J1dHRvblwiKTtcblxuXHRcdHRoaXMuc3VwZXJTZWFyY2hMaW5lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyx0aGlzLnN1cGVyU2VhcmNoTGluZUlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnN1cGVyU2VhcmNoTGluZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jyx0aGlzLnN1cGVyU2VhcmNoTGluZUlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnN1cGVyU2VhcmNoTGluZVJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyx0aGlzLnN1cGVyU2VhcmNoTGluZVJlc2V0VmFsdWUuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5zdXBlclNlYXJjaExpbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHRoaXMuc3VwZXJTZWFyY2hMaW5lU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuc3VwZXJTZWFyY2hMaW5lRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLHRoaXMuc3VwZXJTZWFyY2hMaW5lU3VibWl0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0XG5cdHBhcnNlVXJsKHVybCl7XG5cdFx0cmV0dXJuIHRoaXMudXJsUGF0dGVybi50ZXN0KHVybCk7XG5cdH1cblxuXHRzdXBlclNlYXJjaExpbmVSZXNldFZhbHVlKCl7XG5cdFx0dGhpcy5zdXBlclNlYXJjaExpbmVJbnB1dC52YWx1ZSA9IG51bGw7XG5cdFx0dGhpcy5zdXBlclNlYXJjaExpbmVSZXNldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblx0XHR0aGlzLnN1cGVyU2VhcmNoTGluZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuc3VwZXJTZWFyY2hMaW5lRm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuYmFzZUNsYXNzU2VsZWN0b3IrXCJfX3Jlc3VsdFwiKTtcblx0XHRyZXN1bHQgJiYgdGhpcy5zdXBlclNlYXJjaExpbmVGb3JtLnJlbW92ZUNoaWxkKHJlc3VsdCk7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN1cGVyU2VhcmNoTGluZUlucHV0LnZhbHVlKTtcblx0fVxuXG5cdHN1cGVyU2VhcmNoTGluZVN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFwiZm9ybUlkXCI6IHRoaXMuaWQsXG5cdFx0XHRcInF1ZXJ5XCI6IHRoaXMuc3VwZXJTZWFyY2hMaW5lSW5wdXQudmFsdWVcblx0XHR9XG5cdFx0ci5vcGVuKFwiUE9TVFwiLHRoaXMucmVtb3RlKTtcblx0XHRyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixcInRleHQvanNvblwiKTtcblx0XHRyLnNlbmQoZGF0YSk7XG5cdH1cblxuXHRzdXBlclNlYXJjaExpbmVSZXN1bHRHZW5lcmF0b3IocHJvdG9jb2wsIGRvbWFpbiwgcXVlcnkpe1xuXHRcdGxldCBzdXBlclNlYXJjaExpbmVSZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdHN1cGVyU2VhcmNoTGluZVJlc3VsdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgdGhpcy5iYXNlQ2xhc3MrXCJfX3Jlc3VsdFwiKTtcblx0XHRsZXQgc3VwZXJTZWFyY2hMaW5lSXRlbXMgPVx0XG5cdFx0XHRgPGRpdiBjbGFzcz1cIiR7dGhpcy5iYXNlQ2xhc3N9X19pdGVtXCI+XG5cdFx0XHRcdDxhIGhyZWY9XCIke3RoaXMucmVtb3RlfT9zdWdnZXN0aW9uVHlwZT1waHJhc2UmcXVlcnk9JHtwcm90b2NvbCtkb21haW4rcXVlcnl9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCIke3RoaXMuYmFzZUNsYXNzfV9fbGlua1wiPlxuXHRcdFx0XHRcdCR7cHJvdG9jb2wrZG9tYWluK3F1ZXJ5fVxuXHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCIke3RoaXMuYmFzZUNsYXNzfV9faGVscGVyXCI+aW4gXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCIke3RoaXMuYmFzZUNsYXNzfV9faGVscGVyLXR5cGVcIj5QaHJhc2UgT3ZlcnZpZXc8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiJHt0aGlzLmJhc2VDbGFzc31fX2l0ZW1cIj5cblx0XHRcdFx0PGEgaHJlZj1cIiR7dGhpcy5yZW1vdGV9P3N1Z2dlc3Rpb25UeXBlPWRvbWFpbiZxdWVyeT0ke2RvbWFpbn1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cIiR7dGhpcy5iYXNlQ2xhc3N9X19saW5rXCI+XG5cdFx0XHRcdFx0JHtkb21haW59XG5cdFx0XHRcdDwvYT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIiR7dGhpcy5iYXNlQ2xhc3N9X19oZWxwZXJcIj5pbiBcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIiR7dGhpcy5iYXNlQ2xhc3N9X19oZWxwZXItdHlwZVwiPkRvbWFpbiBPdmVydmlldzwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCIke3RoaXMuYmFzZUNsYXNzfV9faXRlbVwiPlxuXHRcdFx0XHQ8YSBocmVmPVwiJHt0aGlzLnJlbW90ZX0/c3VnZ2VzdGlvblR5cGU9dXJsJnF1ZXJ5PSR7ZG9tYWluK3F1ZXJ5fVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiJHt0aGlzLmJhc2VDbGFzc31fX2xpbmtcIj5cblx0XHRcdFx0XHQke2RvbWFpbitxdWVyeX1cblx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiJHt0aGlzLmJhc2VDbGFzc31fX2hlbHBlclwiPmluIFxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiJHt0aGlzLmJhc2VDbGFzc31fX2hlbHBlci10eXBlXCI+VVJMIE92ZXJ2aWV3PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PmA7XG5cdFx0c3VwZXJTZWFyY2hMaW5lUmVzdWx0LmlubmVySFRNTCA9IHN1cGVyU2VhcmNoTGluZUl0ZW1zO1xuXHRcdHJldHVybiBzdXBlclNlYXJjaExpbmVSZXN1bHQ7XG5cdH1cblxuXHRzdXBlclNlYXJjaExpbmVJbnB1dEhhbmRsZXIoZSl7XG5cdFx0bGV0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuc3VwZXJTZWFyY2hMaW5lRm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuYmFzZUNsYXNzU2VsZWN0b3IrXCJfX3Jlc3VsdFwiKTtcblx0XHRyZXN1bHQgJiYgdGhpcy5zdXBlclNlYXJjaExpbmVGb3JtLnJlbW92ZUNoaWxkKHJlc3VsdCk7XG5cdFx0aWYodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IFwiXCIpe1xuXHRcdFx0dGhpcy5zdXBlclNlYXJjaExpbmVSZXNldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0XHRcdHRoaXMuc3VwZXJTZWFyY2hMaW5lQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuXHRcdFx0aWYodGhpcy5wYXJzZVVybCh2YWx1ZSkpe1xuXHRcdFx0XHRsZXQgcmVzdWx0ID0gdmFsdWUubWF0Y2godGhpcy51cmxQYXR0ZXJuKTtcblx0XHRcdFx0bGV0IHByb3RvY29sID0gcmVzdWx0WzFdO1xuXHRcdFx0XHRsZXQgZG9tYWluID0gcmVzdWx0WzJdO1xuXHRcdFx0XHRsZXQgcXVlcnkgPSByZXN1bHRbM107XG5cdFx0XHRcdGxldCBzdXBlclNlYXJjaExpbmVSZXN1bHQgPSB0aGlzLnN1cGVyU2VhcmNoTGluZVJlc3VsdEdlbmVyYXRvcihwcm90b2NvbCxkb21haW4scXVlcnkpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0cnVlKTtcblx0XHRcdFx0dGhpcy5zdXBlclNlYXJjaExpbmVGb3JtLmFwcGVuZENoaWxkKHN1cGVyU2VhcmNoTGluZVJlc3VsdCk7XG5cdFx0XHR9XHRcdFxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdXBlclNlYXJjaExpbmVSZXNldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblx0XHRcdHRoaXMuc3VwZXJTZWFyY2hMaW5lQnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcblx0XHR9XHRcblx0fVxufVxuXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuXHRsZXQgc3VwZXJTZWFyY2hMaW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdXBlci1zZWFyY2gtbGluZScpO1xuXHRsZXQgaSA9IDA7XG5cdGZvcihsZXQgc3VwZXJTZWFyY2hMaW5lIG9mIHN1cGVyU2VhcmNoTGluZXMpIHtcblx0XHRzdXBlclNlYXJjaExpbmUuc2V0QXR0cmlidXRlKCdpZCcsXCJzdXBlclNlYWNoTGluZVwiK2krKyk7XG5cdFx0bmV3IFN1cGVyU2VhcmNoTGluZShzdXBlclNlYXJjaExpbmUpO1xuXHR9XG59XG5cbihmdW5jdGlvbigpe1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdCk7XG59KTsiXX0=
