class SmartCalculator {
  constructor(initialValue) {
    this.value = initialValue;
    this.expression = [];
    this.expression.push(initialValue);
  }

  add(number) {
    this.createExpression("+", number);
    this.value = this.reversePolishEntry();
    this.value.valueOf();
    return this;
  }

  subtract(number) {
    this.createExpression("-", number);
    this.value = this.reversePolishEntry();
    this.value.valueOf();
    return this;
  }

  multiply(number) {
    this.createExpression("*", number);
    this.value = this.reversePolishEntry();
    this.value.valueOf();
    return this;
  }

  devide(number) {
    this.createExpression("/", number);
    this.value = this.reversePolishEntry();
    this.value.valueOf();
    return this;
  }

  pow(number) {
    this.createExpression("**", number);
    this.value = this.reversePolishEntry();
    this.value.valueOf();
    return this;
  }

  //Метод создаёт массив, который будет является алгебраическим выражением, которое мы будем решать
  createExpression (operation, num) {
    this.expression.push(operation, num);
  }

 //Создаём обратую польскую запись для нашего выражения
  reversePolishEntry() {
    var pair = [], temp = [];
    var output = [];
    var operation = [];
    var currPriority = 0, stackPriority = 0;
    for (var i = 0; i < this.expression.length; i++) {
      if (Number.isInteger(this.expression[i])) {
        output.push(this.expression[i]);
      } else {
        if (operation.length === 0) {
          operation.push(this.expression[i]);
        } else {
          currPriority = this.takePriority(this.expression[i]);
          stackPriority =  this.takePriority(operation[operation.length - 1]);
          if ((currPriority + stackPriority === 6) || (currPriority > stackPriority) ) {
            operation.push(this.expression[i]);
          } else {
            while ((currPriority <= this.takePriority(operation[operation.length - 1])) && (operation.length > 0) ) {
              output.push(operation.pop());
            }
            operation.push(this.expression[i]);
          }
        }
      }
    }

    while (operation.length !== 0) {
      output.push(operation.pop());
    }
     return this.solveRPE(output);
  }

//Получаем приоеритеты для операций для Обратной польской записи
  takePriority(operation) {
    switch (operation) {
      case '+':
      case '-': return 1;
      case '*':
      case '/': return 2;
      case '**': return 3;
    }
  }

//По полученной обратной польской записи получаем решение выражения
  solveRPE(output){
    var temp = 0;
    var i = 0;
    while (output.length !== 1) {
      if (typeof(output[i]) === 'string') {
        switch (output[i]) {
          case '+': temp = output[i - 2] + output[i - 1]; break;
          case '-': temp = output[i - 2] - output[i - 1]; break;
          case '*': temp = output[i - 2] * output[i - 1]; break;
          case '/': temp = output[i - 2] / output[i - 1]; break;
          case '**': temp = Math.pow(output[i - 2], output[i - 1]); break;
        }
        output.splice(i - 2, 3, temp);
        i -= 2;
      }
      i++;
    }
    return output[0];
  }




  valueOf() {
    return this.value;
  }
}

module.exports = SmartCalculator;
