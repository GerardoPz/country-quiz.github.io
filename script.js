fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    // Selecciona un país al azar de la lista
    const randomCountry = data[Math.floor(Math.random() * data.length)];

    let question = document.getElementById("question");
    // Genera la pregunta y la respuesta
    const questionGenerate = `¿Which country is ${randomCountry.name.common} the capital?`;

    // Genera 4 respuestas con solo una correcta
    const answers = [];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      let answer;
      if (i === correctAnswerIndex) {
        answer = randomCountry.capital[0];
      } else {
        let randomCountryIndex = Math.floor(Math.random() * data.length);
        while (randomCountryIndex === correctAnswerIndex) {
          randomCountryIndex = Math.floor(Math.random() * data.length);
        }
        answer = data[randomCountryIndex].capital[0];
      }
      answers.push(answer);
    }

    console.log(questionGenerate);
    question.innerHTML = questionGenerate;
    const answersContainer = document.getElementById("options-answers");
    console.log(`Respuestas:`);
    answers.forEach((answer, index) => {
      console.log(`${index + 1}. ${answer}`);
      const answerElement = document.createElement("div");

      // Asigna las clases y el id correspondiente a cada respuesta
      answerElement.className = `answer ${index + 1}`;
      answerElement.id = `${index + 1}`;

      // Asigna el texto de la respuesta al elemento
      answerElement.textContent = answer;

      // Agrega el elemento al contenedor de respuestas
      answersContainer.appendChild(answerElement);
    });
    console.log(`La respuesta correcta es: ${answers[correctAnswerIndex]}`);
  })
  .catch((error) => {
    console.log(error);
  });
