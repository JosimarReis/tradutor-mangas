const vision = require("@google-cloud/vision");

export const AnalisarImagens = {
  analisarImagem
};

async function analisarImagem(image) {
  //image = image.replace(`\\`, "/");
  console.log(image);
  //  image = image.replace("\\", "/");
  // Imports the Google Cloud client library
  // Creates a client
  //  const client = new vision.ImageAnnotatorClient();
  const client = new vision.ImageAnnotatorClient({
    projectId: "ocrdocumentos-270422",
    keyFilename: "../config/ocrdocumentos-270422-bb7b5569349c.json"
  });
  const request = {
    image: {
      source: {
        filename: `${image}`
      }
    }
  };
  //extrair texto do documento
  client
    .textDetection(request) // extrair textos
    .then(response => {
      response = [response];
      return response;
    })
    .catch(err => {
      console.error(err);
      return;
    });
  return;
}
