const { PredictionServiceClient } = require("electron").remote.require("@google-cloud/automl").v1beta1;
const fs = require("fs");
const path = require("path");
//const config = require("../config/ocrimagens-1b069cc4306d.json");
export const googleVision = {
  analisarImagem,
  predict
};
const config = {
  "type": "service_account",
  "project_id": "agile-device-270422",
  "private_key_id": "1a4bedfd9da4c53307e47456ff4acb35087391d2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCq1BAI5BztIqKU\nMUcfZKW8v1DIXszpwDfDZVJXhUDJKUw1f+lAIZ5e3hSh0WDEaiw++JIPRSpMDLkV\n6DUIAU1V8nJRXhYHM/gOkStsVlbCNCgtajKcHG2j8rW+5LcqMinqcqLiXi4GBs5Y\nDG0Ig1qIQ8Z3E59Ud2wZf2nA3VaAkO1Le2cJiLKdPT9XB2atUE+twzDiTIVHp0wb\n8FV030QdVcVKvX8F0QjkLCYtqXlhh7IfiZzeB1rNtDc1EmNQ1CdH+hDhs9QFMGkd\newWFQ3AjPOkwIUppXqo004AWyG1fk+OgKuc2V4itHaPbFXdRUx8R8azNBwK797CV\ne+eP5X6xAgMBAAECggEAGscNEGe5hQ51z6b90BT1yeVvY0lA8682zoE2bBOuORop\nIQXA6VWbvqEvOMJaWc+Oyfwq4QvlenBQHvf8QBn8JmnPs6N87nod+yKUXPIXvW9x\nkNThxAjMwvNLu/WcJJgia+a2U6eRrU4p0DF6cegtK8j79jR0OEhUAJcxW5MWeSZ8\nbphe4cn3I6XLmZLNmp3uhpe06WuNPJGdnVcYJ4yBpnwHDAe54p4fgQhs/91H5FLW\nj5TcJqOCpglaoZ7SUct+zcX/pAXMhE+9xcIFlDlwZ0PoD20fKf5ZeyUlT1SvPoJW\naXZA4d4UedOQ1yYcVyIF8F06pWuvcuHFs1i87xiFpQKBgQDv0CM1bbFRzcPZHUu6\ndlQwDmDyfdJ3ZT7qSOcP2VE8gVL8dcbUcKsuXZOrKtIe2HO1FeVSFR/ha+CgUMSb\n6RAFf9bNPVF2PM1X+xq+LPDBHTC5TwOH1EOQiPqzZJfgXiiEWF7onWdyNoQ2i6RU\nyOlwpJMC1VNbtGqQ8SkcCh/bRwKBgQC2W+aZEkN058XFokLbjT5U40i9AZvamL+y\nN2Ujc53yzTw8btLIuhQh93Vq7kAlpAxEJePk023CW7icE2QIoTXs3t6TQpBBRZoc\nyMUey2bT/KUpMU2kGlBRIVPd2pWpHDGPeupc8LsZlKBjTLoWanNGDcxvVxxrCJ4H\nkQZPOi3iRwKBgD4QTtxn/CkgqJwLEes67oTVY8++MncF8+dsYKhgZL7U9WYzEPcw\nBY1lWG9HEMQ83o0yEnxQzURox+SVopx7D9Nsh2nsgaWpDLfFW+F1/gTsigybX12K\n2MWSPdeppAjENZYyzLVE713GsCbxsuDick/dt9JW5VDpe17xmuMP17jHAoGANi0L\nTwJ8A+kvek2Aa1WE5Rc47t3hfYnPuZR3eZbJn+6VLKcH/BY8EPNBcOkjKYuZEU3o\nbHzbqNgy+jtQhrfOG3cCzOEDlkClTlPfLAzlmaj/MEOze0NOBSxPjCN6PulfV+7+\nXWovS6Q6GgYbarlpUbCbwaAxkyLWQA03wKXaJ9UCgYAlCkVuusrl8t5kvb6AL2K2\n37OL9sXbtg04yzNnpmDNqQCmwFA94wmHaNOor5lZMw8Um7MWr5GSmcokH7TPKZmm\nhgbug2lrIxDPs0BL2RrwGrsWIhJdQSjkr25vzrz93RvH7AP0Iu1rvLROhaLT2pG6\n4queLaoHSFh8Rgn2i4snJw==\n-----END PRIVATE KEY-----\n",
  "client_email": "botanalisedocumentos@agile-device-270422.iam.gserviceaccount.com",
  "client_id": "117595042141934372467",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/botanalisedocumentos%40agile-device-270422.iam.gserviceaccount.com"
}
;

async function analisarImagem(image) {
  console.log( image);
  const vision = require("@google-cloud/vision");

  ///image = image.replace("\\", "\\\\");
  // Imports the Google Cloud client library
  // Creates a client
  //  const client = new vision.ImageAnnotatorClient();
  const client = new vision.ImageAnnotatorClient({
    projectId: config.project_id,
    keyFilename: "../config/agile-device-270422-1a4bedfd9da4.json"
  });
  const request = {
    image: {
      source: {
        filename: image
      }
    }
  };
  const [result] = await client.labelDetection(request);
  console.log(result);
  return result;
}

async function predict(filePath) {
  /**
   * Demonstrates using the AutoML client to detect the object in an image.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const projectId = config.project_id; // '[PROJECT_ID]' e.g., "my-gcloud-project";
  const computeRegion = "us-central1";
  const modelId = "modelo_rg_20200305094411";
  // const filePath = '[GCS_PATH]' e.g., "/home/ubuntu/salad.jpg",
  // `local text file path of content to be extracted`;
  const scoreThreshold = 0.5;
  // `Set the score threshold for Prediction of the created model`;

  //Imports the Google Cloud Automl library

  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient();

  // Get the full path of the model.
  const modelFullId = predictionServiceClient.modelPath(
    projectId,
    computeRegion,
    modelId
  );

  // Read the file content for prediction.
  const content = fs.readFileSync(filePath, `base64`);
  let params = {};
  if (scoreThreshold) {
    params = {
      score_threshold: scoreThreshold
    };
  }

  // Set the payload by giving the content and type of the file.
  const payload = {
    image: {
      imageBytes: content
    }
  };
  try {
    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    const [response] = await predictionServiceClient.predict({
      name: modelFullId,
      payload: payload,
      params: params
    });
    console.log(`Prediction results:`);
    for (const result of response[0].payload) {
      console.log(`\nPredicted class name:  ${result.displayName}`);
      console.log(
        `Predicted class score:  ${result.imageObjectDetection.score}`
      );
    }
  } catch (error) {
    console.log(error);
  }
}
//predict();
