function solve() {
    document.querySelector('form').addEventListener('submit', event => addBook(event));
    const inputs = document.querySelectorAll('form>input');
    const outputs = document.querySelectorAll('.shelf');
    const priceOutput = document.querySelectorAll('h1')[1];
    let totalPrice = 0;

    console.log(priceOutput)
    function addBook(event) {
        event.preventDefault();
        const bookTitle = inputs[0].value;
        const bookYear = Number(inputs[1].value);
        const bookPrice = Number(inputs[2].value);
        if (!bookTitle) {
            return alert('Fille Book Title!');
        }
        if (bookYear < 0 || bookPrice < 0) {
            return alert('Year and Price must be positive numbers!');
        } else if (!bookPrice || !bookYear) {
            return alert('Pleas fill Year and Price!');
        }
        if (bookYear >= 2000) {
            const book = e('div', { className: 'book' },
                e('p', {}, `${bookTitle} [${bookYear}]`),
                e('button', {}, `Buy it only for ${bookPrice.toFixed(2)} BGN`),
                e('button', {}, 'Move to old section'));
            outputs[1].appendChild(book);

        } else {
            const book = e('div', { className: 'book' },
                e('p', {}, `${bookTitle} [${bookYear}]`),
                e('button', {}, `Buy it only for ${(bookPrice * 0.85).toFixed(2)} BGN`));
            outputs[0].appendChild(book);

        }
        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '';
    }

    document.getElementById('results').addEventListener('click', ev => onclick(ev));

    function onclick(ev) {
        const target = ev.target;
        if (target.textContent.includes('Buy ') && target.tagName === 'BUTTON') {
            const element = target.parentNode;
            let indexS = target.textContent.indexOf('r ');
            let indexE = target.textContent.indexOf(' B');
            let bPrice = Number(target.textContent.slice((indexS + 2), (indexE)));
            totalPrice += bPrice;
            priceOutput.textContent = `Total Store Profit: ${totalPrice.toFixed(2)} BGN`;

            element.remove();
        } else if (target.textContent.includes('Move ') && target.tagName === 'BUTTON') {
            const element = target.parentNode;
            const index = element.children.length - 1;
            element.children[index].remove();
            let indexS = element.children[1].textContent.indexOf('r ');
            let indexE = element.children[1].textContent.indexOf(' B');
            let bPrice = Number(element.children[1].textContent.slice((indexS + 2), (indexE)));
            bPrice = bPrice * 0.85;
            console.log(bPrice)
            element.children[1].textContent = `Buy it only for ${bPrice.toFixed(2)} BGN`;

            outputs[0].appendChild(element);
        }
    }



    function e(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }
}