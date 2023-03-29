// Прячем ненужные элементы и оставляем видимым начало и первую кнопку

document.getElementById('btnTobegin').addEventListener('click', function () { 
    document.querySelector('.title-page').classList.add('hidden');    
    document.querySelector('.value-range').classList.remove('hidden');      
    document.querySelector('.valueRange').classList.remove('hidden');         
    document.querySelector('.form-inline').classList.remove('hidden');        
    document.querySelector('#btnTobegin').classList.add('hidden');            
    document.querySelector('#btnReady').classList.remove('hidden');           
})

// Прячем ненужные элементы и открываем форму + вторую кнопку

document.getElementById('btnReady').addEventListener('click', function () { 
    document.querySelector('.value-range').classList.add('hidden');      
    document.querySelector('.valueRange').classList.add('hidden');       
    document.querySelector('.form-inline').classList.add('hidden');      
    document.querySelector('.guessNumber').classList.remove('hidden');      
    document.querySelector('#btnReady').classList.add('hidden');             
    document.querySelector('#btnStart').classList.remove('hidden');  
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);

        // Делаем проверку введенных чисел
        //1 . Значения меняются местами если max меньше min.
     if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
        };

        //2 . Введено число или NaN, если введен ноль, то оставляем ноль
   if (maxValue === 0) {maxValue = 0}
    else {maxValue = maxValue || 999}; 
    
    if (minValue === 0) { minValue = 0}
    else {minValue = minValue || - 999}; 

            //3 . Число вне диапазона игры или минимум/максимум перемешаны
    
    maxValue > 999 ? (maxValue = 999) : (maxValue);
    minValue < -999 ? (minValue = -999) : (minValue);
    minValue > 999 ? (minValue = 0) : (minValue);
    maxValue < -999 ? (maxValue = 100) : (maxValue);

guessNumber.innerText = (`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю!`);
})

// открываем основную форму для начала игры, открываем кнопки
document.getElementById('btnStart').addEventListener('click', function () {     
    document.querySelector('.question').classList.remove('hidden');         
    document.querySelector('.guessNumber').classList.add('hidden');          
    document.querySelector('.no-gutters').classList.remove('hidden');
    document.querySelector('#btnStart').classList.add('hidden');            
    document.querySelector('#btnLess').classList.remove('hidden');         
    document.querySelector('#btnEqual').classList.remove('hidden');         
    document.querySelector('#btnOver').classList.remove('hidden');      
    document.querySelector('#btnRetry').classList.remove('hidden');   

// рассчитываем среднее из мин и макс 
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

// чтобы преобразовать число в текст, вводим функцию

function numToText(){
    const
        hundreds = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
        dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
        units = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
        teens = ['одиннацать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let str = answerNumber.toString();
    let out = '';

    if (answerNumber === 0) return out = 0; //первое условие

    else if (answerNumber >0) { //второе условие
    if(str.length == 1) return out = units[parseInt(str[0]-1)];
    else if(str.length == 2){
        if(str[0] == 1) out = teens[parseInt(str[1])-1];
        else out = (dozens[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + units[parseInt(str[1])-1]):''));
    }
    else if(str.length == 3){
        out = (hundreds[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + dozens[parseInt(str[1])-1]):'') + ((str[2]!='0')?(' ' + units[parseInt(str[2])-1]):''));
    }
}
    else { //треттье условие

        let neg = Math.abs (answerNumber);
        let str1 = neg.toString();

        if(str1.length == 1) return out = ('минус' + ' ' + units[parseInt(str[0]-1)]);
        else if(str1.length == 2){
            if(str1[0] == 1) out = ('минус' + ' ' + teens[parseInt(str1[1])-1]);
            else out = ('минус' + ' ' + dozens[parseInt(str1[0])-1] + ((str1[1]!='0')?(' ' + units[parseInt(str1[1])-1]):''));
        }
        else if(str1.length == 3){
            out = ('минус' + ' '+ hundreds[parseInt(str1[0])-1] + ((str1[1]!='0')?(' ' + dozens[parseInt(str1[1])-1]):'') + ((str1[2]!='0')?(' ' + units[parseInt(str1[2])-1]):''));
        }
    }

    return out;
}

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;

// проверяем ответ. Если ответ (вместе с минусом для отрицательных значений) меньше 20 символов, то будет словами, иначе цифры
// ноль всегда будет отображаться как 0 - заложено в функции
answerField.innerText = (numToText(answerNumber).length < 20) ? `Вы загадали число ${numToText(answerNumber)}?` : `Вы загадали число ${answerNumber}?`;

// кнопка больше
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random() * 3);

            if (phraseRandom <= 1){
                const answerPhrase = (phraseRandom <= 0.5) ?
                `Возможно это ...` :
                `Хм, знаю!\n\u{1F917} Это...`;
                answerField.innerText = (numToText(answerNumber).length < 20) ? `${answerPhrase} ${numToText()}?` : `${answerPhrase} ${answerNumber}?`;
            } else {
                const answerPhrase = (phraseRandom <= 2) ?
                `Это число ...` :
                `Просто! \n\u{1F917} Вы загадали число...`;
                answerField.innerText = (numToText(answerNumber).length < 20) ? `${answerPhrase} ${numToText()}?` : `${answerPhrase} ${answerNumber}?`;
            }
        }
    }
})

// кнопка меньше
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (maxValue === minValue){
           
           const phraseRandom = Math.round( Math.random());
           const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.round( Math.random() * 3);

            if (phraseRandom <= 1){
                const answerPhrase = (phraseRandom <= 0.5) ?
                `Дай подумать\n\u{1F917}. Наверное ...` :
                `Запросто! Это должно быть...`;
                answerField.innerText = (numToText(answerNumber).length < 20) ? `${answerPhrase} ${numToText()}?` : `${answerPhrase} ${answerNumber}?`;
            } else {
                const answerPhrase = (phraseRandom <= 2) ?
                `О, я знаю!\n\u{1F606} Это ...` :
                `Легко!\n\u{1F917} Это наверное число...`;
                answerField.innerText = (numToText(answerNumber).length < 20) ? `${answerPhrase} ${numToText()}?` : `${answerPhrase} ${answerNumber}?`;
            }
        }
    }
})

// кнопка Верно
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random() * 6);

        if (phraseRandom < 3){
        const answerPhrase = (phraseRandom < 2) ?
            `Ура, я так и знал \n\u{1F609}, это` :
            `Я угадал\n\u{1F603}, это`;
        answerField.innerText = (numToText(answerNumber).length < 20) ? `${answerPhrase} ${numToText()}!` : `${answerPhrase} ${answerNumber}!`;
        gameRun = false;
        } else {
            const answerPhrase = (phraseRandom >5) ?
                `Точно ведь \n\u{1F609},` :
                `Я знал\n\u{1F607}, это`;
        answerField.innerText = (numToText(answerNumber).length < 20) ? `${answerPhrase} ${numToText()}!` : `${answerPhrase} ${answerNumber}!`;
            gameRun = false;    
        }
    }
})

// функция для кнопки Заново
function gameRestart() {
    maxValue = 0;
    minValue = 0;
    orderNumber = 0;
    
    document.querySelector('.value-range').classList.remove('hidden');      
    document.querySelector('.valueRange').classList.remove('hidden');         
    document.querySelector('.form-inline').classList.remove('hidden');     
    document.querySelector('#btnReady').classList.remove('hidden');
    document.querySelector('.question').classList.add('hidden');         
    document.querySelector('.guessNumber').classList.add('hidden');          
    document.querySelector('.no-gutters').classList.add('hidden');                 
    document.querySelector('#btnRetry').classList.add('hidden');
    document.querySelector('#btnLess').classList.add('hidden');         
    document.querySelector('#btnEqual').classList.add('hidden');         
    document.querySelector('#btnOver').classList.add('hidden');
    document.querySelector('#formInputMin').value = '';
    document.querySelector('#formInputMax').value = '';  

    document.getElementById('btnReady').addEventListener('click', function () { 
        document.querySelector('.value-range').classList.add('hidden');      
        document.querySelector('.valueRange').classList.add('hidden');       
        document.querySelector('.form-inline').classList.add('hidden');      
        document.querySelector('.guessNumber').classList.remove('hidden');      
        document.querySelector('#btnReady').classList.add('hidden');             
        document.querySelector('#btnStart').classList.remove('hidden');        
        minValue = parseInt(document.querySelector('#formInputMin').value);
        maxValue = parseInt(document.querySelector('#formInputMax').value);

    // Значения меняются местами если max меньше min.
        if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
        };

        if (maxValue === 0) {maxValue = 0}
        else {maxValue = maxValue || 999}; 
        
        if (minValue === 0) { minValue = 0}
        else {minValue = minValue || - 999}; 
        
        maxValue > 999 ? (maxValue = 999) : (maxValue);
        minValue < -999 ? (minValue = -999) : (minValue);
        minValue > 999 ? (minValue = 0) : (minValue);
        maxValue < -999 ? (maxValue = 100) : (maxValue);
    
    guessNumber.innerText = (`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю!`);
    })
}

// кнопка Заново
document.getElementById('btnRetry').addEventListener('click', function (){
    gameRestart();

})

})



