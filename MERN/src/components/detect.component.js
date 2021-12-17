import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
      super(props);

      this.onChangeURL = this.onChangeURL.bind(this);

      this.state = {
        url: '',
        emotions: 0,
        age: 0,
        link: '',
        response: '',
        response2: '',
        anger:0,
        contempt:0,
        disgust:0,
        fear:0,
        happiness:0,
        neutral:0,
        sadness:0,
        surprise:0,
      }
  }

  submitForm(e, url) {
    var that = this;
    const axios = require('axios').default;
    // Add a valid subscription key and endpoint to your environment variables.
    let subscriptionKey = "4aa253ae4fc54570bb850b7d2c40ecb9"
    let endpoint = 'https://spotifyai.cognitiveservices.azure.com/face/v1.0/detect'
    // Optionally, replace with your own image URL (for example a .jpg or .png URL).
    let imageUrl = url.toString()
    let resultJSON = {
      "age": 0,
      "emotions": ""
    }
    axios({
        method: 'post',
        url: endpoint,
        params : {
            returnFaceId: true,
            returnFaceLandmarks: false,
            returnFaceAttributes: 'age,emotion'
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
        console.log(response.data)
        response.data.forEach((face) => {
          let age = face.faceAttributes.age
          let emotion = face.faceAttributes.emotion
          
          resultJSON = {
            "age": age,
            "emotions": emotion
          }


          let score = JSON.stringify(resultJSON["emotions"]["happiness"])
          let rounded = JSON.stringify(Math.round((parseFloat(score) + Number.EPSILON) * 10) / 10)


        
          //console.log('Age: ' + age)
          //console.log('Happiness: ' + parseFloat(score))
          let roundedscore= JSON.stringify(parseFloat(resultJSON["emotions"]["happiness"])
                                      +parseFloat(resultJSON["emotions"]["neutral"])
                                      +parseFloat(resultJSON["emotions"]["surprise"])
                                      -parseFloat(resultJSON["emotions"]["sadness"])
                                      -parseFloat(resultJSON["emotions"]["contempt"])
                                      -0.5*parseFloat(resultJSON["emotions"]["anger"])
                                      -0.5*parseFloat(resultJSON["emotions"]["disgust"])
                                      -0.5*parseFloat(resultJSON["emotions"]["fear"])
                                      );

          

          that.setState({   emotions: parseFloat(roundedscore),
                            age: age,
                            anger: parseFloat(resultJSON["emotions"]["anger"]),
                            contempt: parseFloat(resultJSON["emotions"]["contempt"]),
                            disgust: parseFloat(resultJSON["emotions"]["disgust"]),
                            fear: parseFloat(resultJSON["emotions"]["fear"]),
                            happiness: parseFloat(resultJSON["emotions"]["happiness"]),
                            neutral: parseFloat(resultJSON["emotions"]["neutral"]),
                            sadness: parseFloat(resultJSON["emotions"]["sadness"]),
                            surprise: parseFloat(resultJSON["emotions"]["surprise"]),
                          })

          

          console.log(rounded);
          if (parseInt(age) >= 18)
          {
            axios.get('http://localhost:5000/playlists/'+rounded)
              .then(response => {
                console.log(response);
                let len = response.data.length
                if (len > 1)
                {
                  console.log(response.data[Math.floor(Math.random() * len)]["link"])
                  that.setState({link: response.data[Math.floor(Math.random() * len)]["link"]})
                }
                else if(len>0){
                  console.log(response.data[0]["link"])
                  that.setState({link: response.data[0]["link"]})
                }else if(len==0){
                  that.setState({response2: "no playlists found :("})
              
                }
            });
          }
          else {
            axios.get('http://localhost:5000/playlists/clean/'+rounded)
              .then(response => {
                console.log(response);
                let len = response.data.length
                if (len > 1)
                {
                  console.log(response.data[Math.floor(Math.random() * len)]["link"])
                  that.setState({link: response.data[Math.floor(Math.random() * len)]["link"]})
                }
                else if(len>0){
                  console.log(response.data[0]["link"])
                  that.setState({link: response.data[0]["link"]})
                }else if(len==0){
                  that.setState({response2: "no playlists found :("})
               
                }
            });
          }
          if (parseFloat(roundedscore) > 0.4) {
            that.setState({response: "you are feeling happy :)"})
          }
          else if (parseFloat(roundedscore) >= 0.0 && parseFloat(roundedscore) <= 0.4) {
            that.setState({response: "you are feeling meh :|"})
          }
          else {
            that.setState({response: "you are feeling sad :("})
          }
        });
    }).catch(function (error) {
        that.setState({response: "no playlists found :("})
        console.log(error)
    });
    e.preventDefault();
  }

  onChangeURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="App">Analyze Image</h1> <br />
        <form onSubmit={(e) => this.submitForm(e, document.getElementById("link").value)}>
          <div className="form-group">
          <label className="App">image url: </label>
            <input type="text"
                id="link"
                required
                className="form-control"
                value={this.state.url}
                onChange={this.onChangeURL}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="analyze" className="btn btn-primary" />
          </div> <br />
          <div className="App">
            <img src={this.state.url} alt="" style={{height: 500}}></img>
          </div> <br />
          <div className="App">
            <h3> {this.state.response} </h3> <br/>
            <h4>emotional index: {this.state.emotions}</h4> 
            <h4>predicted age: {this.state.age}</h4> <br/>

            <h5>Face Attributes: </h5>
            anger: {this.state.anger} <br />
            contempt: {this.state.contempt} <br />
            disgust: {this.state.disgust} <br />
            fear: {this.state.fear} <br />
            happiness: {this.state.happiness} <br />
            neutral: {this.state.neutral} <br />
            sadness: {this.state.sadness} <br />
            surprise: {this.state.surprise} <br /><br/>
            click <a href={this.state.link} target='_blank'> here </a> for your playlist!
            <h3> {this.state.response2} </h3>
          </div>
        </form>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    )
  }
}
