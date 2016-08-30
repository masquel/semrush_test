"use strict";

//const test_url = "https://medium.com/playwell/no-mans-sky-and-the-beautiful-return-to-the-weird-81343f2aad37/";


class SuperSearchLine {

	constructor(superSearchLineNode) {
		
		this.remote = "http://super-analytics.com/";

		this.id = superSearchLineNode.getAttribute("id");
		this.baseClass = 'super-search-line';
		this.baseClassSelector = "."+this.baseClass;
		this.urlPattern = new RegExp(/(https?:\/\/)?((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

		
		this.superSearchLineForm = superSearchLineNode.querySelector(this.baseClassSelector+"__form");
		this.superSearchLineInput = superSearchLineNode.querySelector(this.baseClassSelector+"__input");
		this.superSearchLineReset = superSearchLineNode.querySelector(this.baseClassSelector+"__reset");
		this.superSearchLineButton = superSearchLineNode.querySelector(this.baseClassSelector+"__button");

		this.superSearchLineInput.addEventListener('change',this.superSearchLineInputHandler.bind(this));
		this.superSearchLineInput.addEventListener('input',this.superSearchLineInputHandler.bind(this));
		this.superSearchLineReset.addEventListener('click',this.superSearchLineResetValue.bind(this));
		this.superSearchLineButton.addEventListener('click',this.superSearchLineSubmit.bind(this));
		this.superSearchLineForm.addEventListener('submit',this.superSearchLineSubmit.bind(this));
	}

	
	parseUrl(url){
		return this.urlPattern.test(url);
	}

	superSearchLineResetValue(){
		this.superSearchLineInput.value = null;
		this.superSearchLineReset.classList.add('hidden');
		this.superSearchLineButton.setAttribute("disabled","disabled");
		let result = this.superSearchLineForm.querySelector(this.baseClassSelector+"__result");
		result && this.superSearchLineForm.removeChild(result);
		//console.log(this.superSearchLineInput.value);
	}

	superSearchLineSubmit(e){
		e.preventDefault();
		let r = new XMLHttpRequest();
		let data = {
			"formId": this.id,
			"query": this.superSearchLineInput.value
		}
		r.open("POST",this.remote);
		r.setRequestHeader("Content-Type","text/json");
		r.send(data);
	}

	superSearchLineResultGenerator(protocol, domain, query){
		let superSearchLineResult = document.createElement('div')
		superSearchLineResult.setAttribute('class', this.baseClass+"__result");
		let superSearchLineItems =	
			`<div class="${this.baseClass}__item">
				<a href="${this.remote}?suggestionType=phrase&query=${protocol+domain+query}" target="_blank" class="${this.baseClass}__link">
					${protocol+domain+query}
				</a>
				<div class="${this.baseClass}__helper">in 
					<span class="${this.baseClass}__helper-type">Phrase Overview</span>
				</div>
			</div>
			<div class="${this.baseClass}__item">
				<a href="${this.remote}?suggestionType=domain&query=${domain}" target="_blank" class="${this.baseClass}__link">
					${domain}
				</a>
				<div class="${this.baseClass}__helper">in 
					<span class="${this.baseClass}__helper-type">Domain Overview</span>
				</div>
			</div>
			<div class="${this.baseClass}__item">
				<a href="${this.remote}?suggestionType=url&query=${domain+query}" target="_blank" class="${this.baseClass}__link">
					${domain+query}
				</a>
				<div class="${this.baseClass}__helper">in 
					<span class="${this.baseClass}__helper-type">URL Overview</span>
				</div>
			</div>`;
		superSearchLineResult.innerHTML = superSearchLineItems;
		return superSearchLineResult;
	}

	superSearchLineInputHandler(e){
		let value = e.target.value;
		let result = this.superSearchLineForm.querySelector(this.baseClassSelector+"__result");
		result && this.superSearchLineForm.removeChild(result);
		if(value !== null && value !== ""){
			this.superSearchLineReset.classList.remove('hidden');
			this.superSearchLineButton.removeAttribute("disabled");
			if(this.parseUrl(value)){
				let result = value.match(this.urlPattern);
				let protocol = result[1];
				let domain = result[2];
				let query = result[3];
				let superSearchLineResult = this.superSearchLineResultGenerator(protocol,domain,query);
				console.log(true);
				this.superSearchLineForm.appendChild(superSearchLineResult);
			}		
		}else{
			this.superSearchLineReset.classList.add('hidden');
			this.superSearchLineButton.setAttribute("disabled","disabled");
		}	
	}
}

const init = () => {
	let superSearchLines = document.querySelectorAll('.super-search-line');
	let i = 0;
	for(let superSearchLine of superSearchLines) {
		superSearchLine.setAttribute('id',"superSeachLine"+i++);
		new SuperSearchLine(superSearchLine);
	}
}

(function(){
	document.addEventListener('DOMContentLoaded', init);
});