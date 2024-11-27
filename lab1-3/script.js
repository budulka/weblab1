
const swapTexts = () => {
  const item2 = document.querySelector('.item2');
  const item6 = document.querySelector('.item6');
  const getTextNode = (element) => {
    return Array.from(element.childNodes).find(node => 
      node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
    );
  };

  const item2TextNode = getTextNode(item2);
  const item6TextNode = getTextNode(item6);

  if (item2TextNode && item6TextNode) {
    const tempText = item2TextNode.textContent;
    item2TextNode.textContent = item6TextNode.textContent.trim();
    item6TextNode.textContent = tempText.trim();
  }
};




const calculateRhombus = () => {
	const item1 = document.querySelector('.item1');
	const item5 = document.querySelector('.item5');
	const form = document.createElement('form');
	form.id = 'rhombusForm';

	const d1 = document.createElement('input');
	d1.type = 'number';
	d1.placeholder = 'Enter d1';
	d1.name = 'd1'
	d1.required = true;

	const d2 = document.createElement('input');
	d2.type = 'number';
	d2.placeholder = 'Enter d2';
	d2.name = 'd2'
	d2.required = true;

	const submit = document.createElement('button');
	submit.type = 'submit'
	submit.textContent = 'Calculate';

	form.appendChild(d1);
	form.appendChild(d2);
	form.appendChild(submit);
	item1.appendChild(form);

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const diag1 = parseFloat(d1.value);
		const diag2 = parseFloat(d2.value);
		if (!isNaN(diag1) && !isNaN(diag2)) {
			const area = (diag1 * diag2) / 2;
			const result = document.createElement('div');
			result.textContent = `Rhombus Area = ${area}`;
			item5.appendChild(result);
		} else {
			alert('Invalid numbers');
		}
	});
 
}

const maxNumber = () => {
	const item5 = document.querySelector('.item5');
	const form = document.createElement('form');
	form.style.display = 'flex';
	form.style.flexDirection = 'column';
	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'up to 10 nums, separated by ,';
	input.required = true;
	input.style.width = '200px';

	const submit = document.createElement('button');
	submit.type = 'submit';
	submit.textContent = 'find Min and Max';
	form.appendChild(input);
	form.appendChild(submit);
	item5.appendChild(form);
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const array = input.value.split(',').map(num => parseFloat(num.trim()));
		if (array.some(isNaN)) {
			alert('incorrect values encountered');
			return;
		}
		else if (array.length > 10) {
			alert('Too much numbers');
			return;
		} 
		const min = Math.min(...array);
		const max = Math.max(...array);
		alert(`Max: ${max}, min: ${min}`);
		document.cookie = `minNum=${min}; path=/; SameSite=Lax`;
		document.cookie = `maxNum=${max}; path=/; SameSite=Lax`;	
		
		console.log('Set cookies: ', document.cookie, ";");
	});
};


const button = document.querySelector('#apply');

const applyScript = () => {
	swapTexts();
	calculateRhombus();
	maxNumber();
}

window.onload = () => {
  const parseCookies = () => {
    if (!document.cookie) return {};
    
    return document.cookie
      .split('; ')
      .reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=');
        cookies[name] = decodeURIComponent(value);
        return cookies;
      }, {});
  };

  const cookies = parseCookies();
  console.log('Parsed Cookies:', cookies);  

  const button = document.querySelector('#apply');

  if (button) {
    button.addEventListener('click', applyScript);
  } else {
    console.error('Button with ID "apply" not found.');
  }
};


window.addEventListener('beforeunload', (event) => {
	const data = document.cookies;
	alert(`You have some data: ${data}`);
	event.preventDefault(); 
	event.returnValue = '';
	return ''; 
  });
