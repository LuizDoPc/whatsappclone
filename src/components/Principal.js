import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text, StatusBar } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Conversas from "./Conversas";
import Contatos from "./Contatos";
import TabBarMenu from "./TabBarMenu";

export default class Principal extends Component {
  state = {
    index: 0,
    routes: [{ key: "1", title: "Conversas" }, { key: "2", title: "Contatos" }]
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          1: Conversas,
          2: Contatos
        })}
        renderTabBar={props => <TabBarMenu {...props} />}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});
