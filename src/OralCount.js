import React, { useState, useEffect, useRef } from 'react';

// ключ : значение
const dividersMultipliers = {
  // 1: 'один раз',
  2: 'два раза',
  3: 'три раза',
  4: 'четыре раза',
  5: 'пять раз',
  6: 'шесть раз',
  7: 'семь раз',
  8: 'восемь раз',
  9: 'девять раз',
  10: 'десять раз'
}

// ключ : значение
const numbers = {
  10: "десять",
  20: 'двадцать',
  30: 'тридцать',
  40: 'сорок',
  50: 'пятьдесят',
  60: 'шестьдесят',
  70: 'семьдесят',
  80: 'восемьдесят',
  90: 'девяносто',
  100: 'сто',
  110: 'сто десять',
  120: 'сто двадцать',
  130: 'сто тридцать',
  140: 'сто сорок',
  150: 'сто пятьдесят',
  160: 'сто шестьдесят',
  170: 'сто семьдесят',
  180: 'сто восемьдесят',
  190: 'сто девяносто',
  200: 'двести',
  300: 'триста',
  400: 'четыреста',
}

// (number1 <operation1> number2) <operation2> number3
// operations1: plus, minus
// operations2: multiplication, division
const operation1Options = [
  "plus",
  // "minus"
]

const operation2Options = [
  // "multiplication",
  "division"
]

function generateSum2ItemsAndDivide() {

  const numberKeys = Object.keys(numbers);

  const item1index = Math.floor(Math.random() * numberKeys.length);
  const number1 = parseInt(numberKeys[item1index], 10);

  const item2index = Math.floor(Math.random() * numberKeys.length);
  const number2 = parseInt(numberKeys[item2index], 10);

  // +-
  let operation1;

  // если number1 < number2, то разрешаем только +
  if (number1 > number2) {
    operation1 = "plus";
  } else {
    operation1 = operation1Options[Math.floor(Math.random() * operation1Options.length)];
  }

  // считаем значение в скобках (operation1)
  let valueInSquares;

  if (operation1 === "plus") {
    valueInSquares = parseInt(number1, 10) + parseInt(number2, 10);
  } else {
    valueInSquares = parseInt(number1, 10) - parseInt(number2, 10);
  }

  const operation2 = operation2Options[Math.floor(Math.random() * operation2Options.length)];

  // оставляем только те делители, которые дают деление без остатка
  const dmKeys = Object.keys(dividersMultipliers).filter(n => {
    if (operation2 === "multiplication") {
      return true;
    } else {
      return valueInSquares % parseInt(n, 10) === 0;
    }
  });

  const dmIndex = Math.floor(Math.random() * dmKeys.length);
  const number3 = parseInt(dmKeys[dmIndex], 10);

  return {
    number1,
    number2,
    number3,
    operation1,
    operation2
  }
}

function taskText(task) {
  const { number1, number2, number3, operation1, operation2 } = task;
  const operation1Text = operation1 === "plus" ? "Сумма" : "Разность";
  const operation2Text = operation2 === "multiplication" ? "увеличенная" : "уменьшенная";
  return `${operation1Text} чисел ${numbers[number1]} и ${numbers[number2]}, ${operation2Text} в ${dividersMultipliers[number3]}, равна:`;
}

function correctAnswer(task) {

  const { number1, number2, number3, operation1, operation2 } = task;

  let valueInSquares;

  if (operation1 === "plus") {
    valueInSquares = parseInt(number1, 10) + parseInt(number2, 10);
  } else {
    valueInSquares = parseInt(number1, 10) - parseInt(number2, 10);
  }

  if (operation2 === "multiplication") {
    return valueInSquares * parseInt(number3, 10)
  } else {
    return valueInSquares / parseInt(number3, 10)
  }
}

function correctAnswerText(task) {
  const { number1, number2, number3, operation1, operation2 } = task;
  const op1Text = operation1 === "plus" ? '+' : '-';
  const op2Text = operation2 === "multiplication" ? '*' : ':';
  return `( ${number1} ${op1Text} ${number2} ) ${op2Text} ${number3} = ${correctAnswer(task)}`;
}

export default function() {

  const [task, setTask] = useState({});
  console.log(task)
  const [answer, setAnswer] = useState('');
  const [resultOpen, setResultOpen] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(1);

  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    setTask(generateSum2ItemsAndDivide());
    setInputFocus();
  }, []);

  return (
    <div className=''>
      <h4>
        {
          taskText(task)
        }
      </h4>
      <form
        onSubmit={e => {
          e.preventDefault();
          const answerIsCorrect = correctAnswer(task) === parseInt(answer);
          if (answerIsCorrect) {
            setCorrectCount(correctCount + 1);
          }
          setAnswerIsCorrect(answerIsCorrect);
          setResultOpen(true);
        }}
      >
        <div className="form-floating" style={{ margin: '0 auto' }}>
          <input
            type="text"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            ref={inputRef}
          />
          <label htmlFor="floatingPassword">Ответ</label>
        </div>
        <div className='py-2'>
          <button
            type="submit"
            class="btn btn-primary"
            style={{ marginRight: '10px' }}
            disabled={!answer}
          >Проверить</button>
          <button
            type="button"
            class="btn btn-secondary"
            disabled={!resultOpen}
            onClick={e => {
              setTask(generateSum2ItemsAndDivide());
              setResultOpen(false);
              setAnswer('');
              setInputFocus();
              setTaskCount(taskCount + 1);
            }}
          >Следующий</button>
        </div>
      </form>

      {
        resultOpen ? (
          <div className='py-2'>
            <div className={`alert ${answerIsCorrect ? "alert-success" : "alert-danger"}`} role="alert">
              {correctAnswerText(task)}
            </div>
          </div>
        ) : null
      }

      {
        taskCount > 0 ? (
          <p>Ответы (правильно/всего): {correctCount}/{taskCount}</p>
        ) : null
      }

    </div>
  )
}

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

  return [ htmlElRef, setFocus ]
}