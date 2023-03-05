import React, { useState, useEffect } from 'react';

// ключ : значение
const dividers = {
  1: 'один раз',
  2: 'два раза',
  5: 'пять раз',
  10: 'десять раз'
}

// ключ : значение
const numbers = {
  20: 'двадцать',
  30: 'тридцать',
  40: 'сорок',
  50: 'пятьдесят',
  60: 'шестьдесят',
  70: 'семьдесят',
  80: 'восемьдесят',
  90: 'девяносто',
  100: 'сто',
  200: 'двести',
  300: 'триста',
  400: 'четыреста',
}

function generateSum2ItemsAndDivide() {

  const numberKeys = Object.keys(numbers);
  const item1index = Math.floor(Math.random() * numberKeys.length);
  console.log({ numberKeys, item1index });
  const item1 = numberKeys[item1index];

  const item2index = Math.floor(Math.random() * numberKeys.length);
  const item2 = numberKeys[item2index];

  const deviderKeys = Object.keys(dividers);
  const deviderIndex = Math.floor(Math.random() * deviderKeys.length);
  const divider = deviderKeys[deviderIndex];

  return {
    item1,
    item2,
    divider
  }
}

function taskText({ item1, item2, divider }) {
  return `Сумма чисел ${numbers[item1]} и ${numbers[item2]}, уменьшенная в ${dividers[divider]}, равно:`;
}

function correctAnswer({ item1, item2, divider }) {
 return (parseInt(item1) + parseInt(item2)) / parseInt(divider);
}

function correctAnswerText({ item1, item2, divider }) {
  return `( ${item1} + ${item2} ) : ${divider} = ${correctAnswer({ item1, item2, divider })}`;
}

export default function() {

  const [task, setTask] = useState({});

  console.log(task)

  const [answer, setAnswer] = useState('');

  const [resultOpen, setResultOpen] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  useEffect(() => {
    setTask(generateSum2ItemsAndDivide())
  }, []);

  return (
    <div className=''>
      <h4>
        {
          taskText(task)
        }
      </h4>
      <div className="form-floating" style={{ margin: '0 auto' }}>
        <input
          type="text"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <label htmlFor="floatingPassword">Ответ</label>
      </div>
      <div className='py-2'>
        <button
          type="button"
          class="btn btn-primary"
          style={{ marginRight: '10px' }}
          disabled={!answer}
          onClick={e => {
            setAnswerIsCorrect(correctAnswer(task) === parseInt(answer))
            setResultOpen(true);
          }}
        >Проверить</button>
        <button
          type="button"
          class="btn btn-secondary"
          disabled={!resultOpen}
          onClick={e => {
            setTask(generateSum2ItemsAndDivide());
            setResultOpen(false);
            setAnswer('');
          }}
        >Следующий</button>
      </div>
      {
        resultOpen ? (
          <div className='py-2'>
            <div className={`alert ${answerIsCorrect ? "alert-success" : "alert-danger"}`} role="alert">
              {correctAnswerText(task)}
            </div>
          </div>
        ) : null
      }

    </div>
  )
}