"use strict";

//const test_url = "https://medium.com/playwell/no-mans-sky-and-the-beautiful-return-to-the-weird-81343f2aad37/";


class SuperSearchLine {

	constructor(superSearchLineNode) {
		
		// Устанавливаем базовые переменные
		this.remote = "http://super-analytics.com/";

		this.id = superSearchLineNode.getAttribute("id");
		this.baseClass = 'super-search-line';
		this.baseClassSelector = "."+this.baseClass;
		this.urlPattern = new RegExp(/(https?:\/\/)?((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
		
		// Определяем элементы
		this.superSearchLineForm = superSearchLineNode.querySelector(this.baseClassSelector+"__form");
		this.superSearchLineInput = superSearchLineNode.querySelector(this.baseClassSelector+"__input");
		this.superSearchLineReset = superSearchLineNode.querySelector(this.baseClassSelector+"__reset");
		this.superSearchLineButton = superSearchLineNode.querySelector(this.baseClassSelector+"__button");
		// Навешиваем события
		this.superSearchLineInput.addEventListener('change',this.superSearchLineInputHandler.bind(this));
		this.superSearchLineInput.addEventListener('input',this.superSearchLineInputHandler.bind(this));
		this.superSearchLineReset.addEventListener('click',this.superSearchLineResetValue.bind(this));
		this.superSearchLineButton.addEventListener('click',this.superSearchLineSubmit.bind(this));
		this.superSearchLineForm.addEventListener('submit',this.superSearchLineSubmit.bind(this));
		

		// Создаем элементы для отображения результата

		// Создаем блоки для подсказок
		this.linkTextEl1 = document.createElement('div');
		this.linkTextEl2 = document.createElement('div');
		this.linkTextEl3 = document.createElement('div');

		this.linkTextEl1.classList.add(`${this.baseClass}__link-text`);
		this.linkTextEl2.classList.add(`${this.baseClass}__link-text`);
		this.linkTextEl3.classList.add(`${this.baseClass}__link-text`);

		// Создаем блоки поясняющего текста и сразу считаем ширину т.к. в дальнейшем не меняются 
		this.helperEl1 = document.createElement('div');
		this.helperEl2 = document.createElement('div');
		this.helperEl3 = document.createElement('div');
		
		this.helperEl1.classList.add(`${this.baseClass}__helper`);
		this.helperEl2.classList.add(`${this.baseClass}__helper`);
		this.helperEl3.classList.add(`${this.baseClass}__helper`);

		this.helperEl1.innerHTML = `in <span class="${this.baseClass}__helper-type">Phrase Overview</span>`;
		this.helperEl2.innerHTML = `in <span class="${this.baseClass}__helper-type">Domain Overview</span>`;
		this.helperEl3.innerHTML = `in <span class="${this.baseClass}__helper-type">URL Overview</span>`;
		
		this.helperStr1Width = this.stringWidthInPX(this.helperEl1);
		this.helperStr2Width = this.stringWidthInPX(this.helperEl2);
		this.helperStr3Width = this.stringWidthInPX(this.helperEl3);
	}

	
	parseUrl(url){
		return this.urlPattern.test(url);
	}

	superSearchLineResetValue(){
		this.superSearchLineInput.value = null;
		//this.superSearchLineInput.change();
		this.superSearchLineReset.classList.add('hidden');
		this.superSearchLineButton.setAttribute("disabled","disabled");
		let result = this.superSearchLineForm.querySelector(this.baseClassSelector+"__result");
		result && this.superSearchLineForm.removeChild(result);
		//console.log(this.superSearchLineInput.value);
	}

	superSearchLineSubmit(e){
		e.preventDefault();
		let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		let r = new XHR();
		let data = `formId=${encodeURIComponent(this.id)}&query=${encodeURIComponent(this.superSearchLineInput.value)}`;
		r.open("POST",this.remote);
		r.onload = (response) => {
			console.log(response);
		};
		r.onerror = (error) => {
			console.log("Ошибка: ", error);
		};
		r.send(data);
	}

	superSearchLineResultGenerator(protocol, domain, query){
		let inputWidth = this.superSearchLineInput.offsetWidth;

		// Записываем текст в блоки результата и считаем их ширину
		this.linkTextEl1.innerHTML = protocol+domain+query;
		let linkStr1Width = this.stringWidthInPX(this.linkTextEl1);
		this.linkTextEl2.innerHTML = domain;
		let linkStr2Width = this.stringWidthInPX(this.linkTextEl2);
		this.linkTextEl3.innerHTML = domain+query;
		let linkStr3Width = this.stringWidthInPX(this.linkTextEl3);

		
		
		let superSearchLineResult = document.createElement('div');
		superSearchLineResult.setAttribute('class', this.baseClass+"__result");
		let helperFixedClass = `${this.baseClass}__helper--fixed`;

		(inputWidth - this.helperStr1Width < linkStr1Width) ? this.helperEl1.classList.add(helperFixedClass) : this.helperEl1.classList.remove(helperFixedClass);
		(inputWidth - this.helperStr2Width < linkStr2Width) ? this.helperEl2.classList.add(helperFixedClass) : this.helperEl2.classList.remove(helperFixedClass);
		(inputWidth - this.helperStr3Width < linkStr3Width) ? this.helperEl3.classList.add(helperFixedClass) : this.helperEl3.classList.remove(helperFixedClass);


		let superSearchLineItems =	
			`<div class="${this.baseClass}__item">
				<a href="${this.remote}?suggestionType=phrase&query=${protocol+domain+query}" target="_blank" class="${this.baseClass}__link">
					${this.nodeToString(this.linkTextEl1)}
					${this.nodeToString(this.helperEl1)}
				</a>
				
			</div>
			<div class="${this.baseClass}__item">
				<a href="${this.remote}?suggestionType=domain&query=${domain}" target="_blank" class="${this.baseClass}__link">
					${this.nodeToString(this.linkTextEl2)}
					${this.nodeToString(this.helperEl2)}
				</a>
			</div>
			<div class="${this.baseClass}__item">
				<a href="${this.remote}?suggestionType=url&query=${domain+query}" target="_blank" class="${this.baseClass}__link">
					${this.nodeToString(this.linkTextEl3)}
					${this.nodeToString(this.helperEl3)}
				</a>
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

	stringWidthInPX(el) {
	  // дополнительные стили для клона, что бы мир не заметил чуда, и размеры отображались корректно
	  let hiddenStyle = "left:-10000px;top:-10000px;height:auto;width:auto;position:absolute;";

	  // создаем box элемент 
	  // для клонирования содержимого из нашего исходного inline блока
	  let clone = document.createElement('div');
	  
	  // в обязательном порядке копируем стили с исходного элемента, 
	  // что бы размеры соответствовали исходнику.
	  let style = window.getComputedStyle(el, null);
	  clone.classList = el.classList;	  
	  for (let i in el.style) {
	    try {
	      if ((el.style[i] != '') && (el.style[i].indexOf(":") > 0)) {
	        clone.style[i] = el.style[i];
	      }
	    } catch (e) {}
	  }
	  
	  // устанавливаем стили у клона, дабы он не мозолил глаз. 
	  // Учитываем, что IE не позволяет напрямую устанавливать значение аттрибута style
	  document.all ? clone.style.setAttribute('cssText', hiddenStyle) : clone.setAttribute('style', hiddenStyle);

	  clone.innerHTML = el.innerHTML
	  
	  parent.document.body.appendChild(clone);
	  
	  let width = clone.clientWidth;
	  console.log(width);
	  parent.document.body.removeChild(clone);

	  return width;
	}

	nodeToString(node){
		let tmpNode = document.createElement("div");
		tmpNode.appendChild(node.cloneNode(true));
		let str = tmpNode.innerHTML;
		tmpNode = node = null;
		return str;
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
