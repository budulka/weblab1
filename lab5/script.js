document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item1, .item2, .item3, .item4, .item5, .item6');

  // Set default black borders

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

  const applyScriptButton = document.createElement('button');
  applyScriptButton.textContent = 'Apply Script';
  applyScriptButton.id = 'applyScriptButton';

  const item3 = document.querySelector('.item3');
  item3.appendChild(applyScriptButton);

  applyScriptButton.addEventListener('click', swapTexts);

  const calculateRhombus = () => {
    const item1 = document.querySelector('.item1');
    const item5 = document.querySelector('.item5');
    const form = document.createElement('form');
    form.id = 'rhombusForm';

    const d1 = document.createElement('input');
    d1.type = 'number';
    d1.placeholder = 'Enter d1';
    d1.name = 'd1';
    d1.required = true;

    const d2 = document.createElement('input');
    d2.type = 'number';
    d2.placeholder = 'Enter d2';
    d2.name = 'd2';
    d2.required = true;

    const submit = document.createElement('button');
    submit.type = 'submit';
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
  };

  const maxNumber = () => {
    const item5 = document.querySelector('.item5');
    const form = document.createElement('form');
    form.id = "form";
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
      } else if (array.length > 10) {
        alert('Too much numbers');
        return;
      }
      const min = Math.min(...array);
      const max = Math.max(...array);
      alert(`Max: ${max}, Min: ${min}`);
      document.cookie = `minNum=${min}; path=/; SameSite=Lax`;
      document.cookie = `maxNum=${max}; path=/; SameSite=Lax`;
    });
  };

  const removeCookies = () => {
    const item3 = document.querySelector('.item3');
    const rmCookie = document.createElement('button');
    rmCookie.textContent = 'Remove cookies';
    rmCookie.addEventListener('click', () => {
      const cookies = Object.fromEntries(
        document.cookie.split('; ').map(cookie => {
          const [key, value] = cookie.split('=');
          return [key, decodeURIComponent(value)];
        })
      );

      const minVal = cookies['minNum'];
      const maxVal = cookies['maxNum'];

      if (minVal || maxVal) {
        const confirmation = window.confirm(
          `You have cookies (min = ${minVal || 'not set'}, max = ${maxVal || 'not set'}).\nDo you really want to delete them?`
        );

        if (confirmation) {
          document.cookie = 'minNum=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
          document.cookie = 'maxNum=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
          alert('Cookies have been deleted.');
          location.reload();
        } else {
          alert('Cookies were not deleted.');
        }
      } else {
        alert('You have no cookies.');
      }
    });

    item3.appendChild(rmCookie);
  };

  const applySavedBorderColor = () => {
    const savedColor = localStorage.getItem('borderColor');
    
    if (savedColor) {
      items.forEach(item => {
        item.style.border = `2px solid ${savedColor}`;
      });
      
      const savedRadio = document.getElementById(savedColor);
      if (savedRadio) savedRadio.checked = true;
    }
  };

  const addHoverEffect = () => {
    const item3 = document.querySelector('.item3');
    let col = 'black';  // Default color

    // Create color radio buttons
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    const colorForm = document.createElement('form');
    colorForm.id = 'colorForm';

    colors.forEach(color => {
      const label = document.createElement('label');
      label.textContent = color;
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'borderColor';
      radio.id = color;
      radio.value = color;
      colorForm.appendChild(label);
      colorForm.appendChild(radio);
    });

    item3.appendChild(colorForm);

    // Event listener for color change
    colorForm.addEventListener('change', (event) => {
      col = event.target.value;
      localStorage.setItem('borderColor', col);  // Save the selected color
    });

    // Apply the saved color on page load
    const savedColor = localStorage.getItem('borderColor');
    if (savedColor) {
      col = savedColor;
      const savedRadio = document.getElementById(savedColor);
      if (savedRadio) savedRadio.checked = true;
    }

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.dataset.originalBorder = item.style.border;
        item.style.border = `4px solid ${col}`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.border = item.dataset.originalBorder || '';
      });
    });
  };

  // New Functionality: Adding images

  const addImagesFunctionality = () => {
    const item1 = document.querySelector('.item1');
    const item5 = document.querySelector('.item5');
    const item4 = document.querySelector('.item4');

    const form = document.createElement('form');
    form.id = 'imageForm';

    const imageInput = document.createElement('input');
    imageInput.type = 'text';
    imageInput.placeholder = 'Enter image URL';
    imageInput.name = 'imageUrl';
    imageInput.required = true;

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add Image';

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Images';
    clearButton.addEventListener('click', () => {
      localStorage.removeItem('images');
      updateImages();
    });

    form.appendChild(imageInput);
    form.appendChild(submit);
    item1.appendChild(form);
    item1.appendChild(clearButton);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const imageUrl = imageInput.value;
      let images = JSON.parse(localStorage.getItem('images')) || [];
      images.push(imageUrl);
      localStorage.setItem('images', JSON.stringify(images));
      updateImages();
      imageInput.value = '';
    });

    const updateImages = () => {
      const images = JSON.parse(localStorage.getItem('images')) || [];
      item4.innerHTML = ''; // Clear existing images
      images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.width = '100px';
        img.style.height = '100px';
        item4.appendChild(img);
      });
    };

    updateImages(); // Load stored images on page load
  };

  calculateRhombus();
  maxNumber();
  removeCookies();
  applySavedBorderColor();
  addHoverEffect();
  addImagesFunctionality();

  items.forEach(item => {
    item.style.border = '2px solid black';
  });
});

