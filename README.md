# Evolutionary Poster Composer

Evolutionary Poster Composer **(Evo-poster)** is a computational design approach that explores Evolutionary Computation for the generation of poster designs based on user-provided input (both imagery and text).


## Table of Contents

1. [About](#about)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
4. [Contributing](#contributing)
5. [Acknowledgments](#acknowledgments)
5. [License](#license)

## About

**(Evo-poster)** approach takes inspiration from the highly algorithmic processes of letterpress design in [nineteenth-century print houses](https://en.wikipedia.org/wiki/Letterpress_printing). During this era, typographers, in collaboration with clients, selected and composed typography, ornaments, and wood-engraved illustrations to fill a matrix. Design choices were very pragmatic, with condensed typefaces for lengthy sentences and extended typefaces for shorter ones. Important content was highlighted using bigger and bolder typefaces.

In this version of **evo-poster** `(3.0.1)`, our approach considers aesthetic and semantic objectives alongside legibility constraints. The fitness of an individual is determined using a hardwired fitness assignment scheme strategy. We explore two strategies for managing constrained evolution, including the utilisation of stochastic ranking selection. Users can define the search space of the Genetic Algorithm, controlling the visual variation in evolved outputs. Furthermore, users can customise the evolutionary and evaluation processes through a dedicated interface by adjusting the system parameters.

In this work, we introduce an emotion recognition Nature Language Processing method, combining lexicon-based and Machine Learning techniques. This method facilitates the identification of emotionally significant parts of input texts, dividing them into sentences. Moreover, users can visually characterise each emotion according to their preferences, incorporating this information into the design process.

![Project Banner](res/results.png)

The development of this work follows an [agile science methodology](https://arxiv.org/abs/2104.12545), structured around potential [user cases and scenarios]((https://github.com/sergiomrebelo/evo-poster/wiki/Users-Stories-and-Scenarios)). In summary, these users' stories and scenarios unveil that this system can present two main challenges: visual exploration and discovery; and automation. 
We observed that since the system is able to identify the most emotional significant parts of a given text, it can be also used as a casual visualization tool. 


## Getting Started
Follow these steps to get the project up and running on your local machine.

### Prerequisites
Make sure you have installed [Node.js](https://nodejs.org/) (version 21.6.0 or higher) and [npm](https://www.npmjs.com/) on your machine.

<!-- TODO API -->

### Installation
Clone the repository and install dependencies
```bash
   git clone https://github.com/sergiomrebelo/evo-poster.git
   cd evo-poster
   npm install
   ```

### Usage
1. To run the application, use the following command:
```bash
   npm start
   ```
2. Open your browser and go to http://localhost:8000/
3. Upload the input image and text
4. Click on the "Next" button
5. Setup the system parameters, and, in the end, it will start the evolutionary process

### Additional Commands
1. Run the server in development mode:
   ```
   npm run dev
   ```
2. Build the Project:
   ```
   npm run build
3. To disconnect the application:
   ```
   npm run stop
   ```
4. Run the tests:
   ``` 
   npm run test
   npm test:cypress
   ```

### Customise Configuration
Users must define the some settings in the `.env` file before running the application. 

#### Example Configuration File
```
NODE_ENV=development
PORT=8000

MW_API_KEY=YOUR_MW_API_KEY

LANGUAGE_TRANSLATOR_IAM_APIKEY=WATSON_API_KEY
LANGUAGE_TRANSLATOR_URL=WATSON_API_KEY_URL
```

The system parameters and available visual and typographic features can be customised through the `evo-poster.config.js` file.


## Contributing

We welcome contributions to enhance and improve this project! Whether you want to report a bug, request a new feature, or contribute code, your involvement is highly appreciated.

### Bug Reports and Feature Requests

If you come across any issues or have ideas for new features, please [open an issue](https://github.com/sergiomrebelo/evo-poster/issues) on GitHub. When creating an issue, be sure to include relevant details such as the version, operating system, and steps to reproduce the problem.

### Code Contributions

We encourage you to contribute to the codebase. Here's how you can do it:

1. Fork the repository to your GitHub account.
2. Create a new branch for your changes.
3. Make changes and commit them to your branch.
4. Open a pull request (PR) against the `dev` branch of this repository.


## Papers and Documentation
- project wiki
The code repository for this project is accessible at~\repo (visited: 8 November 2023). Supplementary materials are also available at \url{https://cdv.dei.uc.pt/evoposter}

## Acknowledgments
This work is partially supported by national funds through the Foundation for Science and Technology (FCT), Portugal, within the scope of the project UID/CEC/00326/2019. Sérgio M. Rebelo is funded by FCT under the grant SFRH/BD/132728/2017 and COVID/BD/151969/2021. This work is based upon work from a scholarship supported by [SPECIES](https://species-society.org/), the Society for the Promotion of Evolutionary Computation in Europe and its Surroundings.


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

MIT License

Copyright (c) 2023 Sérgio M. Rebelo