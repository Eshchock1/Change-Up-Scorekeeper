import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";

export function normalize(size) {
  return (Dimensions.get("window").width + Dimensions.get("window").height) / (1080/ size)
  }

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      towers: [[[0,2,2],[0,0,2],[0,2,2]], [[0,0,2],[2,2,2],[0,0,2]], [[0,2,2],[0,0,2],[0,2,2]]]
    };
  }

  

  async componentDidMount() {
    try {
      await Font.loadAsync({
        MuliBlack: require("./assets/muli/Muli-Black.ttf"),
        MuliRegular: require("./assets/muli/Muli-Regular.ttf"),
        MuliExtraBold: require("./assets/muli/Muli-ExtraBold.ttf"),
        MuliSemi: require("./assets/muli/Muli-SemiBold.ttf"),
        MuliBold: require("./assets/muli/Muli-Bold.ttf"),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  handlePress(row, col, order, state) {
    let current_towers = this.state.towers
    if (state == 0) {
      current_towers[row][col][order] = 1 
    }
    else if (state == 1) {
      current_towers[row][col][order] = 2 
    }
    else {
      current_towers[row][col][order] = 0 
    }
    this.setState({towers:current_towers})
  }

   renderButton(row, col, order) {
    let current_row = row - 1
    let current_col = col - 1
    let current_order = order - 1
    if (this.state.towers[current_row][current_col][current_order] == 0){
      return (
        <TouchableOpacity onPress={()=> this.handlePress(current_row,current_col,current_order, 0)} style={{width:'80%', height:'20%', backgroundColor:'#c9c9c9', borderRadius:10}}></TouchableOpacity>
      )
    }
    else if (this.state.towers[current_row][current_col][current_order] == 1){
      return (
        <TouchableOpacity onPress={()=> this.handlePress(current_row,current_col,current_order, 1)} style={{width:'80%', height:'20%', backgroundColor:'tomato', borderRadius:10}}></TouchableOpacity>
      )
    }
      return (
        <TouchableOpacity onPress={()=> this.handlePress(current_row,current_col,current_order, 2)} style={{width:'80%', height:'20%', backgroundColor:'dodgerblue', borderRadius:10}}></TouchableOpacity>
      )
  }

  calcScore() {
    let current_towers = this.state.towers
    let red_rows = 0
    let blue_rows = 0
    let blue_balls = 0
    let red_balls = 0
    let top_balls = [[0,0,0],[0,0,0],[0,0,0]]

    for(let row=0;row<3;row++) {
      for(let col=0;col<3;col++) {
        for(let order=0;order<3;order++) {
           if (current_towers[row][col][order] == 1) {
             red_balls += 1
             top_balls[row][col] = 1
           }
           else if (current_towers[row][col][order] == 2) {
            blue_balls += 1
            top_balls[row][col] = 2
          }
        }  
      } 
    }


    if (top_balls[0][0] == 1 && top_balls[1][0] == 1 && top_balls[2][0] == 1) {
      red_rows += 1
    }
    if (top_balls[0][1] == 1 && top_balls[1][1] == 1 && top_balls[2][1] == 1) {
      red_rows += 1
    }
    if (top_balls[0][2] == 1 && top_balls[1][2] == 1 && top_balls[2][2] == 1) {
      red_rows += 1
    }
    if (top_balls[0][0] == 2 && top_balls[1][0] == 2 && top_balls[2][0] == 2) {
      blue_rows += 1
    }
    if (top_balls[0][1] == 2 && top_balls[1][1] == 2 && top_balls[2][1] == 2) {
      blue_rows += 1
    }
    if (top_balls[0][2] == 2 && top_balls[1][2] == 2 && top_balls[2][2] == 2) {
      blue_rows += 1
    }


    


    if (top_balls[0][0] == 1 && top_balls[0][1] == 1 && top_balls[0][2] == 1) {
      red_rows += 1
    }
    if (top_balls[1][0] == 1 && top_balls[1][1] == 1 && top_balls[1][2] == 1) {
      red_rows += 1
    }
    if (top_balls[2][0] == 1 && top_balls[2][1] == 1 && top_balls[2][2] == 1) {
      red_rows += 1
    }
    if (top_balls[0][0] == 2 && top_balls[0][1] == 2 && top_balls[0][2] == 2) {
      blue_rows += 1
    }
    if (top_balls[1][0] == 2 && top_balls[1][1] == 2 && top_balls[1][2] == 2) {
      blue_rows += 1
    }
    if (top_balls[2][0] == 2 && top_balls[2][1] == 2 && top_balls[2][2] == 2) {
      blue_rows += 1
    }

    

    if (top_balls[0][0] == 1 && top_balls[1][1] == 1 && top_balls[2][2] == 1) {
      red_rows += 1
    }
    if (top_balls[0][2] == 1 && top_balls[1][1] == 1 && top_balls[2][0] == 1) {
      red_rows += 1
    }
    if (top_balls[0][0] == 2 && top_balls[1][1] == 2 && top_balls[2][2] == 2) {
      blue_rows += 1
    }
    if (top_balls[0][2] == 2 && top_balls[1][1] == 2 && top_balls[2][0] == 2) {
      blue_rows += 1
    }
    

    console.log(top_balls)
    return ((red_rows * 6 + red_balls) - (blue_rows * 6 + blue_balls) + 63)
  }


render() {
  if (!this.state.fontLoaded) 
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{flex:0.12,}}>
      <Text style={{fontFamily:'MuliBold', lineHeight:normalize(30), fontSize:normalize(22), marginTop:"10%", marginLeft:"5%"}}>Change Up{'\n'}Scorekeeper</Text>
      </View>
      <View style={{flex:0.6,justifyContent:'flex-start'}}>
      <View style={{flex:0.334, flexDirection:'row', paddingHorizontal:"3%", }}>
        <View style={{flex:0.334, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(1,1,1)}
          {this.renderButton(1,1,2)}
          {this.renderButton(1,1,3)}
        </View>
        <View style={{flex:0.333, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(1,2,1)}
          {this.renderButton(1,2,2)}
          {this.renderButton(1,2,3)}
        </View>
        <View style={{flex:0.333, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(1,3,1)}
          {this.renderButton(1,3,2)}
          {this.renderButton(1,3,3)}
        </View>
      </View>
      <View style={{flex:0.333, flexDirection:'row'}}>
        <View style={{flex:0.334, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(2,1,1)}
          {this.renderButton(2,1,2)}
          {this.renderButton(2,1,3)}
        </View>
        <View style={{flex:0.333, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(2,2,1)}
          {this.renderButton(2,2,2)}
          {this.renderButton(2,2,3)}
        </View>
        <View style={{flex:0.333, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(2,3,1)}
          {this.renderButton(2,3,2)}
          {this.renderButton(2,3,3)}
        </View>
      </View>
      <View style={{flex:0.333, flexDirection:'row'}}>
        <View style={{flex:0.334, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(3,1,1)}
          {this.renderButton(3,1,2)}
          {this.renderButton(3,1,3)}
        </View>
        <View style={{flex:0.333, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(3,2,1)}
          {this.renderButton(3,2,2)}
          {this.renderButton(3,2,3)}
        </View>
        <View style={{flex:0.333, alignItems:'center', justifyContent:'space-evenly', paddingVertical:"5%", flexDirection:'column'}}>
          {this.renderButton(3,3,1)}
          {this.renderButton(3,3,2)}
          {this.renderButton(3,3,3)}
        </View>
      </View>
      </View>
      <View style={{flex:0.3, backgroundColor:'white'}}>
        <Text style={{fontFamily:'MuliBold', fontSize:normalize(22), marginLeft:"5%"}}>SCORE:</Text>
        <Text style={{fontFamily:'MuliBlack', fontSize:normalize(50), marginLeft:"5%"}}>{this.calcScore()}</Text>
      </View>
  
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
