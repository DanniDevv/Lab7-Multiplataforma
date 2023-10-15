import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

class App extends Component {
  state = {
    photos: [],
  };

  componentDidMount() {
    const apiKey = '9lQsJP8JPG6h0fkKvGISPitmtGFMgMa4VHtYyPj1SpEJsYNYvYuIZ6IJ';
    const query = 'technology';  // Cambia la palabra clave a 'technology' para buscar aparatos tecnológicos

    axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
      headers: {
        'Authorization': apiKey,
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.setState({ photos: response.data.photos });
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  renderPhoto = ({ item }) => (
    <Image source={{ uri: item.src.medium }} style={styles.photo} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Imágenes de Aparatos Tecnológicos</Text>
        <FlatList
          data={this.state.photos}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderPhoto}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    top: '3%'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photo: {
    width: 300,
    height: 200,
    margin: 10,
  },
});

export default App;
