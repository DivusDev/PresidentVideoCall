
const badWords = ['fuck', 'shit', 'nigga', 'nigger', 'gay', 'fucker', 'die']

   const  modelNicknames = {
        'spam' : 'custom_prediction_classification_1649559560577',
        'offensive' : 'custom_prediction_classification_1649581004338'
    }



    const API_KEY = 'PwVVgx4pV165AImmIlzglJkPkYGHGLMeXZ6Lvzub'


  export const runModel = async (model_nickname, message) => {
        const dataPackage = {
            "api_key": API_KEY,
            "features": [ { message } ],
            "include_features": false,
            "model": modelNicknames[model_nickname],
            "version": "1"
        }

        const MAGEResponse = await fetch('https://base-api.mage.ai/v1/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(dataPackage)
        })

        let lowercase = message.toLowerCase();
        console.log(lowercase)

        if (badWords.some( w => lowercase.indexOf(w) != -1)) return false

        const MAGEData = await MAGEResponse.json()
        console.log('MAGE RESPONSE', message, MAGEData)
        return MAGEData
    }



