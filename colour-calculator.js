document.addEventListener('DOMContentLoaded', function(){
    const colourMap = {
        0: 'yellow',
        1: 'pink',
        2: 'burlywood',
        3: 'aqua',
        4: 'orange',
        5: 'lime',
        6: 'steelblue',
        7: 'green',
        8: 'sienna',
        9: 'purple',
    };

    dectableContainer = document.querySelector('.decimal-table');
    wholetableContainer = document.querySelector('.whole-table');
    dectable = document.querySelector('.decimal-table>.colour-table>tbody');
    wholetable = document.querySelector('.whole-table>.colour-table>tbody');
    console.log(wholetable)

    document.querySelector('button#clear').addEventListener('click', () => {
        document.querySelectorAll('.input-box').forEach(box => box.value="");
        dectable.textContent = '';
        wholetable.textContent = '';
    });

    document.querySelector('button#compute').addEventListener('click', () => {
        whole = document.querySelector('.whole-number input');
        numerator = document.querySelector('.numerator input');
        denominator = document.querySelector('.denominator input');

        wholeVal = parseInt(whole.value) || 0;
        numeratorVal = parseInt(numerator.value) || 0;
        denominatorVal = parseInt(denominator.value) || 0;

        whole.value = wholeVal + parseInt(numeratorVal / denominatorVal);
        numerator.value = parseInt(numeratorVal % denominatorVal);
        dividend = wholeVal * denominatorVal + numeratorVal;

        wholeDividend = parseInt(whole.value);
        decDividend = parseInt(numerator.value);

        wholetableWidth = wholetableContainer.getAttribute('data-width');
        wholetable.textContent = '';
        for(let rowX=0; rowX<=parseInt(255/wholetableWidth); rowX++){
            const tr = wholetable.insertRow();
            for(let colX=0; colX<wholetableWidth; colX++){
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(''));

                colourPos = (rowX * wholetableWidth) + colX;
                colourVal = wholeDividend.toString()[colourPos];
                td.style.backgroundColor = colourMap[colourVal];
            };
        };

        dectableWidth = dectableContainer.getAttribute('data-width');
        dectable.textContent = '';
        outer: for(let rowX=0; rowX<=parseInt(255/dectableWidth); rowX++){
            const tr = dectable.insertRow();
            for(let colX=0; colX<dectableWidth; colX++){
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(''));

                colourVal = parseInt(decDividend * 10 / denominatorVal);
                td.style.backgroundColor = colourMap[colourVal];

                decDividend = parseInt(decDividend * 10) % denominatorVal;
                if(decDividend === 0) break outer;
            };
        };
    });

    document.querySelector('button#redraw').addEventListener('click', () => {
        newWidth = document.querySelector('#table-width').value || 25;
        dectableContainer.setAttribute('data-width', newWidth);
        console.log(dectableContainer.getAttribute('data-width'));
        document.querySelector('button#compute').click();
        console.log('clicked');
    });
});
