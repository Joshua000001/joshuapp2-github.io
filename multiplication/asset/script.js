function Calculation(firstNumber, secondNumber, operation, totalOutput) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    switch (operation) {
      case 'addition':
        totalOutput.value = firstNumber + secondNumber;
        break;
      case 'subtraction':
        totalOutput.value = firstNumber - secondNumber;
        break;
      case 'multiplication':
        totalOutput.value = firstNumber * secondNumber;
        break;
      case 'division':
        totalOutput.value = firstNumber / secondNumber;
        break;
    }
  }