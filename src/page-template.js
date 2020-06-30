//===== Check if user had input, if no, "None" ======//
const inputChoice = (userInput) => {
  if (!userInput) {
    return `
    <p class = "user-input-bottom">None</p>
    `;
  } else {
    return `
    <p class = "user-input-bottom">${userInput}</p>
    `;
  }
};

const generateProjects = projectsArr => {
  return `
      ${projectsArr
        .map(({...questions }) => {
          console.log(questions)
          return `
          <section class="my-3" id="portfolio">
          <h2 class="text-dark bg-primary p-2 display-inline-block">Links</h2>
          <a href="${questions.link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Repository</a>
          <a href="${questions.live}" class="btn mt-auto"><i class="fab fa-chrome mr-2"></i>View Live URL</a>
          <div class="flex-row justify-space-between">
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h5 class="portfolio-languages">
              Built With:
              ${questions.languages.join(', ')}
            </h5>
            </br>
            <h3 class="portfolio-item-title text-light">Description:</h3>
            <p class = "user-input-bottom">${questions.description}</p>

            </br>
            <h3 class="portfolio-item-title text-light">Installation:</h3>
            ${inputChoice(questions.install)}

            </br>
            <h3 class="portfolio-item-title text-light">Usage:</h3>
            ${inputChoice(questions.usage)}

            </br>
            <h3 class="portfolio-item-title text-light">Credits:</h3>
            ${inputChoice(questions.credits)}

            </br>
            <h3 class="portfolio-item-title text-light">Credits:</h3>
            ${inputChoice(questions.credits)}

            </br>
            <h3 class="portfolio-item-title text-light">License:</h3>
            ${inputChoice(questions.license)}


            </div>
        `;
        })
        .join('')}
  `;
};

module.exports = templateData => {
  // destructure page data by section
  const { projects, ...header } = templateData;
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
      </div>
    </header>
    <main class="container my-5">
    <section class = "my-3" id="about">
    </section>
    ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
  `;
};
